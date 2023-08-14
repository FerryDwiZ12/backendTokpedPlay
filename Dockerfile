FROM node:18.12.1-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_PORT=4040

EXPOSE 4040

CMD ["node", "src/index.js"]