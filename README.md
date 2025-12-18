# SoniaRose CRM Monorepo
 
This repository houses the SoniaRose CRM platform, built as a full TypeScript monorepo powered by Turborepo and pnpm.

## Structure

- `apps/web` – Next.js 14 App Router frontend consuming the SoniaRose API
- `apps/api` – NestJS backend API and workflow engine
- `packages/lib` – Shared TypeScript utilities and domain models
- `packages/database` – Prisma schema and DB client wrapper
- `docs` – Planning and implementation notes

## Current Backend Capabilities

- Contact CRUD endpoints with Prisma/Postgres persistence (includes tag management and recent message summaries)
- Automatic enqueue of the Five Days of Joy workflow when a contact is created
- Redis-backed BullMQ queue + worker skeleton for workflow orchestration
- Workflow run management endpoints for queue overview, recent run history, and per-run retries (`/api/workflows/*`)
- Compliance API (`/api/compliance/events`, `/api/compliance/summary`) surfacing STOP/HELP history and opt-out metrics
- Media listing endpoint returning asset metadata with related contacts (`/api/media`)
- Health check endpoint (`/api/health`) for infrastructure probes
- Twilio service wrapper ready for SMS send (credentials required)

- Auth-less console shell in `apps/web/app/(console)` with sidebar navigation for Overview, Contacts, Workflows, Media, Compliance, Inbox, and Settings
- Overview dashboard surfacing live counts (contacts, opt-ins, reviews needed, active conversations) from the Contacts API and highlighting recent adds
- Contacts index with opt-in status, quick stats, CTA to add a contact, and deep links to detailed profiles
- New-contact flow at `/contacts/new` powered by `ContactForm` (client component) that posts to the API and redirects on success
- Contact profile page showing recent messages, timeline, compliance history, pipeline stage, and contextual tags
- Workflows dashboard backed by live API calls for queue metrics, recent run history, step summaries, and per-run retry actions
- Compliance dashboard summarising STOP/HELP counts, opted-out totals, and detailed event tables linking back to contacts
- Media library table consuming the `/media` endpoint to display object metadata, expiry, size, and owner attribution
- Inbox, Settings views remain placeholders pending webhook plumbing and configuration design

## Prerequisites

- Node.js 20 LTS (ships with Corepack)
- pnpm package manager (enable via `corepack enable pnpm` or install globally with `npm install -g pnpm`)
- Docker Desktop (for local Postgres and Redis containers)

## Getting Started

1. Install pnpm if it is not already available.
2. Install dependencies:
   ```powershell
   pnpm install
   ```
3. Generate the Prisma client (once per schema update):
   ```powershell
   pnpm --filter @soniarose/database generate
   ```
4. Bring up Postgres and Redis locally:
   ```powershell
   docker compose up -d postgres redis
   ```
5. Start the dev processes in parallel:
   ```powershell
   pnpm dev
   ```

### Environment Variables

- `NEXT_PUBLIC_API_URL` – Base URL for the API when developing or deploying the Next.js console (defaults to `http://localhost:3001/api` if unset)
- `DATABASE_URL`, `REDIS_URL`, and Twilio credentials remain required for the API as documented in `apps/api/.env.example`

## Local Services

A `docker-compose.yml` file provisions Postgres 16 and Redis 7. Databases persist in local named volumes. For Oracle Cloud deployments, plan to run Postgres and Redis inside OCI Container Instances (self-managed) or migrate to equivalent managed offerings when convenient.

## Deployment Notes

- **Oracle Cloud Infrastructure (OCI)** will host the applications.
- Containers are self-managed; include Postgres, Redis, API, and Web containers within the deployment topology.
- Configure Twilio credentials, S3-compatible object storage keys, and other secrets via OCI Vault / environment variables.

## Testing

- API unit tests run with Jest:
   ```powershell
   pnpm --filter @soniarose/api test
   ```
- Add more test harnesses (integration/e2e) as endpoints solidify.

## Outstanding Work and TODOs

- Implement the BullMQ worker actions for Five Days of Joy, Birthday Video, and manual video workflows (currently placeholders)
- Wire Twilio webhooks with signature verification, message persistence, and STOP/HELP compliance logic
- Build the Conversations inbox UI and call log once webhook plumbing is complete
- Add media upload flows, presigned URL handling, and asset lifecycle management (current view is read-only)
- Replace temporary Prisma casting in services after running `pnpm db:generate` and introduce repository-level typing helpers
- Layer authentication/multi-tenant guards plus role-based access controls
- Automate OCI container builds/deployments and add infrastructure-as-code definitions