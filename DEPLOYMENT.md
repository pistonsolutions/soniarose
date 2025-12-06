# Deployment Guide - OCI Instance

This guide will help you deploy the SoniaRose CRM to your Oracle Cloud Infrastructure instance.

## Prerequisites

- ✅ GitHub repository: `pistonsolutions/soniarose`
- ✅ OCI Instance running at `168.138.66.139`
- ✅ SSH access to OCI instance
- ✅ Docker and Docker Compose installed on OCI instance

## Step 1: Add GitHub Secrets

Navigate to: https://github.com/pistonsolutions/soniarose/settings/secrets/actions

Click **"New repository secret"** and add each of the following:

### OCI Instance Access

| Secret Name | Value | Where to Find |
|------------|-------|---------------|
| `OCI_SSH_PRIVATE_KEY` | Contents of `crmeys copy/ssh-key-2025-12-05 (1).key` | Open the file and copy entire contents including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----` |
| `OCI_HOST` | `168.138.66.139` | Your OCI instance public IP |
| `OCI_USER` | `opc` | Default Oracle Linux user |

### Database Configuration

| Secret Name | Value | Notes |
|------------|-------|-------|
| `DATABASE_PASSWORD` | Choose a strong password | This will be used for PostgreSQL. **DO NOT** use the default `soniarose` in production! |

### Telnyx Credentials

| Secret Name | Value | Where to Find |
|------------|-------|---------------|
| `TELNYX_API_KEY` | Your Telnyx API key | https://portal.telnyx.com/#/app/api-keys |
| `TELNYX_PUBLIC_KEY` | Your Telnyx public key | https://portal.telnyx.com/#/app/account/public-key |
| `TELNYX_PHONE_NUMBER` | Your Telnyx phone number | Format: `+12345678900` |

### Clerk Authentication

| Secret Name | Value | Where to Find |
|------------|-------|---------------|
| `CLERK_SECRET_KEY` | Your Clerk secret key | https://dashboard.clerk.com/ → Your App → API Keys (starts with `sk_`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your Clerk publishable key | https://dashboard.clerk.com/ → Your App → API Keys (starts with `pk_`) |

## Step 2: Prepare OCI Instance

SSH into your OCI instance and install Docker:

```bash
ssh -i "crmeys copy/ssh-key-2025-12-05 (1).key" opc@168.138.66.139
```

### Install Docker and Docker Compose

```bash
# Update system
sudo dnf update -y

# Install Docker
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER

# Logout and login again for group changes to take effect
exit
```

SSH back in:
```bash
ssh -i "crmeys copy/ssh-key-2025-12-05 (1).key" opc@168.138.66.139
```

### Verify Docker Installation

```bash
docker --version
docker compose version
```

## Step 3: Configure OCI Firewall

Open the required ports in your OCI instance security list:

1. Go to OCI Console → Instances → Instance Details
2. Click on the VCN (Virtual Cloud Network)
3. Click on Security Lists → Default Security List
4. Add Ingress Rules:
   - **Port 3000** (TCP) - Next.js Web App
   - **Port 3001** (TCP) - NestJS API

Or via SSH:

```bash
# Open firewall ports
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload
```

## Step 4: Deploy

Once all secrets are added, deployment is automatic!

### Automatic Deployment
Simply push to the `main` branch:

```bash
git add .
git commit -m "Configure deployment"
git push origin main
```

### Manual Deployment
You can also trigger deployment manually from GitHub:

1. Go to: https://github.com/pistonsolutions/soniarose/actions
2. Click on **"Deploy to OCI"** workflow
3. Click **"Run workflow"** → Select `main` branch → **"Run workflow"**

## Step 5: Verify Deployment

After deployment completes (check GitHub Actions), verify your services:

### Check Web App
```bash
curl http://168.138.66.139:3000
```
Or visit in browser: http://168.138.66.139:3000

### Check API
```bash
curl http://168.138.66.139:3001/health
```
Or visit in browser: http://168.138.66.139:3001/health

### Check Running Containers
SSH into your instance and run:

```bash
cd ~/soniarose
docker-compose -f docker-compose.prod.yml ps
```

You should see 4 services running:
- `soniarose-postgres`
- `soniarose-redis`
- `soniarose-api`
- `soniarose-web`

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│   OCI Instance (168.138.66.139)        │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │  Docker Network                  │  │
│  │                                  │  │
│  │  ┌────────────┐  ┌────────────┐ │  │
│  │  │ PostgreSQL │  │   Redis    │ │  │
│  │  │   :5432    │  │   :6379    │ │  │
│  │  └────────────┘  └────────────┘ │  │
│  │         ▲               ▲        │  │
│  │         │               │        │  │
│  │  ┌──────┴───────────────┴─────┐ │  │
│  │  │      NestJS API            │ │  │
│  │  │      :3001                 │ │  │
│  │  └────────────────────────────┘ │  │
│  │         ▲                        │  │
│  │         │                        │  │
│  │  ┌──────┴───────────────────┐   │  │
│  │  │   Next.js Web App        │   │  │
│  │  │   :3000                  │   │  │
│  │  └──────────────────────────┘   │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
         │                │
         │ Port 3000      │ Port 3001
         ▼                ▼
    Public Internet
```

## Monitoring and Maintenance

### View Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f api
docker-compose -f docker-compose.prod.yml logs -f web
```

### Restart Services

```bash
# Restart all
docker-compose -f docker-compose.prod.yml restart

# Restart specific service
docker-compose -f docker-compose.prod.yml restart api
```

### Database Migrations

Migrations run automatically during deployment, but you can run them manually:

```bash
docker-compose -f docker-compose.prod.yml exec api sh -c "cd /app && npx prisma migrate deploy"
```

### Update Environment Variables

1. Update secrets in GitHub
2. SSH to instance
3. Update `~/soniarose/.env` file
4. Restart services:
   ```bash
   cd ~/soniarose
   docker-compose -f docker-compose.prod.yml down
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Troubleshooting

### Deployment fails in GitHub Actions
- Check GitHub Actions logs
- Verify all secrets are correctly set
- Ensure SSH key has no passphrase

### Cannot connect to services
- Verify firewall rules (OCI Security List + instance firewall)
- Check if containers are running: `docker ps`
- Check container logs: `docker-compose -f docker-compose.prod.yml logs`

### Database connection errors
- Verify PostgreSQL is running: `docker ps | grep postgres`
- Check DATABASE_PASSWORD matches in secrets and .env file
- Restart API: `docker-compose -f docker-compose.prod.yml restart api`

### Out of disk space
```bash
# Clean up old Docker images
docker image prune -af

# Clean up old containers
docker container prune -f

# Clean up volumes (CAREFUL - this deletes data!)
# docker volume prune -f
```

## Next Steps

1. **Set up domain name**: Point your domain to `168.138.66.139`
2. **Add SSL/TLS**: Use Caddy or Nginx as reverse proxy with Let's Encrypt
3. **Set up monitoring**: Use Prometheus + Grafana or similar
4. **Configure backups**: Regular PostgreSQL dumps to OCI Object Storage
5. **Add CI/CD improvements**: Staging environment, health check gates

## Support

For issues or questions:
- Check logs first: `docker-compose -f docker-compose.prod.yml logs`
- Review GitHub Actions logs
- Check OCI instance resources (CPU, memory, disk)
