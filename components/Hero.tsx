'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
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
      <div className="absolute left-0 z-[100] ml-4 sm:ml-6 lg:ml-8 flex items-center" style={{ top: 'clamp(8px, 1vw, 16px)' }}>
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

      {/* Navigation Bar - Top Right Corner */}
      <nav className="absolute top-0 right-0 z-[60] mt-4 mr-4 sm:mr-6 lg:mr-8">
        <div 
          className="flex items-center gap-12 sm:gap-20 lg:gap-24"
          style={{ 
            backgroundColor: '#0e7888',
            color: '#ffffff',
            paddingLeft: 'clamp(4rem, 10vw, 8rem)',
            paddingRight: 'clamp(2rem, 6vw, 5rem)',
            paddingTop: 'clamp(0.5rem, 1vw, 1rem)',
            paddingBottom: 'clamp(0.5rem, 1vw, 1rem)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 60px rgba(42, 42, 42, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
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
            About
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
            Services
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
            Contact
          </a>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24 relative z-20">
        {/* Headline at the top */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-12"
          style={{ 
            color: '#ffffff',
            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginTop: 'clamp(40px, 6vw, 80px)'
          }}
        >
          Experience you trust,<br />
          Quality you deserve
        </motion.h1>

        {/* Paragraph on the left */}
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-white drop-shadow-lg"
            style={{
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            Excellence is the foundation upon which we build. Our construction company stands for unwavering quality and the creation of structures that embody strength and longevity.
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
            className="bg-[#0e7888] rounded-none px-20 py-10 sm:px-24 sm:py-12 lg:px-32 lg:py-16 text-white hover:opacity-90 transition-all duration-300 inline-block text-center"
            style={{
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.4,
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 2px 10px rgba(14, 120, 136, 0.3)',
              padding: 'clamp(0.375rem, 0.75vw, 0.75rem) clamp(0.75rem, 1.5vw, 1.5rem)'
            }}
          >
            <div className="leading-tight">Ready to Transform?</div>
            <div className="leading-tight mt-1" style={{ fontSize: '0.85em', fontWeight: 700 }}>Contact us now!</div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
