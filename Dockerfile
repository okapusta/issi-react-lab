FROM node:25-alpine

ADD . /app
WORKDIR /app

RUN npm install

EXPOSE 3000

ENTRYPOINT npm start
