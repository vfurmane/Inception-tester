FROM node:16

WORKDIR /usr/src

COPY package*.json ./
RUN npm ci

COPY ./ ./

CMD [ "npm", "test" ]
