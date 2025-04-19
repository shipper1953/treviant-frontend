# --- Builder Stage ---
FROM node:18 AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# --- Production Stage ---
FROM nginx:alpine

# Copy built React files
COPY --from=builder /app/build /usr/share/nginx/html

# Custom Nginx config (optional, fallback to index.html for React routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
