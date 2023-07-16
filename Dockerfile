# BUILD STAGE
FROM node:18.16.0-alpine as build-step

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

# # ========================================
# # NGINX STAGE
# # ========================================

# FROM nginx:1.23-alpine 

# WORKDIR /usr/share/nginx/html/

# COPY --from=build-step /usr/src/app/build /usr/share/nginx/html/

# CMD [ "nginx", "-g", "daemon off;" ]