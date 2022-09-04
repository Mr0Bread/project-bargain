FROM node:16.17.0-slim as content-service-build

COPY --from=bargain-build /usr/app /usr/app

WORKDIR /usr/app

# Copying project source files
COPY ./ ./apps/content-service

RUN apt-get update \
  && apt-get install -y openssl

# Building project
RUN yarn nx run content-service:build

# For runtime stage using slim image
FROM node:16.17.0-slim as content-service-runtime

WORKDIR /usr/app

# Copying built project files
COPY --from=content-service-build /usr/app/dist/apps/content-service ./dist/apps/content-service

# Copying generated Prisma Client
COPY --from=content-service-build /usr/app/apps/content-service/src/prisma ./apps/content-service/src/prisma

# Copying project runtime dependencies
COPY --from=bargain-runtime /usr/app/node_modules ./node_modules

RUN apt-get update \
  && apt-get install -y openssl

CMD ["node", "dist/apps/content-service/main.js"]
