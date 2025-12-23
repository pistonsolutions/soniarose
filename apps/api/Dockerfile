# ==========================================
# Stage 1: Base image with pnpm
# ==========================================
FROM node:20-alpine AS base

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl libc6-compat

# ==========================================
# Stage 2: Install dependencies
# ==========================================
FROM base AS deps

WORKDIR /app

# Copy workspace configuration
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy all package.json files to understand workspace structure
COPY packages/database/package.json ./packages/database/package.json
COPY packages/lib/package.json ./packages/lib/package.json
COPY apps/api/package.json ./apps/api/package.json

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod=false

# ==========================================
# Stage 3: Build application
# ==========================================
FROM base AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/database/node_modules ./packages/database/node_modules
COPY --from=deps /app/packages/lib/node_modules ./packages/lib/node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm --filter @soniarose/database generate

# Build packages and API
RUN pnpm --filter @soniarose/lib build
RUN pnpm --filter @soniarose/database build
RUN pnpm --filter @soniarose/api build

# Verify build output exists (nested path due to monorepo structure)
RUN ls -la /app/apps/api/dist/apps/api/src/ && test -f /app/apps/api/dist/apps/api/src/main.js || (echo "BUILD FAILED: main.js not found" && exit 1)

# ==========================================
# Stage 4: Production runtime
# ==========================================
FROM base AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./apps/api/package.json

# Copy shared packages (built)
COPY --from=builder --chown=nestjs:nodejs /app/packages/database ./packages/database
COPY --from=builder --chown=nestjs:nodejs /app/packages/lib ./packages/lib

# Copy workspace configuration
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install production dependencies only - copy from builder which has full install
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3001
ENV NODE_PATH=/app/node_modules

# Create uploads directory with proper permissions
RUN mkdir -p /app/uploads && chown -R nestjs:nodejs /app/uploads

USER nestjs

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "apps/api/dist/apps/api/src/main.js"]
