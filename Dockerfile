# Stage 1: Build the Vite app with environment variables
FROM node:18-alpine AS builder
WORKDIR /app

# Inject VITE environment variable here — adjust URL if needed
ENV VITE_BACKEND_URL=https://treviant-backend-175968122516.us-central1.run.app

COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve using nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
