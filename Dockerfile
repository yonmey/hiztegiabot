FROM node:8-stretch

RUN git clone https://yonmey:password@bitbucket.org/yonmey/hiztegiabot.git
ARG TTOKEN
ENV BOT_TOKEN=$TTOKEN
RUN cd hiztegiabot && npm install && npm run-script build
WORKDIR /hiztegiabot