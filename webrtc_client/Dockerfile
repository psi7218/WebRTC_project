# syntax=docker/dockerfile:1

# Step 1: Base image
FROM node:20.14.0 AS base

# Step 2: Dependencies
FROM base AS deps
WORKDIR /app
COPY ./webrtc_client/package.json ./package.json
COPY ./webrtc_client/package-lock.json ./package-lock.json
RUN npm ci

# Step 3: Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./webrtc_client/ ./

# Environment variables for build time
ENV NEXT_PUBLIC_API_URL=https://thiscord.store/api

# Build the application
RUN npm run build

# Step 4: Runner
FROM node:20.14.0 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=https://thiscord.store/api 
ENV PORT=5442  
# OpenVidu 연동을 위한 포트

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

EXPOSE 5442

# Start the application
CMD ["node", "server.js"]