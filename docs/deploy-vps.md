# Giina-Web VPS Deploy

Target pattern: Nginx + PM2 + Next.js, matching the Finanzas-Personales style.

## Server Layout

- App directory: `/var/www/giina-web/current`
- Internal app URL: `http://127.0.0.1:3000`
- Public domain: `https://giinadesign.com`
- PM2 app name: `giina-web`

## Environment

Create `.env.production` on the VPS from `.env.production.example`.

Required values:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_SITE_URL`

## Build And Run

```bash
cd /var/www/giina-web/current
npm ci
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

For updates:

```bash
cd /var/www/giina-web/current
git pull
npm ci
npm run build
pm2 restart giina-web
```

## Nginx Site

```nginx
server {
    listen 80;
    server_name giinadesign.com www.giinadesign.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and verify:

```bash
sudo ln -s /etc/nginx/sites-available/giina-web /etc/nginx/sites-enabled/giina-web
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d giinadesign.com -d www.giinadesign.com
```

## Health Checks

```bash
pm2 status giina-web
pm2 logs giina-web --lines 100
curl -I http://127.0.0.1:3000/en
curl -I https://giinadesign.com/en
sudo nginx -t
```
