#!/bin/bash
set -e

# Configuration - Update these values
NAS_USER="Jim"
NAS_HOST="192.168.4.2"
GIT_REMOTE_PATH="/volume1/docker/blog/blog.git"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Building site...${NC}"
npm run build

echo -e "${BLUE}Committing changes...${NC}"
git add .
git commit -m "Update blog content - $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

echo -e "${BLUE}Pushing to NAS...${NC}"
git push nas main

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "Your site should be live on your NAS"
