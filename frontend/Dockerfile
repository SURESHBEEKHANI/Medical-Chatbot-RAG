# Multi-stage build for frontend
FROM node:22-alpine as builder

WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN npm install

# Build the application
# Copy everything except node_modules (already installed)
COPY package.json bun.lockb ./
COPY vite.config.ts tsconfig*.json tailwind.config.ts postcss.config.js components.json ./
COPY index.html ./
COPY public ./public
COPY src ./src
# Verify critical files exist before build
RUN test -f src/lib/utils.ts || (echo "ERROR: src/lib/utils.ts not found! Creating it..." && mkdir -p src/lib && echo 'import { clsx, type ClassValue } from "clsx";' > src/lib/utils.ts && echo 'import { twMerge } from "tailwind-merge";' >> src/lib/utils.ts && echo '' >> src/lib/utils.ts && echo 'export function cn(...inputs: ClassValue[]) {' >> src/lib/utils.ts && echo '  return twMerge(clsx(inputs));' >> src/lib/utils.ts && echo '}' >> src/lib/utils.ts)
RUN test -f vite.config.ts || (echo "ERROR: vite.config.ts not found!" && exit 1)
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
