FROM node:20 as dependencies

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:20
WORKDIR /usr/src/app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .
RUN npm install -g ts-node-dev
CMD ["ts-node-dev", "--respawn", "--transpile-only", "index.ts"]
