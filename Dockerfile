# Build Stage
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
COPY .env.production .env.production
RUN npm run build

# Nginx Stage
FROM nginx:latest

# Copy Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/.next /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
