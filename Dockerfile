FROM node:8.2.1-alpine

RUN apk add --update \
      git

WORKDIR /redux-hist-react
COPY package.json package-lock.json ./
RUN npm install
COPY tsconfig.json tslint.json ./
COPY src src
COPY test test
RUN npm run build

CMD npm test
