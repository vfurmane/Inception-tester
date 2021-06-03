FROM node:16

LABEL image=node-testing

RUN set -eux; \
	npm install -g npm;

WORKDIR /usr/src
COPY package*.json ./
RUN set -eux; \
	npm ci

COPY ./ ./

CMD [ "npm", "test" ]
