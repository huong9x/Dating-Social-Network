FROM node:11.15.0-alpine

RUN mkdir /app

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY ./app.js ./app.js

ADD ./ ./

EXPOSE 5000

CMD node app.js
