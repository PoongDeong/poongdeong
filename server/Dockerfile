FROM node:12.18.2

WORKDIR /u/app/

COPY package.json .
COPY package-lock.json .

RUN npm i --production

COPY ./dist ./dist

RUN rm package.json 
RUN rm package-lock.json

ENTRYPOINT [ "node", "./dist/run.js" ]
