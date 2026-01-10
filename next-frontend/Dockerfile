# Stage 1: Dependencies
FROM node:24-alpine AS deps
WORKDIR /app

# Copy package files first to leverage cache layers
COPY package.json ./

# Install dependencies
RUN npm install

# Stage 2: Builder
FROM node:24-alpine AS builder
WORKDIR /app

# Copy dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application
COPY . .

# ARGS are needed here because Next.js bakes env vars during build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-privileged user and leave GECOS fields blank
# (Using -D -g "" is the Alpine equivalent of --disabled-password --gecos "")
RUN adduser -D -g "" nextjs-user

# Copy necessary files from builder
# We use --chown to give the non-privileged user ownership immediately
COPY --from=builder --chown=nextjs-user:nextjs-user /app/public ./public
COPY --from=builder --chown=nextjs-user:nextjs-user /app/.next/standalone ./
COPY --from=builder --chown=nextjs-user:nextjs-user /app/.next/static ./.next/static

# Switch to non-privileged user
USER nextjs-user

# Expose the port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run the application and bind 0.0.0.0 to allow external traffic
CMD ["node", "server.js"]
