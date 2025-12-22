# Sonia Rose CRM

A modern CRM platform designed for real estate professionals to manage client relationships, automate communications, and streamline their workflow.

## Features

- **Contact Management**: Add, edit, and manage client contacts with full details
- **Inbox**: Two-way SMS messaging via Telnyx
- **Automated Workflows**: Day 1, Day 2, Day 3 post-transaction follow-ups, birthdays, and holiday greetings
- **Form Submissions**: Integration with Tally forms for lead capture
- **Templates**: Reusable message templates with variable substitution

## Quick Start

### Prerequisites
- Node.js 18+
- Docker (for PostgreSQL and Redis)
- pnpm

### Local Development

1. **Start databases**:
   ```bash
   docker-compose up -d
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment**:
   ```bash
   cp apps/api/.env.example apps/api/.env
   # Edit .env with your credentials
   ```

4. **Run database migrations**:
   ```bash
   pnpm --filter @soniarose/database db:migrate
   ```

5. **Start development servers**:
   ```bash
   pnpm dev
   ```

   - Web app: http://localhost:3000
   - API: http://localhost:3001

## Default Configuration

### Telnyx (SMS)
The CRM uses Telnyx for SMS messaging. Default credentials are pre-configured:
- **Phone Number**: +1 438 605 5653
- **API Key**: Configured in environment

### Tally (Forms)
Each user can configure their own Tally API key in Settings → Tally API Key.
Once configured, use "Sync Webhooks" to automatically set up form webhooks.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Oracle Cloud deployment instructions.

## Architecture

```
soniarose/
├── apps/
│   ├── api/        # NestJS backend (port 3001)
│   └── web/        # Next.js frontend (port 3000)
├── packages/
│   ├── database/   # Prisma schema and migrations
│   └── lib/        # Shared utilities
└── docker-compose.yml
```

## Support

For questions or issues, contact the development team.
