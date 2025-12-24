# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

SoniaRose is a CRM platform built as a TypeScript monorepo using Turborepo and pnpm. It consists of:
- **NestJS API** (`apps/api`) - Backend API with workflow orchestration
- **Next.js 14 Web App** (`apps/web`) - Frontend console with App Router
- **Shared packages** - Database client (`packages/database`) and utilities (`packages/lib`)

The system orchestrates SMS workflows via Twilio, manages contacts with Prisma/Postgres, and uses BullMQ with Redis for background job processing.

## Development Commands

### Initial Setup
```bash
# Install dependencies
pnpm install

# Generate Prisma client (required after schema changes)
pnpm db:generate

# Start local infrastructure (Postgres + Redis)
docker compose up -d postgres redis

# Start all dev servers in parallel
pnpm dev
```

### Common Operations
```bash
# Build all packages
pnpm build

# Lint all packages
pnpm lint

# Run tests across all packages
pnpm test

# Database migrations
pnpm db:migrate

# Work on specific packages
pnpm --filter @soniarose/api dev
pnpm --filter @soniarose/web build
pnpm --filter @soniarose/database generate
```

### Testing
```bash
# Run API tests with Jest
pnpm --filter @soniarose/api test

# Run tests in watch mode (add to package.json if needed)
pnpm --filter @soniarose/api test -- --watch

# Run specific test file
pnpm --filter @soniarose/api test -- path/to/test.spec.ts
```

## Architecture

### Monorepo Structure
- **Turborepo** orchestrates builds with dependency-aware caching
- **pnpm workspaces** link packages via `workspace:*` protocol
- Changes to shared packages trigger downstream rebuilds automatically

### Backend (apps/api)

**Module Organization:**
- `DatabaseModule` - Provides Prisma client singleton
- `ContactsModule` - Contact CRUD with tag management
- `WorkflowsModule` - BullMQ queue + worker for async workflow execution
- `ComplianceModule` - STOP/HELP event tracking and opt-out metrics
- `MediaModule` - Asset metadata listing
- `TwilioModule` - SMS service wrapper (credentials required)
- `HealthModule` - Infrastructure health checks

**Workflow System:**
- Contacts automatically enqueue "Five Days of Joy" workflow on creation
- BullMQ worker (`workflows.processor.ts`) processes jobs asynchronously
- Workflow steps are tracked in `WorkflowRun` and `WorkflowStep` tables
- Job retries use exponential backoff (5 attempts, 1s base delay)
- Queue management endpoints: `/api/workflows/queue`, `/api/workflows/runs`, `/api/workflows/runs/:id/retry`

**Key Patterns:**
- NestJS dependency injection throughout
- DTOs with `class-validator` for request validation
- Prisma relations handle cascading deletes
- Redis connection shared between Queue and Worker

### Frontend (apps/web)

**Route Structure:**
- `(console)` route group - Main authenticated shell
- Feature routes: `/dashboard`, `/contacts`, `/workflows`, `/compliance`, `/media`, `/inbox`, `/settings`
- Contact detail at `/contacts/[id]`
- New contact form at `/contacts/new`

**Data Fetching:**
- TanStack Query for server state management
- API base URL via `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:3001/api`)
- Client components for forms, server components for initial data

**Styling:**
- Tailwind CSS with custom design system
- `clsx` for conditional class composition
- `next-themes` for dark mode support

### Database (packages/database)

**Schema Highlights:**
- `Contact` - Core entity with `OptInStatus` enum tracking consent
- `Message` - SMS history with Twilio provider IDs and delivery status
- `WorkflowRun` / `WorkflowStep` - Workflow execution state
- `TimelineEvent` - Activity log per contact
- `ComplianceEvent` - STOP/HELP commands and opt-out events
- `MediaAsset` - Object storage metadata with expiry tracking
- `CallLog` - Voice call history with Twilio SIDs

**Important:**
- Always run `pnpm db:generate` after schema changes
- Use cascade deletes on contact relations to maintain referential integrity
- Indexes exist on frequently queried fields (`contactId`, `status`, `occurredAt`)

## Environment Variables

