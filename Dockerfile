FROM node:16-alpine

WORKDIR /usr/src/app

ARG APP_VERSION=1
ENv APP_VERSION=$APP_VERSION

COPY .en[v] ./
COPY ./package*.json ./

RUN npm install

COPY . .

RUN chown -R node:node .
USER node

ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}
RUN npm run build

CMD ["npm", "run", "start:prod"]