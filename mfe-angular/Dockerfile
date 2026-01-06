# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY mfe-angular/package*.json ./mfe-angular/
COPY mfe-shared/package*.json ./mfe-shared/

WORKDIR /app/mfe-angular
RUN npm install

WORKDIR /app
COPY mfe-angular/ ./mfe-angular/
COPY mfe-shared/ ./mfe-shared/


WORKDIR /app/mfe-angular
RUN npm run build --configuration=production

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/mfe-angular/dist/mfe-angular /usr/share/nginx/html
COPY mfe-angular/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
