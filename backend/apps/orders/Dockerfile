FROM node:18
RUN mkdir -p /user/src/app

WORKDIR /user/src/app

COPY . /user/src/app/

RUN npm run start

EXPOSE  3002

CMD [ "npm", "run", "start:dev" ]