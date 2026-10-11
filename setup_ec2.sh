#!/bin/bash
set -e

echo "=== Configuring Nginx ==="
cat > /etc/nginx/sites-available/default << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm;
    server_name _;

    client_max_body_size 50M;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /ai/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOF

nginx -t
systemctl restart nginx

echo "=== Copying Frontend build ==="
rm -rf /var/www/html/*
cp -r /opt/kabaad/client/dist/* /var/www/html/

echo "=== Setting up AI Microservice ==="
cat > /etc/systemd/system/kabaad-ai.service << 'EOF'
[Unit]
Description=BinWise AI PyTorch EfficientNet Inference Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/kabaad
ExecStart=/opt/kabaad/venv/bin/uvicorn ai_service:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=5
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
EOF

echo "=== Setting up Backend Server ==="
cat > /etc/systemd/system/kabaad-backend.service << 'EOF'
[Unit]
Description=KabaadSeJugaad Express Backend Server
After=network.target kabaad-ai.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/kabaad/server
ExecStart=/usr/bin/node index.js
Restart=always
RestartSec=5
EnvironmentFile=/opt/kabaad/server/.env

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable kabaad-ai
systemctl restart kabaad-ai
systemctl enable kabaad-backend
systemctl restart kabaad-backend

sleep 3
echo "=== Checking Service Statuses ==="
systemctl status kabaad-ai --no-pager
systemctl status kabaad-backend --no-pager
systemctl status nginx --no-pager
echo "=== Setup Complete! ==="
