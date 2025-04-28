# syntax=docker/dockerfile:1
FROM node:18.20.3-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Deploy a lightweight server using node_modules/.bin/serve
FROM node:18.20.3-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
