FROM node:carbon

RUN mkdir /app

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY ./app.js ./app.js

EXPOSE 80/tcp

RUN npm install

CMD node app.js


