FROM node:24-slim

RUN apt-get update

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["sh", "-c", "node ace migration:run --force && node ace serve --hmr"]