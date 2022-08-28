FROM node:16.17.0-slim as customer-service-build

COPY --from=bargain-build /usr/app /usr/app

WORKDIR /usr/app

# Copying project source files
COPY ./ ./apps/customer-service

RUN apt-get update \
  && apt-get install -y openssl

# Building project
RUN yarn nx run customer-service:build

# For runtime stage using slim image
FROM node:16.17.0-slim as customer-service-runtime

WORKDIR /usr/app

# Copying built project files
COPY --from=customer-service-build /usr/app/dist/apps/customer-service ./dist/apps/customer-service

# Copying generated Prisma Client
COPY --from=customer-service-build /usr/app/apps/customer-service/src/prisma ./apps/customer-service/src/prisma

# Copying project runtime dependencies
COPY --from=bargain-runtime /usr/app/node_modules ./node_modules

RUN apt-get update \
  && apt-get install -y openssl

CMD ["node", "dist/apps/customer-service/main.js"]
