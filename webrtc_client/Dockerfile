# syntax=docker/dockerfile:1

# Step 1: Base image
FROM node:20.14.0 AS base

# Step 2: Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm ci

# Step 3: Builder
FROM base AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Step 4: Runner
FROM node:20.14.0 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
# OpenVidu 연동을 위한 포트

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

EXPOSE 3000

# Start the application
CMD ["node", "server.js"]