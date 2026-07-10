# Multi-stage production build

# Stage 1: Build & Dependencies
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Production runner
FROM node:18-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=5001

# Copy node_modules from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
# Copy source files
COPY . .

# Run as non-root user for security
USER node

EXPOSE 5001

CMD ["node", "server.js"]
