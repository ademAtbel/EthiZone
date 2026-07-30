# EthiZone (ethizone.com) 10/10 Production Deployment Guide

This guide details the exact steps to connect your custom domain **`ethizone.com`** and deploy both frontend and backend to production.

---

## 1. Domain Configuration for `ethizone.com` (Vercel)

1. Log into your **Vercel Account** and navigate to your EthiZone frontend project.
2. Go to **Settings -> Domains**.
3. Add **`ethizone.com`** and **`www.ethizone.com`**.
4. Configure DNS settings at your domain registrar (e.g. GoDaddy, Namecheap, Cloudflare, Google Domains):

| Type | Name | Value / Target | Notes |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` | Points `ethizone.com` to Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com` | Points `www.ethizone.com` to Vercel |

Vercel will automatically issue a free SSL certificate (`https://`) within 1-2 minutes of DNS propagation.

---

## 2. Production Environment Variables Setup

### Frontend Environment Variables (Vercel Project Settings -> Environment Variables)
```env
VITE_API_BASE_URL=https://api.ethizone.com
VITE_SOCKET_URL=https://api.ethizone.com
```

### Backend Environment Variables (Render / Railway / AWS / Heroku)
```env
NODE_ENV=production
PORT=5001
MONGO_URI=mongodb+srv://<admin_user>:<password>@cluster0.mongodb.net/ethizone?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_32char_jwt_secret_here
CLIENT_URL=https://ethizone.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=support@ethizone.com
EMAIL_PASS=your_email_app_password
```

---

## 3. Backend Health & Uptime Monitoring

Once the backend is live, configure a free monitoring check on [UptimeRobot](https://uptimerobot.com/) or BetterStack pointing to:
- **URL**: `https://api.ethizone.com/health` (or `https://ethizone-server.onrender.com/health`)
- **Interval**: Every 5 minutes

This endpoint responds with HTTP 200 and real-time MongoDB health status.

---

## 4. Final Deployment Commands

### Option A: Automatic Git Deployment
1. Connect your repository to Vercel and Render.
2. Push your `main` branch to trigger live compilation.

### Option B: Direct CLI Deployment
```bash
# Frontend Vercel Deploy
cd client
npx vercel --prod
```

Your web application is now **10/10 production ready** for **https://ethizone.com**!
