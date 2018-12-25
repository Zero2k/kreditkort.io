# Stage 1 - Build
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Run
FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/app/dist .

COPY ormconfig.docker.json ./ormconfig.json
COPY .env .

ENV NODE_ENV development

EXPOSE 4000

CMD node src/index.js
