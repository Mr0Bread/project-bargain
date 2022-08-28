FROM node:lts-gallium as gateway-build

COPY --from=bargain-build /usr/app /usr/app

WORKDIR /usr/app

COPY ./ ./apps/gateway

RUN yarn nx run gateway:build

FROM node:16.17.0-alpine3.16 as gateway-runtime

WORKDIR /usr/app

COPY --from=gateway-build /usr/app/dist/apps/gateway ./dist/apps/gateway

COPY --from=bargain-runtime /usr/app/node_modules ./node_modules

CMD ["node", "dist/apps/gateway/main.js"]
