ARG NODE_VERSION=18.17.1

FROM node:${NODE_VERSION}-alpine as development
WORKDIR /ssps-fe
COPY package.json yarn.lock tsconfig.json tsconfig.node.json vite.config.ts index.html *.config.cjs .env ./
COPY ./src ./src
RUN yarn install && yarn build

FROM node:${NODE_VERSION}-alpine as production
WORKDIR /ssps-fe
COPY --from=development /ssps-fe/dist .
RUN yarn global add serve

EXPOSE 7000
CMD serve -s . -l 7000