# Hosting T01 - what to buy and how to keep it secure

T01 is **one Node.js app** (API + built website on the same address) plus **MongoDB**. That makes hosting simple.

## Recommended setup (prices checked Nov 2026 - confirm on the provider pages before paying)

| Part | Recommended plan | Approx. cost |
|---|---|---|
| App (Node) | **Render - Web Service, Starter** (always-on, free HTTPS, deploys from GitHub) in the **Singapore** region (closest to India) | about **$7 / month** |
| Uploaded images | Render persistent disk, 1 GB, mounted at `/var/data` | $0.25 / GB / month |
| Database | **MongoDB Atlas - Flex** (pay-as-you-go, capped at about $30/month), or **M10 dedicated** (about $57/month) once you have real traffic | about **$8-30 / month** to start |
| Domain | Any registrar (.in / .com), pointed at Render | about ₹500-1,000 / year |
| Email (optional) | Any SMTP (Brevo, Zoho, SES...) for receipts and password reset | free tier is enough to start |

**Realistic starting total: roughly $15-40 / month.**

### Why not the free plans for the live site?
- Render **Free** web services go to sleep after ~15 minutes without traffic and cannot attach a disk. Cashfree webhooks and the first visitor after a nap would hit a cold or sleeping server.
- Atlas **M0 (free)** has no uptime SLA and is meant for testing. Fine for your sandbox phase; move to Flex or M10 before taking real money.

### Persistent-disk side effect
A service with a disk runs as a single instance and redeploys take a few seconds of downtime. That is fine at this stage. (If you later want zero-downtime and several instances, move thumbnails to object storage such as S3/R2.)

## Deploy steps (about 30 minutes)
1. **GitHub:** push this project (the `.gitignore` already blocks `.env` and `node_modules`).
2. **Atlas:** create a cluster, a database user with a long random password (read/write on the `t01` database only), and copy the connection string. Prefer a Mumbai or Singapore region if offered. Under *Network Access* allow Render's outbound addresses (Render lists them for your region in its dashboard); if you cannot, `0.0.0.0/0` is acceptable only with that strong password.
3. **Render:** *New -> Blueprint* -> pick the repo (it reads `render.yaml`). Fill the secret fields it asks for (`MONGO_URI`, `CASHFREE_APP_ID`, `CASHFREE_SECRET_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`...). `JWT_SECRET` is generated for you. Keep `CASHFREE_ENV=sandbox` until step 7.
4. **Domain:** add your domain in Render, set the DNS records it shows, wait for the HTTPS certificate. Then set `CLIENT_URL` and `SERVER_PUBLIC_URL` to `https://your-domain` (same value) and redeploy.
5. **Create the admin + sample data once:** Render dashboard -> your service -> *Shell*: `npm run seed`. Log in, change nothing in code - add real products in **Admin**.
6. **Cashfree webhook:** Cashfree dashboard -> Developers -> Webhooks -> add `https://your-domain/api/payments/webhook`.
7. **Go live:** finish Cashfree KYC/activation, **whitelist your domain** (Developers -> Whitelisting; https only, no `www`/port in the entry), generate **production** keys, put them in Render, set `CASHFREE_ENV=production`, redeploy, make one real small purchase and refund it.

## Alternatives
- **A VPS in India** (e.g. AWS Lightsail Mumbai, DigitalOcean Bangalore): cheaper at scale and data stays in India, but you maintain the server yourself (updates, firewall, Nginx/Caddy HTTPS, backups). Choose this only if you are comfortable with Linux.
- **Railway / Fly.io:** also work with this app; the Render blueprint is just the shortest path.
