/**
 * Design System Tokens for Smartscrews
 * 
 * Color tokens, typography, spacing, and other design system values
 */

export const theme = {
  colors: {
    primaryBackground: '#faf9f6',
    accent: '#2f5a65',
    deep: '#213f51',
    cta: '#0e7888',
    textPrimary: '#213f51',
    mutedText: 'rgba(33,63,81,0.7)',
    success: '#2f9d7a',
    danger: '#d9534f',
    white: '#ffffff',
    black: '#000000',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  typography: {
    fontFamily: {
      sans: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
      mono: 'var(--font-geist-mono), monospace',
    },
    fontSize: {
      body: '16px',
      h1: 'clamp(2.5rem, 5vw, 4rem)',
      h2: 'clamp(1.75rem, 3vw, 2.5rem)',
      h3: 'clamp(1.25rem, 2vw, 1.75rem)',
    },
    lineHeight: {
      body: 1.5,
      heading: 1.2,
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  breakpoints: {
    sm: '640px',
    md: '1024px',
    lg: '1024px',
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
  },
} as const;

export type Theme = typeof theme;

