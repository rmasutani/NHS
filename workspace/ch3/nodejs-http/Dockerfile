FROM node:14.15.4

RUN apt-get update
RUN apt-get install -y locales tmux vim
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
RUN yarn add pug@2.0.4
RUN yarn global add pug-cli
ENV LANG ja_JP.UTF-8
ENV TZ Asia/Tokyo
WORKDIR /app