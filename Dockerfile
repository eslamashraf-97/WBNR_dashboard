# Base image
FROM node:20 as build-stage


# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire app to the working directory
COPY . .

RUN npm run build

# production stage
FROM nginx:1.15.8-alpine as production-stage
COPY ./docker/prod.config /temp/prod.conf
RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
