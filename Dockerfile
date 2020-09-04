# Stage 1 - Build
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Run
FROM node:12-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/public ./dist/public

# Docker Compose
#COPY ormconfig.docker.json ./ormconfig.json

# Dokku
COPY ormconfig.dokku.json ./ormconfig.json
COPY .env .

ENV NODE_ENV production

EXPOSE 4000
CMD node dist/src/index.js