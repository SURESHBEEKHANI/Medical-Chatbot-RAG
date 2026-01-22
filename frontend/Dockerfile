# Multi-stage build for frontend
FROM node:22-alpine as builder

WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN npm install

# Build the application
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve to run the static files
RUN npm install -g serve

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]
