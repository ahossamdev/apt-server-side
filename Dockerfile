# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Build TypeScript code
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create uploads directory
RUN mkdir -p public/uploads
VOLUME ["/app/public/uploads"]

EXPOSE 3000
CMD ["node", "dist/index.js"]
