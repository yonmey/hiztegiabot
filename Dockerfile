FROM node:8-stretch

RUN git clone https://github.com/yonmey/hiztegiabot
ARG TELEGRAM_BOT_TOKEN
ENV BOT_TOKEN=$TELEGRAM_BOT_TOKEN
RUN cd hiztegiabot && npm install && npm run-script build
WORKDIR /hiztegiabot