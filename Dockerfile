FROM node:14

WORKDIR /challenge
COPY package.json .
RUN yarn
COPY . .
CMD yarn build && yarn start