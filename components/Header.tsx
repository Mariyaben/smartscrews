'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const navLinks = [
    { href: '/#about', label: t.nav.about },
    { href: '/#services', label: t.nav.services },
    { href: '/#services', label: t.nav.projects },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.split('#')[1];
      if (window.location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Log warning for debugging - section doesn't exist
          console.warn(`Navigation target "#${hash}" not found on page`);
        }
      }
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent" style={{ direction: 'ltr' }}>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between h-16" style={{ direction: 'ltr' }}>
          {/* Logo - Left corner */}
          <Link
            href="/#hero"
            onClick={(e) => handleNavClick(e, '/#hero')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            style={{ direction: 'ltr' }}
          >
            <Image
              src="/NEWNEWLOGO.svg"
              alt="Smart Screws Logo - Professional Building & Maintenance Services"
              width={120}
              height={61}
              className="h-6 sm:h-7 md:h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Right corner with Green background bar */}
          <div className="hidden md:flex items-center" style={{ direction: 'ltr' }}>
            <nav className="bg-[#0e7888] px-6 py-2 rounded-lg flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white hover:text-white/80 transition-colors text-sm font-normal"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="text-white hover:text-white/80 transition-all p-2 rounded-md hover:bg-white/20 flex items-center justify-center"
                aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                style={{ minWidth: '40px', minHeight: '32px', fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif', fontWeight: 500 }}
              >
                {language === 'en' ? (
                  <span style={{ fontSize: '18px', direction: 'rtl' }}>ع</span>
                ) : (
                  <span style={{ fontSize: '14px' }}>EN</span>
                )}
              </button>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:opacity-80 transition-opacity"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            style={{
              backgroundColor: isMobileMenuOpen ? 'rgba(14, 120, 136, 0.2)' : 'transparent',
              borderRadius: '8px'
            }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/98 backdrop-blur-md border-t border-gray-200 shadow-lg"
            style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}
          >
            <div className="container mx-auto px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-[#213f51] hover:text-[#0e7888] transition-colors py-3 px-2 text-base font-medium rounded-lg hover:bg-[#0e7888]/5"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={(e) => {
                  handleNavClick(e, '/#contact');
                  setIsMobileMenuOpen(false);
                }}
                className="block px-4 py-3 text-base font-medium text-white bg-[#0e7888] border border-[#0e7888] rounded-lg hover:bg-[#0e7888]/90 hover:border-[#0e7888]/90 transition-colors text-center mt-4"
              >
                {t.nav.contactUs}
              </Link>
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 text-base font-medium text-[#213f51] border-2 border-gray-300 rounded-lg hover:border-[#0e7888] hover:text-[#0e7888] hover:bg-[#0e7888]/5 transition-colors w-full mt-2"
                aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                {language === 'en' ? (
                  <span style={{ fontSize: '18px', direction: 'rtl', fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif', fontWeight: 500 }}>ع</span>
                ) : (
                  <span style={{ fontSize: '16px', fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif', fontWeight: 500 }}>EN</span>
                )}
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

