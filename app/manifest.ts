import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Smart Screws - Professional Building & Maintenance Services',
    short_name: 'Smart Screws',
    description: 'Smart Screws delivers expert building and maintenance services including carpentry, plumbing, HVAC, tiling, painting, kitchen renovation, and architectural design.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0e7888',
    icons: [
      {
        src: '/NEWNEWLOGO.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    categories: ['business', 'productivity'],
    lang: 'en',
    orientation: 'portrait-primary',
  };
}

