# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY mfe-react/package*.json ./mfe-react/
COPY mfe-shared/package*.json ./mfe-shared/

WORKDIR /app/mfe-react
RUN npm install

WORKDIR /app
COPY mfe-react/ ./mfe-react/
COPY mfe-shared/ ./mfe-shared/

WORKDIR /app/mfe-react
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/mfe-react/dist /usr/share/nginx/html
COPY mfe-react/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]