# BUILD STAGE
FROM node:18.16.0-alpine as build-step

WORKDIR /app

COPY package.json .

RUN npm install --production

COPY . . 

COPY .env.production .env.production

RUN npm run build

# # ========================================
# # NGINX STAGE !
# # ========================================

FROM nginx:latest

RUN rm /etc/nginx/conf.d/*

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=build-step --chown=nextjs:nodejs /app/.next/standalone ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
