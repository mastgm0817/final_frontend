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

FROM nginx:latest

RUN rm /etc/nginx/sites-available/default \
    && rm /etc/nginx/sites-enabled/default

COPY nginx/default.conf /etc/nginx/sites-available/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=build-step /app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
