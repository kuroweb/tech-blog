FROM node:18

# 最新版のyarnをリポジトリに反映
RUN wget --quiet -O - /tmp/pubkey.gpg https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# rootユーザーで各種パッケージをインストール.
RUN apt-get update && apt-get install -y \
    nodejs \
    less \
    vim \
    curl \
    unzip \
    sudo

# nodeユーザーでプロジェクトをセットアップ.
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

ENV NPM_CONFIG_PREFIX=/home/node/app/.npm-global
ENV PATH=$PATH:/home/node/app/.npm-global/bin

COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .

RUN npm i
