FROM node:8.7.0

COPY . /usr/src/app
WORKDIR /usr/src/app

EXPOSE 8080

CMD [ "npm", "start" ]