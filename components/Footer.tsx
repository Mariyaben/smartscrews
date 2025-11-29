'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Mail, Linkedin, Twitter, Globe, 
  MessageSquare, Star, Heart, Shield, Zap, Settings, Hammer, Wrench, Palette
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubscribing(true);
    
    // Simulate subscription
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribing(false);
    setIsSubscribed(true);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const footerLinks = {
    services: [
      { name: t.services.construction, href: "/#services", icon: Hammer, delay: 0.1 },
      { name: t.services.maintenance, href: "/#services", icon: Wrench, delay: 0.2 },
      { name: t.services.decorative, href: "/#services", icon: Palette, delay: 0.3 },
      { name: t.footer.allServices, href: "/#services", icon: Settings, delay: 0.4 }
    ],
    company: [
      { name: t.footer.aboutUs, href: "/#about", icon: Star, delay: 0.5 },
      { name: t.nav.contact, href: "/#contact", icon: MessageSquare, delay: 0.6 },
      { name: t.nav.services, href: "/#services", icon: Globe, delay: 0.7 }
    ],
  };

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "#0077B5", delay: 0.1 },
    { icon: Twitter, href: "#", label: "Twitter", color: "#1DA1F2", delay: 0.2 },
    { icon: Mail, href: "mailto:info@smartscrews.com", label: "Email", color: "#0e7888", delay: 0.3 }
  ];

  return (
    <footer 
      ref={containerRef}
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(14, 120, 136, 0.3)',
        background: '#213f51',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
      <motion.div
        style={{ 
          y, 
          opacity,
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '800px',
          height: '800px',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 120, 136, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 1
        }}
      />

      {/* Floating elements */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{
          position: 'absolute',
          top: '100px',
          right: '100px',
          width: '80px',
          height: '80px',
          border: '2px solid rgba(14, 120, 136, 0.08)',
          borderRadius: '50%',
          zIndex: 1
        }}
      />

      <motion.div
        animate={{ 
          rotate: [360, 0],
          y: [-10, 10, -10]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '80px',
          width: '60px',
          height: '60px',
          border: '2px solid rgba(14, 120, 136, 0.06)',
          transform: 'rotate(45deg)',
          zIndex: 1
        }}
      />

      {/* Main Footer Content */}
      <div style={{
        position: 'relative',
        padding: isMobile ? '60px 16px' : '80px 24px',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: isMobile ? '32px' : '48px',
            paddingLeft: isMobile ? '40px' : '0'
          }}>
          {/* Company Info */}
            <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 style={{
                  fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.5rem)' : 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 300,
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                  marginBottom: '24px',
                  color: '#faf9f6',
                  letterSpacing: '-0.02em'
                }}>
                  Smartscrews
                </h3>
                <p style={{
                  color: 'rgba(250, 249, 246, 0.8)',
                  marginBottom: '32px',
                  lineHeight: 1.6,
                  fontSize: isMobile ? '14px' : '16px',
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                  fontWeight: 300,
                  direction: isRTL ? 'rtl' : 'ltr'
                }}>
                  {t.footer.brandDescription}
                </p>
                <div style={{
                  display: 'flex',
                  gap: '16px'
                }}>
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: social.delay }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -8 }}
                      style={{
                        width: isMobile ? '40px' : '48px',
                        height: isMobile ? '40px' : '48px',
                        background: 'rgba(14, 120, 136, 0.1)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0e7888',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        border: '1px solid rgba(14, 120, 136, 0.2)'
                      }}
                      aria-label={social.label}
                    >
                      <social.icon style={{ width: isMobile ? '18px' : '20px', height: isMobile ? '18px' : '20px' }} />
                    </motion.a>
                  ))}
            </div>
              </motion.div>
          </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                style={{
                  paddingLeft: isMobile ? '32px' : '0'
                }}
              >
                <h4 style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: 400,
                  color: '#faf9f6',
                  marginBottom: '24px',
                  textTransform: 'capitalize',
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                  direction: isRTL ? 'rtl' : 'ltr'
                }}>
                  {category === 'company' ? t.footer.company : t.footer.services}
                </h4>
                <ul style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                    href={link.href}
                        onClick={(e) => handleFooterLinkClick(e, link.href)}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: link.delay }}
                        viewport={{ once: true }}
                        whileHover={{ x: 8 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          color: 'rgba(250, 249, 246, 0.8)',
                          textDecoration: 'none',
                          fontSize: isMobile ? '13px' : '14px',
                          transition: 'all 0.3s ease',
                          padding: '8px 0',
                          fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                          fontWeight: 300
                        }}
                      >
                        <link.icon style={{ 
                          width: '16px', 
                          height: '16px',
                          opacity: 0.7,
                          color: '#0e7888'
                        }} />
                        {link.name}
                      </motion.a>
                </li>
              ))}
            </ul>
              </motion.div>
            ))}
          </div>
          </div>
        </div>

      {/* Newsletter Signup */}
      <div style={{
        borderTop: '1px solid rgba(14, 120, 136, 0.2)',
        padding: isMobile ? '32px 16px' : '48px 24px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 300,
              color: '#faf9f6',
              marginBottom: '16px',
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
              direction: isRTL ? 'rtl' : 'ltr'
            }}>
              {t.footer.stayUpdated}
            </h4>
            <p style={{
              color: 'rgba(250, 249, 246, 0.8)',
              marginBottom: '32px',
              fontSize: '16px',
              lineHeight: 1.6,
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300,
              direction: isRTL ? 'rtl' : 'ltr'
            }}>
              {t.footer.subscribe}
            </p>
            
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '24px',
                  background: 'rgba(14, 120, 136, 0.1)',
                  border: '1px solid rgba(14, 120, 136, 0.3)',
                  borderRadius: '16px',
                  color: '#0e7888',
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                  fontWeight: 400
                }}
              >
                <Star style={{ 
                  width: '24px', 
                  height: '24px', 
                  margin: '0 auto 12px',
                  display: 'block'
                }} />
                <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                  {t.footer.subscribed}
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}>
              <input
                type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.footer.subscribePlaceholder}
                    required
                    suppressHydrationWarning
                    style={{
                      flex: '1',
                      minWidth: '250px',
                      padding: '16px',
                      background: 'rgba(250, 249, 246, 0.1)',
                      border: '1px solid rgba(14, 120, 136, 0.3)',
                      borderRadius: '12px',
                      color: '#faf9f6',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif'
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 15px 35px rgba(14, 120, 136, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                type="submit"
                    disabled={isSubscribing}
                    suppressHydrationWarning
                    style={{
                      padding: '16px 32px',
                      background: 'linear-gradient(to right, #0e7888, #2f5a65)',
                      color: '#faf9f6',
                      fontWeight: 400,
                      fontSize: '16px',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: isSubscribing ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                      opacity: isSubscribing ? 0.7 : 1,
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif'
                    }}
                  >
                    {isSubscribing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          style={{ display: 'inline-block', marginRight: '8px' }}
                        >
                          <Star style={{ width: '16px', height: '16px' }} />
                        </motion.div>
                        {t.footer.subscribing}
                      </>
                    ) : (
                      t.footer.subscribeButton
                    )}
                  </motion.button>
                </div>
            </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={{
        borderTop: '1px solid rgba(14, 120, 136, 0.2)',
        padding: '32px 24px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              color: 'rgba(250, 249, 246, 0.6)',
              fontSize: '14px',
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
              {t.footer.copyright}
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(250, 249, 246, 0.5)', direction: isRTL ? 'rtl' : 'ltr' }}>
              {t.footer.tagline}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(250, 249, 246, 0.4)', marginTop: '4px', direction: isRTL ? 'rtl' : 'ltr' }}>
              {t.footer.license}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(250, 249, 246, 0.35)', marginTop: '8px', fontStyle: 'italic', direction: isRTL ? 'rtl' : 'ltr' }}>
              {t.footer.imageDisclaimer}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              fontSize: '14px',
              color: 'rgba(250, 249, 246, 0.6)',
              flexWrap: 'wrap',
              justifyContent: 'center',
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300
            }}
          >
            <a href="#" style={{
              color: 'rgba(250, 249, 246, 0.6)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              direction: isRTL ? 'rtl' : 'ltr'
            }} onMouseEnter={(e) => e.currentTarget.style.color = '#0e7888'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(250, 249, 246, 0.6)'}>
              {t.footer.privacy}
            </a>
            <a href="#" style={{
              color: 'rgba(250, 249, 246, 0.6)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              direction: isRTL ? 'rtl' : 'ltr'
            }} onMouseEnter={(e) => e.currentTarget.style.color = '#0e7888'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(250, 249, 246, 0.6)'}>
              {t.footer.terms}
            </a>
            <a href="#" style={{
              color: 'rgba(250, 249, 246, 0.6)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              direction: isRTL ? 'rtl' : 'ltr'
            }} onMouseEnter={(e) => e.currentTarget.style.color = '#0e7888'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(250, 249, 246, 0.6)'}>
              {t.footer.cookies}
            </a>
          </motion.div>
        </div>
      </div>

    </footer>
  );
}
