'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // Show FAB when scrolled past hero (when hero bottom is above 30% of viewport)
        setIsVisible(rect.bottom < window.innerHeight * 0.3);
      } else {
        // If no hero section, always show
        setIsVisible(true);
      }
    };

    // Initial check
    const timeoutId = setTimeout(() => handleScroll(), 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [mounted]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!mounted || !isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 group"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0, y: 20 }}
    >
      <motion.a
        href="#contact"
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg cursor-pointer transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #0e7888 0%, #2f5a65 100%)',
          boxShadow: '0 4px 20px rgba(14, 120, 136, 0.4), 0 0 40px rgba(14, 120, 136, 0.2)',
        }}
        aria-label="Contact Us"
      >
        <MessageCircle 
          className="w-7 h-7 text-white" 
          strokeWidth={2}
        />
      </motion.a>
      <span 
        className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#213f51] text-white text-sm font-medium px-4 py-2 rounded-lg whitespace-nowrap shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
        }}
      >
        Contact Us
        <span 
          className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#213f51]"
        />
      </span>
    </motion.div>
  );
}

export default FloatingActionButton;