**API (apps/api):**
- `DATABASE_URL` - Postgres connection string (default: `postgresql://soniarose:soniarose@localhost:5432/soniarose`)
- `REDIS_URL` - Redis connection string (default: `redis://localhost:6379`)
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` - SMS credentials
- `PORT` - API server port (default: 3001)

**Web (apps/web):**
- `NEXT_PUBLIC_API_URL` - Backend API base URL (default: `http://localhost:3001/api`)

## Local Infrastructure

Docker Compose provides:
- **Postgres 16** on port 5432 (user/pass/db: `soniarose`)
- **Redis 7** on port 6379
- Data persists in named volumes `postgres-data` and `redis-data`

## Deployment Context

Target platform is **Oracle Cloud Infrastructure (OCI)**. Plan includes:
- Self-managed containers for Postgres, Redis, API, and Web
- OCI Vault for secrets (Twilio credentials, object storage keys)
- S3-compatible object storage for media assets

## Outstanding Work

- Implement BullMQ worker actions for workflow types (currently placeholders)
- Wire Twilio webhooks with signature verification for inbound messages
- Build Conversations inbox UI after webhook integration
- Add media upload flows with presigned URLs
- Implement authentication and multi-tenant guards
- Add role-based access controls




 ▲ soniarose   main  ❯ ssh -i "crmeys copy/ssh-key-2025-12-05 (1).key" -o StrictHostKeyChecking=no opc@168.138.66.139 '
∙ cd ~/soniarose
∙ 
∙ echo "=== Server up ==="
∙ uptime
∙ 
∙ echo ""
∙ echo "=== Pull new web image ==="
∙ sudo docker pull ghcr.io/pistonsolutions/soniarose-web:latest
∙ 
∙ echo ""
∙ echo "=== Image timestamp ==="
∙ sudo docker images ghcr.io/pistonsolutions/soniarose-web:latest --format "Created: {{.CreatedAt}}"
∙ 
∙ echo ""
∙ echo "=== Start all containers ==="
∙ sudo docker compose -f docker-compose.prod.yml up -d
∙ 
∙ echo "Waiting 60s..."
∙ sleep 60
∙ 
∙ echo ""
∙ echo "=== Manual start web/nginx ==="
∙ sudo docker start soniarose-web 2>/dev/null || true
∙ sudo docker start soniarose-nginx 2>/dev/null || true
∙ sleep 10
∙ 
∙ echo ""
∙ echo "=== Status ==="
∙ sudo docker ps
∙ 
∙ echo ""
∙ echo "=== Test ==="
∙ curl -sf http://localhost/ | head -3 && echo "...Landing OK"
∙ curl -sf http://localhost/crm | head -3 && echo "...CRM OK"
∙ '
=== Server up ===
 17:04:15 up 1 min,  0 users,  load average: 3.15, 0.84, 0.29

=== Pull new web image ===
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

=== Image timestamp ===

=== Start all containers ===
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
Waiting 60s...
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
^C%                                                                                                                                

 ▲ soniarose   main  ❯ ssh -i "crmeys copy/ssh-key-2025-12-05 (1).key" -o StrictHostKeyChecking=no opc@168.138.66.139 '
∙ echo "=== Starting Docker ==="
∙ sudo systemctl start docker
∙ sleep 5
∙ 
∙ cd ~/soniarose
∙ 
∙ echo ""
∙ echo "=== Pull new web image ==="
∙ sudo docker pull ghcr.io/pistonsolutions/soniarose-web:latest
∙ 
∙ echo ""
∙ echo "=== Image timestamp ==="
∙ sudo docker images ghcr.io/pistonsolutions/soniarose-web:latest --format "Created: {{.CreatedAt}}"
∙ 
∙ echo ""
∙ echo "=== Start all containers ==="
∙ sudo docker compose -f docker-compose.prod.yml up -d
∙ 
∙ echo "Waiting 60s..."
∙ sleep 60
∙ 
∙ echo ""
∙ echo "=== Manual start web/nginx ==="
∙ sudo docker start soniarose-web 2>/dev/null || true
∙ sudo docker start soniarose-nginx 2>/dev/null || true
∙ sleep 10
∙ 
∙ echo ""
∙ echo "=== Status ==="
∙ sudo docker ps
∙ 
∙ echo ""curl -sf http://localhost/ | head -3 && echo "...Landing OK"'