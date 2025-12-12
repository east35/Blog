# NAS Setup Guide

This guide will help you set up your personal blog on your Synology NAS with automatic deployment via git push.

## Architecture

- **Git bare repository** on NAS receives pushes from your local machine
- **Post-receive hook** automatically rebuilds the site when you push
- **Docker container** (nginx) serves the static site
- **Remote editing** - SSH into NAS to edit markdown files, or edit locally and push

## Prerequisites

- SSH access to your Synology NAS
- Docker installed on Synology (via Package Center)
- Node.js installed on Synology (via Package Center or manually)

## Step 1: Set up directories on NAS

SSH into your NAS and create the necessary directories:

```bash
ssh your-username@your-nas-ip

# Create directories
mkdir -p /volume1/docker/blog
cd /volume1/docker/blog

# Create git bare repository
git init --bare blog.git

# Create working directory for the site
mkdir site
```

## Step 2: Set up the post-receive hook

```bash
# Create the post-receive hook
cat > /volume1/docker/blog/blog.git/hooks/post-receive << 'EOF'
#!/bin/bash
set -e

WORK_TREE="/volume1/docker/blog/site"
GIT_DIR="/volume1/docker/blog/blog.git"

echo "==> Deploying blog..."
git --work-tree=$WORK_TREE --git-dir=$GIT_DIR checkout -f main

cd $WORK_TREE

if git diff-tree --name-only --no-commit-id -r HEAD | grep -q "package.json"; then
    echo "==> Installing dependencies..."
    npm install
fi

echo "==> Building site..."
npm run build

echo "==> Restarting Docker container..."
cd /volume1/docker/blog
docker-compose restart blog

echo "==> Deployment complete!"
EOF

# Make it executable
chmod +x /volume1/docker/blog/blog.git/hooks/post-receive
```

## Step 3: Set up Docker

Copy the Docker configuration files to your NAS:

```bash
# On your NAS, in /volume1/docker/blog/
# You'll upload docker-compose.yml and nginx.conf from the nas-setup folder
```

Or manually create them on the NAS:

### docker-compose.yml
```yaml
version: '3.8'

services:
  blog:
    image: nginx:alpine
    container_name: personal-blog
    ports:
      - "8080:80"
    volumes:
      - ./site/public:/usr/share/nginx/html:ro
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    restart: unless-stopped
```

### nginx.conf
(Copy from the nas-setup/nginx.conf file)

## Step 4: Start the Docker container

```bash
cd /volume1/docker/blog
docker-compose up -d
```

## Step 5: Configure local git remote

On your local machine (Mac):

```bash
# Update deploy.sh with your NAS details
nano deploy.sh

# Add the NAS as a git remote
git remote add nas ssh://your-username@your-nas-ip/volume1/docker/blog/blog.git

# Make initial commit
git add .
git commit -m "Initial commit"

# Push to NAS
git push nas main
```

## Step 6: Access your blog

Your blog should now be accessible at:
- `http://your-nas-ip:8080`
- Or configure a reverse proxy in Synology to use a custom domain

## Remote Editing Workflows

### Option 1: Edit locally, push to deploy
```bash
# Edit your markdown files locally
vim posts/2024/new-post.md

# Deploy
./deploy.sh
```

### Option 2: Edit directly on NAS
```bash
# SSH into NAS
ssh your-username@your-nas-ip

# Navigate to site
cd /volume1/docker/blog/site

# Edit files
vim posts/2024/new-post.md

# Rebuild
npm run build

# Restart container
cd /volume1/docker/blog
docker-compose restart blog
```

### Option 3: Mount NAS via SFTP/SMB
- Mount `/volume1/docker/blog/site` as a network drive
- Edit files locally with your favorite editor
- SSH in to rebuild, or set up a file watcher

## Troubleshooting

### Check container logs
```bash
docker logs personal-blog
```

### Check if container is running
```bash
docker ps | grep personal-blog
```

### Manually rebuild
```bash
cd /volume1/docker/blog/site
npm run build
```

### Check git hook execution
```bash
# Add debug output to post-receive hook
# Check /var/log/messages or container logs
```

## Optional: Set up domain name

1. In Synology DSM, go to Control Panel > Login Portal > Advanced > Reverse Proxy
2. Add a new rule:
   - Source: your-domain.com, port 443 (HTTPS)
   - Destination: localhost, port 8080
3. Set up Let's Encrypt certificate in Control Panel > Security > Certificate

## Security Notes

- Consider setting up SSH key authentication instead of passwords
- Use firewall rules to restrict access
- Keep Docker images updated: `docker-compose pull && docker-compose up -d`
- Consider setting up automatic backups of `/volume1/docker/blog`
