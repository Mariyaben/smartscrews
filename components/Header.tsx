'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/#about', label: 'About' },
    { href: '/#services', label: 'Services' },
    { href: '/#services', label: 'Projects' },
  ];

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
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left corner */}
          <Link
            href="/#hero"
            onClick={(e) => handleNavClick(e, '/#hero')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/NEWNEWLOGO.svg"
              alt="Smartscrews Logo"
              width={120}
              height={61}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Right corner with Green background bar */}
          <div className="hidden md:flex items-center">
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
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
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
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200"
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
                  className="block text-[#213f51] hover:text-[#0e7888] transition-colors py-2"
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
                className="block px-4 py-2 text-sm font-normal text-[#213f51] border border-gray-300 rounded-lg hover:border-[#0e7888] hover:text-[#0e7888] transition-colors text-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

