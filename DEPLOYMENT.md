# Deployment Guide - Smartscrews Website

## Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project

### Option 2: GitHub Integration

1. Push code to GitHub repository

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "Add New Project"

4. Import your GitHub repository

5. Vercel will auto-detect Next.js settings

6. Click "Deploy"

Your site will be live at `https://your-project.vercel.app`

## Environment Variables

No environment variables required for basic functionality.

### Optional: Email Service Integration

If you want to send real emails from the contact form:

1. Choose an email service (SendGrid, Resend, Nodemailer, etc.)

2. Add environment variable in Vercel:
   - Go to Project Settings → Environment Variables
   - Add your API key (e.g., `SENDGRID_API_KEY`)

3. Update `app/api/contact/route.ts` to use the email service

## Custom Domain

1. In Vercel dashboard, go to your project

2. Navigate to Settings → Domains

3. Add your custom domain

4. Configure DNS records as instructed by Vercel

5. Wait for SSL certificate (automatic)

## Post-Deployment Checklist

- [ ] Test contact form submission
- [ ] Verify all pages load correctly
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Test accessibility with keyboard navigation
- [ ] Verify SEO meta tags
- [ ] Update contact information if needed
- [ ] Set up email service integration (optional)

## Performance Optimization

The site is already optimized with:
- Code splitting
- Static page generation
- Optimized fonts (Geist)
- CSS optimization
- Image optimization ready (when images are added)

## Monitoring

Consider setting up:
- Vercel Analytics (built-in)
- Error tracking (Sentry, etc.)
- Uptime monitoring

## Support

For deployment issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

