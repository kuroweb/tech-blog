FROM node:18

RUN apt-get update && apt-get install -y \
    nodejs \
    less \
    vim \
    curl \
    unzip \
    sudo

WORKDIR /app

COPY package*.json .

RUN npm i
