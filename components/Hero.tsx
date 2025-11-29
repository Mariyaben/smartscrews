'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContactModal from './ContactModal';

export default function Hero() {
  const { t, isRTL, language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Prevent body scrolling when mobile menu is open and close menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      // Check if we're on mobile (window width < 768px)
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

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
        {/* Desktop Background Image */}
        <Image
          src="/hero.png"
          alt="Smart Screws - Professional Building & Maintenance Services - Expert Carpentry, Plumbing, HVAC, Tiling, Painting, and Kitchen Renovation Services"
          fill
          className="object-cover hidden md:block"
          priority
        />
        {/* Mobile Background Image */}
        <Image
          src="/hero_mobile.png"
          alt="Smart Screws - Professional Building & Maintenance Services - Expert Carpentry, Plumbing, HVAC, Tiling, Painting, and Kitchen Renovation Services"
          fill
          className="object-cover md:hidden"
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
      <div className="flex flex-row absolute left-0 z-[100] ml-4 sm:ml-6 lg:ml-8 items-center" style={{ top: 'clamp(8px, 1vw, 16px)', direction: 'ltr', right: 'auto' }}>
        <Image
          src="/NEWNEWLOGO.svg"
          alt="Smart Screws Logo - Professional Building & Maintenance Services"
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
          alt="Smart Screws - Building & Maintenance Services Company"
          width={600}
          height={120}
          className="w-auto h-auto mobile-text-logo-spacing"
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
        className="md:hidden fixed top-0 right-0 z-[110] mt-4 mr-4 p-3 text-white hover:opacity-80 transition-opacity touch-manipulation flex items-center justify-center"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
        style={{
          backgroundColor: isMobileMenuOpen ? 'rgba(14, 120, 136, 0.5)' : 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
          transition: 'background-color 0.3s ease',
          minWidth: '44px',
          minHeight: '44px'
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
            strokeWidth="2.5"
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
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            
            {/* Menu Panel */}
            <motion.nav
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0e7888] shadow-2xl z-[105] overflow-y-auto"
              style={{ direction: 'ltr', WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex flex-col h-full">
                {/* Header with Close Button */}
                <div className="flex items-start justify-end p-6 pb-4">
                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-[#213f51] active:bg-[#2f5a65] transition-colors touch-manipulation"
                    aria-label="Close menu"
                    style={{ minWidth: '44px', minHeight: '44px' }}
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
                <div className="flex flex-col gap-2 px-6 py-6">
                  <motion.a
                    href="#about"
                    onClick={(e) => {
                      handleNavClick(e, '#about');
                      setIsMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white text-lg font-light py-4 px-4 rounded-lg active:bg-[#0e7888]/80 transition-all touch-manipulation"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      letterSpacing: '-0.02em',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#ffffff'
                    }}
                  >
                    {t.nav.about}
                  </motion.a>
                  <motion.a
                    href="#services"
                    onClick={(e) => {
                      handleNavClick(e, '#services');
                      setIsMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-white text-lg font-light py-4 px-4 rounded-lg active:bg-[#0e7888]/80 transition-all touch-manipulation"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      letterSpacing: '-0.02em',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#ffffff'
                    }}
                  >
                    {t.nav.services}
                  </motion.a>
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      handleNavClick(e, '#contact');
                      setIsMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-lg font-light py-4 px-4 rounded-lg active:bg-[#0e7888]/80 transition-all touch-manipulation"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      letterSpacing: '-0.02em',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#ffffff'
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
                    className="w-full flex items-center justify-center gap-2 px-4 py-4 text-white text-base font-medium rounded-lg active:bg-[#0e7888]/80 transition-all touch-manipulation"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 400,
                      backgroundColor: 'rgba(33, 63, 81, 0.3)',
                      minHeight: '44px',
                      color: '#ffffff'
                    }}
                    aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                  >
                    {language === 'en' ? (
                      <>
                        <span style={{ color: '#ffffff' }}>العربية</span>
                        <span style={{ fontSize: '18px', direction: 'rtl', color: '#ffffff' }}>ع</span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: '#ffffff' }}>English</span>
                        <span style={{ fontSize: '16px', color: '#ffffff' }}>EN</span>
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
          {/* Phone and WhatsApp Group */}
          <div className="flex items-center gap-3">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/971529804784"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:opacity-80 transition-opacity"
              style={{ 
                color: '#ffffff',
              }}
              aria-label="Contact us on WhatsApp"
            >
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            {/* Phone Number */}
            <a 
              href="tel:+971529804784"
              className="flex items-center gap-2 text-sm sm:text-base lg:text-lg hover:opacity-80 transition-opacity whitespace-nowrap"
              style={{ 
                color: '#ffffff',
                fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
              aria-label="Call us at +971 52 980 4784"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>+971 52 980 4784</span>
            </a>
          </div>
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
              setIsContactModalOpen(true);
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
            <div className="leading-tight">BOOK A FREE CONSULTATION</div>
          </motion.button>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </section>
  );
}
