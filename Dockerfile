# Stage 1 - Build
FROM node as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Run
FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

COPY ormconfig.json .
COPY .env .

ENV NODE_ENV production

EXPOSE 4000

CMD node dist/src/index.js
