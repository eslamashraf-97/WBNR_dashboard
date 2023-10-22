FROM node:19-alpine3.17
RUN npm install -g npm@9.5.0
RUN npm install -g vite
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 80
CMD ["npm", "run", "dev"]