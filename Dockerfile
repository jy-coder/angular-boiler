# Stage 1: Build Angular app
FROM node:16-alpine AS build-stage

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# Stage 2: Serve Angular app with Nginx
FROM nginx:alpine

COPY --from=build-stage /app/dist/client /usr/share/nginx/html
