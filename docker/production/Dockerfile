FROM node:19-alpine3.17 AS build
RUN npm install -g npm@9.5.0
RUN npm install -g vite
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./docker/production/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
