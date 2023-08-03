
# BUILD STAGE
FROM node:18.16.0-alpine as base

FROM base as deps
RUN apk add --no-cache libc6-compat

RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm install --production

FROM base AS builder
RUN mkdir /app
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY .env.production .env.production
RUN npm run build

FROM base AS runner
RUN mkdir /app
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]



# # ========================================
# # NGINX STAGE
# # ========================================
FROM nginx:latest

RUN rm /etc/nginx/conf.d/*

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=runner /app/* .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
