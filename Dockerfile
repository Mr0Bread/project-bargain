FROM node:lts-gallium as bargain-build

WORKDIR /usr/app

COPY ./package.json ./yarn.lock ./nx.json ./tsconfig.base.json ./next-i18next.config.js ./

RUN apt update  \
    && apt install \
    make \
    && yarn install
