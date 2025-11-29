'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
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
              alt="Smart Screws Logo - Residential and Commercial Maintenance Services"
              width={120}
              height={61}
              className="h-6 sm:h-7 md:h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Right corner with Green background bar */}
          <div className="hidden md:flex items-center" style={{ direction: 'ltr' }}>
            <nav className="bg-[#0e7888] px-6 py-2 rounded-lg flex items-center gap-6">
              {/* Phone and WhatsApp Group */}
              <div className="flex items-center gap-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/971529804784"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-white/80 transition-colors"
                  aria-label="Contact us on WhatsApp"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                {/* Phone Number */}
                <a
                  href="tel:+971529804784"
                  className="flex items-center gap-2 text-white hover:text-white/80 transition-colors text-sm font-normal"
                  aria-label="Call us at +971 52 980 4784"
                >
                  <Phone className="w-4 h-4" />
                  <span>+971 52 980 4784</span>
                </a>
              </div>
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
              {/* Phone Number - Mobile */}
              <a
                href="tel:+971529804784"
                className="flex items-center gap-2 text-[#213f51] hover:text-[#0e7888] transition-colors py-3 px-2 text-base font-medium rounded-lg hover:bg-[#0e7888]/5"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Call us at +971 52 980 4784"
              >
                <Phone className="w-5 h-5" />
                <span>+971 52 980 4784</span>
              </a>
              {/* WhatsApp - Mobile */}
              <a
                href="https://wa.me/971529804784"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#213f51] hover:text-[#0e7888] transition-colors py-3 px-2 text-base font-medium rounded-lg hover:bg-[#0e7888]/5"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Contact us on WhatsApp"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
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

