'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t, isRTL, language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsMobileMenuOpen(false);
    }
  };
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-0">
      {/* Full Background Image - extends to top */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Professional workshop with team members"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Shadow gradient overlay from left - dark grey background effect */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 650px 300px at top left, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, 0.05) 60%, transparent 80%),
            linear-gradient(to right, rgba(42, 42, 42, 0.95) 0%, rgba(42, 42, 42, 0.85) 30%, rgba(42, 42, 42, 0.5) 50%, rgba(42, 42, 42, 0.2) 70%, transparent 100%)
          `
        }}
      />

      {/* Logo - Top Left Corner */}
      <div className="flex absolute left-0 z-[100] ml-4 sm:ml-6 lg:ml-8 items-center" style={{ top: 'clamp(8px, 1vw, 16px)', direction: 'ltr', right: 'auto' }}>
        <Image
          src="/NEWNEWLOGO.svg"
          alt="Company Logo"
          width={120}
          height={61}
          className="w-auto h-auto"
          style={{
            height: 'clamp(36px, 5vw, 72px)',
            width: 'auto',
            position: 'relative',
            zIndex: 101
          }}
          priority
        />
        <Image
          src="/TEXTLOGO.svg"
          alt="Company Text"
          width={600}
          height={120}
          className="w-auto h-auto"
          style={{
            height: 'clamp(24px, 3vw, 48px)',
            width: 'auto',
            marginLeft: '-80px',
            position: 'relative',
            zIndex: 101
          }}
          priority
        />
      </div>

      {/* Mobile Hamburger Menu Button - Top Right Corner */}
      <button
        className="md:hidden absolute top-0 right-0 z-[100] mt-4 mr-4 p-2 text-white hover:opacity-80 transition-opacity"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
        style={{
          backgroundColor: isMobileMenuOpen ? 'rgba(14, 120, 136, 0.3)' : 'transparent',
          borderRadius: '8px',
          transition: 'background-color 0.3s ease'
        }}
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
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
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            />
            
            {/* Menu Panel */}
            <motion.nav
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0e7888] shadow-2xl z-[95] overflow-y-auto"
              style={{ direction: 'ltr' }}
            >
              <div className="flex flex-col h-full">
                {/* Header with Logo and Close Button */}
                <div className="flex items-start justify-between p-6 pb-4">
                  {/* Logo */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src="/NEWNEWLOGO.svg"
                      alt="SmartScrews Logo"
                      width={40}
                      height={40}
                      className="w-auto h-auto"
                      style={{
                        height: '32px',
                        width: 'auto'
                      }}
                      priority
                    />
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif' }}>Smart</span>
                      <span className="text-white/80 text-xs" style={{ fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif' }}>TECHNICAL SERVICES LLC</span>
                    </div>
                  </motion.div>
                  
                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#213f51] hover:bg-[#2f5a65] transition-colors"
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-2 px-6 py-4">
                  <motion.a
                    href="#about"
                    onClick={(e) => handleNavClick(e, '#about')}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#7dd3fc] text-lg font-light py-3 px-4 rounded-lg hover:bg-[#0e7888]/80 hover:text-white transition-all"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {t.nav.about}
                  </motion.a>
                  <motion.a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-[#7dd3fc] text-lg font-light py-3 px-4 rounded-lg hover:bg-[#0e7888]/80 hover:text-white transition-all"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {t.nav.services}
                  </motion.a>
                  <motion.a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, '#contact')}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#7dd3fc] text-lg font-light py-3 px-4 rounded-lg hover:bg-[#0e7888]/80 hover:text-white transition-all"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {t.nav.contact}
                  </motion.a>
                </div>

                {/* Language Toggle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-auto px-6 py-6"
                >
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white text-base font-medium rounded-lg hover:bg-[#0e7888]/80 transition-all"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 400,
                      backgroundColor: 'rgba(33, 63, 81, 0.3)'
                    }}
                    aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                  >
                    {language === 'en' ? (
                      <>
                        <span>العربية</span>
                        <span style={{ fontSize: '18px', direction: 'rtl' }}>ع</span>
                      </>
                    ) : (
                      <>
                        <span>English</span>
                        <span style={{ fontSize: '16px' }}>EN</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Navigation Bar - Top Right Corner */}
      <nav className="hidden md:flex absolute top-0 right-0 z-[60] mt-4 mr-4 sm:mr-6 lg:mr-8 items-center" style={{ direction: 'ltr', left: 'auto' }}>
        <div 
          className="flex items-center gap-8 sm:gap-12 lg:gap-16"
          style={{ 
            backgroundColor: '#0e7888',
            color: '#ffffff',
            paddingLeft: 'clamp(4rem, 10vw, 8rem)',
            paddingRight: 'clamp(2rem, 6vw, 5rem)',
            paddingTop: 'clamp(0.5rem, 1vw, 1rem)',
            paddingBottom: 'clamp(0.5rem, 1vw, 1rem)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 60px rgba(42, 42, 42, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            direction: 'ltr'
          }}
        >
          <a 
            href="#about" 
            className="text-sm sm:text-base lg:text-lg hover:opacity-80 transition-opacity whitespace-nowrap ml-4 sm:ml-6 lg:ml-8"
            style={{ 
              color: '#ffffff',
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('about');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            {t.nav.about}
          </a>
          <a 
            href="#services" 
            className="text-sm sm:text-base lg:text-lg hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ 
              color: '#ffffff',
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('services');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            {t.nav.services}
          </a>
          <a 
            href="#contact" 
            className="text-sm sm:text-base lg:text-lg hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ 
              color: '#ffffff',
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            {t.nav.contact}
          </a>
          <button
            onClick={toggleLanguage}
            className="text-white hover:text-white/80 transition-all p-2 rounded-md hover:bg-white/20 flex items-center justify-center ml-2 sm:ml-4"
            aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            style={{ 
              minWidth: '40px', 
              minHeight: '32px', 
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif', 
              fontWeight: 500 
            }}
          >
            {language === 'en' ? (
              <span style={{ fontSize: '18px', direction: 'rtl' }}>ع</span>
            ) : (
              <span style={{ fontSize: '14px' }}>EN</span>
            )}
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 lg:pt-40 lg:pb-24 relative z-20">
        {/* Headline at the top */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 sm:mb-8 lg:mb-12"
          style={{ 
            color: '#ffffff',
            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginTop: 'clamp(40px, 6vw, 80px)',
            direction: isRTL ? 'rtl' : 'ltr'
          }}
        >
          {t.hero.headline}<br />
          {t.hero.subheadline}
        </motion.h1>

        {/* Paragraph on the left */}
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-white drop-shadow-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.6,
              direction: isRTL ? 'rtl' : 'ltr'
            }}
          >
            {t.hero.description}
          </motion.p>
        </div>

        {/* CTA Button */}
        <div className="relative z-20" style={{ marginTop: 'clamp(24px, 3vw, 48px)' }}>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: [0, -8, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.4 },
              y: { 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }
            }}
            whileHover={{ 
              y: -12,
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="bg-[#0e7888] rounded-none px-20 py-10 sm:px-24 sm:py-12 lg:px-32 lg:py-16 text-white hover:opacity-90 transition-all duration-300 inline-block text-center w-full sm:w-auto"
            style={{
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.4,
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 2px 10px rgba(14, 120, 136, 0.3)',
              padding: 'clamp(0.375rem, 0.75vw, 0.75rem) clamp(0.75rem, 1.5vw, 1.5rem)',
              direction: isRTL ? 'rtl' : 'ltr'
            }}
          >
            <div className="leading-tight">{t.hero.ctaButton}</div>
            <div className="leading-tight mt-1" style={{ fontSize: '0.85em', fontWeight: 700 }}>{t.hero.ctaButtonSubtext}</div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
