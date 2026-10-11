#!/bin/bash
# ============================================================
# BinWise - EC2 Deploy Script
# Run this ON your EC2 server when you want to pull latest code
# Usage: bash deploy.sh
# ============================================================

set -e

APP_DIR="/opt/kabaad"
CLIENT_DIR="$APP_DIR/client"
SERVER_DIR="$APP_DIR/server"
WEB_ROOT="/var/www/html"

echo "============================================"
echo "  BinWise EC2 Deploy — $(date)"
echo "============================================"

# Step 1: Pull latest code from GitHub
echo ""
echo "[1/5] Pulling latest code from GitHub..."
cd "$APP_DIR"
git pull origin main
echo "✅ Git pull complete."

# Step 2: Install backend dependencies
echo ""
echo "[2/5] Installing backend dependencies..."
cd "$SERVER_DIR"
npm install --omit=dev
echo "✅ Backend dependencies installed."

# Step 3: Build frontend
echo ""
echo "[3/5] Building frontend..."
cd "$CLIENT_DIR"
npm install --omit=dev
npm run build
echo "✅ Frontend build complete."

# Step 4: Copy frontend build to Nginx web root
echo ""
echo "[4/5] Deploying frontend to Nginx..."
rm -rf "$WEB_ROOT"/*
cp -r "$CLIENT_DIR/dist/"* "$WEB_ROOT/"
echo "✅ Frontend deployed to $WEB_ROOT."

# Step 5: Restart services
echo ""
echo "[5/5] Restarting backend and AI services..."
systemctl restart kabaad-backend
systemctl restart kabaad-ai
systemctl reload nginx
echo "✅ All services restarted."

echo ""
echo "============================================"
echo "  ✅ Deploy Complete!"
echo "  Backend : systemctl status kabaad-backend"
echo "  AI Model: systemctl status kabaad-ai"
echo "============================================"
