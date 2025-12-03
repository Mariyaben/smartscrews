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

### Required: Resend API Key for Contact Form

The contact form uses Resend to send emails to `hello@smartscrews.ae`. You need to set up a Resend API key:

1. **Create a Resend account:**
   - Go to [resend.com](https://resend.com) and sign up
   - Verify your email address

2. **Get your API key:**
   - Go to the Resend dashboard
   - Navigate to API Keys section
   - Create a new API key
   - Copy the API key (starts with `re_`)

3. **Set up environment variable locally:**
   - Create a `.env.local` file in the project root
   - Add: `RESEND_API_KEY=re_your_api_key_here`

4. **Set up environment variable in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add: `RESEND_API_KEY` with your API key value
   - Make sure to add it for Production, Preview, and Development environments

5. **Domain verification (optional but recommended):**
   - In Resend dashboard, go to Domains
   - Add and verify your domain (e.g., `smartscrews.ae`)
   - Update the `from` field in `app/api/contact/route.ts` to use your verified domain
   - Currently using `onboarding@resend.dev` for testing (works without domain verification)

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






