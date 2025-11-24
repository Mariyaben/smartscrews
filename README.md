# Smartscrews - Building & Maintenance Services Website

A modern, responsive Next.js website for Smartscrews, a professional building and maintenance company. Built with TypeScript, Tailwind CSS, and Framer Motion for smooth animations.

## Features

- 🎨 **Modern Design System** - Custom theme with color tokens, typography, and spacing
- 🎬 **Animated Service Cards** - SVG animations for each service type
- 📱 **Fully Responsive** - Mobile-first design with breakpoints at 640px and 1024px
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation and focus indicators
- 🔍 **SEO Optimized** - Meta tags and structured data for LocalBusiness schema
- 📝 **Contact Form** - Serverless API endpoint with client-side validation
- ⚡ **Performance Optimized** - Code splitting and optimized assets

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smartscrews
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
smartscrews/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── services/          # Service pages
│   │   └── [id]/         # Dynamic service detail pages
│   ├── layout.tsx        # Root layout with SEO
│   ├── page.tsx          # Home page
│   ├── services/         # Services listing page
│   ├── projects/         # Projects page
│   ├── about/            # About page
│   └── contact/          # Contact page
├── components/            # React components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── Hero.tsx          # Homepage hero section
│   ├── ServiceCard.tsx   # Service card with animations
│   ├── ServiceGrid.tsx   # Services grid with filtering
│   ├── ServiceAnimation.tsx # Animated SVG illustrations
│   └── ContactForm.tsx   # Contact form with validation
├── lib/                   # Utilities and data
│   └── data.ts           # Services data source
├── styles/                # Styles and theme
│   └── theme.ts          # Design system tokens
└── public/                # Static assets
    └── assets/           # Images and animations
```

## Design System

### Colors

- **Primary Background**: `#fef8e0` (Off white)
- **Accent**: `#2f5a65` (Teal)
- **Deep**: `#213f51` (Deep blue)
- **CTA**: `#0e7888` (Call to action teal)
- **Success**: `#2f9d7a`
- **Danger**: `#d9534f`

### Typography

- **H1**: Large and confident (clamp 2.5rem - 4rem)
- **H2**: Medium bold (clamp 1.75rem - 2.5rem)
- **Body**: 16px, line-height 1.5

### Spacing

Scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px

## Services

The website showcases 11 services:

1. Carpentry and Wood Flooring Works
2. Building Cleaning Services
3. Floor and Wall Tiling Works
4. False Ceiling and Light Partitions Installation
5. Engraving and Ornamentation Works
6. Wallpaper Fixing Works
7. Plaster Works
8. Electromechanical Equipment Installation and Maintenance
9. Plumbing and Sanitary Installation
10. Air Conditioning, Ventilation and Air Filtration Systems
11. Painting Contracting

## Contact Form

The contact form includes:
- Name, email, phone validation
- Service selection
- Message field
- Optional file upload
- Client-side validation with error messages
- Serverless API endpoint at `/api/contact`

### Contact Form API

The contact form submits to `/api/contact` which:
- Validates required fields
- Saves submissions to `submissions/` directory (development)
- Logs to console
- Returns JSON response

**Production Setup**: Update `app/api/contact/route.ts` to integrate with your email service (e.g., SendGrid, Resend, or Nodemailer).

Example integration:
```typescript
// Add to route.ts
import { sendEmail } from '@/lib/email';

// In POST handler:
await sendEmail({
  to: 'info@smartscrews.com',
  subject: `New Contact Form: ${service}`,
  body: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
});
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub, GitLab, or Bitbucket

2. Import your repository in [Vercel](https://vercel.com)

3. Vercel will automatically:
   - Detect Next.js
   - Install dependencies
   - Build the project
   - Deploy to production

4. Your site will be live at `https://your-project.vercel.app`

### Environment Variables

No environment variables are required for basic functionality. Add any API keys for email services in Vercel's environment variables section if needed.

### Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Performance Targets

- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

Run Lighthouse audits:
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

## Accessibility

The site follows WCAG AA guidelines:
- Keyboard navigation support
- Visible focus indicators
- Proper ARIA labels
- Color contrast compliance
- Semantic HTML structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Adding a New Service

1. Add service data to `lib/data.ts`:
```typescript
{
  id: 'service-id',
  title: 'Service Title',
  shortDescription: 'Brief description',
  longDescription: 'Detailed description',
  animationPath: '/assets/animations/service.json',
  imagePath: '/assets/images/service.jpg',
  serviceCategory: 'Construction',
  processSteps: ['Step 1', 'Step 2', ...],
  testimonials: [],
  galleryImages: [],
}
```

2. Add animation component in `components/ServiceCard.tsx` and `components/ServiceAnimation.tsx`

### Customizing Colors

Update color values in:
- `styles/theme.ts`
- `app/globals.css` CSS variables

## Testing

Run the linter:
```bash
npm run lint
```

## License

Private - All rights reserved

## Support

For questions or issues, contact: info@smartscrews.com

---

Built with ❤️ using Next.js
