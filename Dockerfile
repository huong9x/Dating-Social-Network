FROM node:carbon

RUN mkdir /app

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY ./app.js ./app.js

ADD views/ .

CMD node app.js

