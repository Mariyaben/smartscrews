'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#hero', label: 'HOME' },
    { href: '/#services', label: 'SERVICES' },
    { href: '/#about', label: 'ABOUT' },
    { href: '/#contact', label: 'CONTACT' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.split('#')[1];
      if (window.location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isScrolled ? -4 : 0,
        opacity: 1,
        height: isScrolled ? '64px' : '80px',
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{
        background: isScrolled
          ? 'linear-gradient(135deg, rgba(20, 40, 50, 0.98) 0%, rgba(33, 63, 81, 0.98) 25%, rgba(47, 90, 101, 0.98) 50%, rgba(14, 120, 136, 0.98) 75%, rgba(33, 63, 81, 0.98) 100%)'
          : 'linear-gradient(135deg, rgba(20, 40, 50, 0.95) 0%, rgba(33, 63, 81, 0.95) 25%, rgba(47, 90, 101, 0.95) 50%, rgba(14, 120, 136, 0.95) 75%, rgba(33, 63, 81, 0.95) 100%)',
        borderBottom: `1px solid rgba(255, 255, 255, ${isScrolled ? '0.15' : '0.1'})`,
      }}
    >
      {/* Glassmorphism backdrop blur layer with texture */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          backdropFilter: isScrolled ? 'blur(24px)' : 'blur(16px)',
          opacity: isScrolled ? 1 : 0.9,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Additional color blend overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(14, 120, 136, 0.3) 0%, rgba(47, 90, 101, 0.2) 50%, rgba(33, 63, 81, 0.3) 100%)',
        }}
      />
      
      {/* Extremely light shadow layer below header only - much shorter */}
      <div 
        className="absolute inset-x-0 bottom-0 h-6 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.002) 0%, rgba(0, 0, 0, 0.0003) 5%, transparent 100%)',
          filter: 'blur(2px)',
          transform: 'translateY(100%)',
        }}
      />
      
      {/* Smooth gradient transition overlay for blending with hero - much shorter */}
      <motion.div 
        className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
        animate={{
          opacity: isScrolled ? 0.5 : 1,
          y: isScrolled ? 4 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          background: 'linear-gradient(to bottom, rgba(20, 40, 50, 0.08) 0%, rgba(20, 40, 50, 0.04) 40%, rgba(20, 40, 50, 0.015) 80%, transparent 100%)',
        }}
      />
      
      {/* Extremely light soft shadow for depth below header - much shorter */}
      <div 
        className="absolute inset-x-0 -bottom-2 h-4 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.005) 0%, transparent 70%)',
          filter: 'blur(3px)',
        }}
      />
      
      {/* Content container with relative positioning */}
      <div className="relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex items-center justify-between"
            animate={{
              height: isScrolled ? '64px' : '80px',
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
          {/* Logo */}
            <motion.div
              animate={{
                scale: isScrolled ? 0.88 : 1,
                x: isScrolled ? -2 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
          <Link
            href="/#hero"
                onClick={(e) => handleNavClick(e, '/#hero')}
                className="text-2xl uppercase hover:opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded"
                style={{
                  color: '#ffffff',
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, "Inter", "Helvetica Neue", sans-serif',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                }}
              >
                SMARTSCREWS
          </Link>
            </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{
                    opacity: isScrolled ? 0.9 : 1,
                    y: isScrolled ? -2 : 0,
                    scale: isScrolled ? 0.92 : 1,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.03,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
              <Link
                href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="uppercase hover:opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1"
                    style={{
                      color: '#ffffff',
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, "Inter", "Helvetica Neue", sans-serif',
                      fontWeight: 300,
                      letterSpacing: '0.01em',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                    }}
              >
                {link.label}
              </Link>
                </motion.div>
              ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
              className="md:hidden p-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded transition-all duration-300"
              style={{
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
                style={{ color: '#ffffff' }}
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden relative z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 40, 50, 0.98) 0%, rgba(33, 63, 81, 0.98) 25%, rgba(47, 90, 101, 0.98) 50%, rgba(14, 120, 136, 0.98) 75%, rgba(33, 63, 81, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block uppercase hover:opacity-80 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 transition-all duration-300"
                  style={{
                    color: '#ffffff',
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, "Inter", "Helvetica Neue", sans-serif',
                    fontWeight: 300,
                    letterSpacing: '0.01em',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

