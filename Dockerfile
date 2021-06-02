FROM node:16

LABEL image=node-testing

WORKDIR /usr/src

COPY package*.json ./
RUN set -eux; \
	npm install -g npm; \
	npm ci

COPY ./ ./

CMD [ "npm", "test" ]
