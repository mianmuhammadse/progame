FROM node:20 as dependencies

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM node:20 as builder
WORKDIR /usr/src/app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
