'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Mail, Linkedin, Twitter, Github, Phone, MapPin, Clock, Send, 
  MessageSquare, Globe, Zap, Star, CheckCircle
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactSection() {
  const { t, isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            projectType: '',
            message: ''
          });
        }, 3000);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to send message. Please try again.' }));
        setSubmitError(errorData.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t.contact.contactInfo.email,
      value: "hello@smartscrews.ae",
      link: "mailto:info@smartscrews.com",
      description: t.contact.contactInfo.emailDesc,
      delay: 0.1
    },
    {
      icon: Phone,
      title: t.contact.contactInfo.phone,
      value: "+971 52 980 4784",
      link: "tel:+971529804784",
      description: t.contact.contactInfo.phoneDesc,
      delay: 0.2
    },
    {
      icon: MapPin,
      title: t.contact.contactInfo.location,
      value: "DUBAI INDUSTRIAL CITY (G 27)",
      link: "#",
      delay: 0.3
    },
    {
      icon: Clock,
      title: t.contact.contactInfo.support,
      value: "24/7 Available",
      link: "#",
      description: t.contact.contactInfo.supportDesc,
      delay: 0.4
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "#0077B5", delay: 0.5 },
    { icon: Twitter, href: "#", label: "Twitter", color: "#1DA1F2", delay: 0.6 },
    { icon: Github, href: "#", label: "GitHub", color: "#333", delay: 0.7 },
    { icon: Globe, href: "#", label: "Website", color: "#D8CFBC", delay: 0.8 }
  ];

  const projectTypes = [
    { value: "construction", label: t.contact.projectTypes.construction, icon: Zap },
    { value: "maintenance", label: t.contact.projectTypes.maintenance, icon: MessageSquare },
    { value: "decorative", label: t.contact.projectTypes.decorative, icon: Globe },
    { value: "consulting", label: t.contact.projectTypes.consulting, icon: Star },
    { value: "other", label: t.contact.projectTypes.other, icon: Star }
  ];

  return (
    <section 
      id="contact"
      ref={containerRef}
      style={{
        position: 'relative',
        padding: isMobile ? '80px 16px' : '120px 24px',
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
          width: '1000px',
          height: '1000px',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 120, 136, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
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
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{
          position: 'absolute',
          top: '100px',
          right: '150px',
          width: '100px',
          height: '100px',
          border: '2px solid rgba(14, 120, 136, 0.12)',
          borderRadius: '50%',
          zIndex: 1
        }}
      />

      <motion.div
        animate={{ 
          rotate: [360, 0],
          y: [-15, 15, -15]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '120px',
          width: '80px',
          height: '80px',
          border: '2px solid rgba(14, 120, 136, 0.1)',
          transform: 'rotate(45deg)',
          zIndex: 1
        }}
      />

      <div style={{
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        zIndex: 10,
        padding: isMobile ? '0 8px' : '0'
      }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '60px' : '80px'
          }}
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl mb-6"
            style={{
              fontWeight: 300,
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: '#faf9f6',
              textAlign: 'center',
              width: '100%',
              direction: isRTL ? 'rtl' : 'ltr'
            }}
          >
            {t.contact.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            style={{
              fontSize: isMobile ? 'clamp(1rem, 4vw, 1.25rem)' : 'clamp(1.25rem, 2vw, 1.5rem)',
              color: 'rgba(250, 249, 246, 0.8)',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.8,
              fontWeight: 300,
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              direction: isRTL ? 'rtl' : 'ltr'
            }}
          >
            {t.contact.description}
          </motion.p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: isMobile ? '24px' : '48px',
          marginBottom: isMobile ? '40px' : '80px'
        }}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              padding: isMobile ? '32px 24px' : '48px',
              borderRadius: '24px',
              background: 'rgba(250, 249, 246, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(14, 120, 136, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Form background glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(14, 120, 136, 0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: -1
              }}
            />

            <h3 style={{
              fontSize: '28px',
              fontWeight: 300,
              marginBottom: '32px',
              color: '#faf9f6',
              textAlign: 'center',
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
              direction: isRTL ? 'rtl' : 'ltr'
            }}>
              {t.contact.getInTouch}
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '40px'
                }}
              >
                <CheckCircle style={{
                  width: '64px',
                  height: '64px',
                  color: '#0e7888',
                  margin: '0 auto 24px'
                }} />
                <h4 style={{
                  fontSize: '24px',
                  fontWeight: 300,
                  color: '#faf9f6',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                  direction: isRTL ? 'rtl' : 'ltr'
                }}>
                  {t.contact.messageSent}
                </h4>
                <p style={{
                  color: 'rgba(250, 249, 246, 0.8)',
                  fontSize: '16px',
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                  fontWeight: 300,
                  direction: isRTL ? 'rtl' : 'ltr'
                }}>
                  {t.contact.messageSentDesc}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 10 }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: isMobile ? '16px' : '24px',
                  marginBottom: isMobile ? '16px' : '24px'
                }}>
                  <div>
                    <label                     style={{
                      display: 'block',
                      fontSize: isMobile ? '13px' : '14px',
                      fontWeight: 400,
                      color: 'rgba(250, 249, 246, 0.9)',
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      marginBottom: '8px',
                      direction: isRTL ? 'rtl' : 'ltr'
                    }}>
                      {t.contact.firstName}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      suppressHydrationWarning
                      style={{
                        width: '100%',
                        padding: isMobile ? '12px' : '16px',
                        background: 'rgba(250, 249, 246, 0.1)',
                        border: '1px solid rgba(14, 120, 136, 0.3)',
                        borderRadius: isMobile ? '8px' : '12px',
                        color: '#faf9f6',
                        fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                        fontSize: isMobile ? '14px' : '16px',
                        transition: 'all 0.3s ease'
                      }}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'rgba(250, 249, 246, 0.9)',
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      marginBottom: '8px',
                      direction: isRTL ? 'rtl' : 'ltr'
                    }}>
                      {t.contact.lastName}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      suppressHydrationWarning
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: 'rgba(250, 249, 246, 0.1)',
                        border: '1px solid rgba(14, 120, 136, 0.3)',
                        borderRadius: '12px',
                        color: '#faf9f6',
                        fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '24px',
                  marginBottom: '24px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'rgba(250, 249, 246, 0.9)',
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      marginBottom: '8px',
                      direction: isRTL ? 'rtl' : 'ltr'
                    }}>
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      suppressHydrationWarning
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: 'rgba(250, 249, 246, 0.1)',
                        border: '1px solid rgba(14, 120, 136, 0.3)',
                        borderRadius: '12px',
                        color: '#faf9f6',
                        fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'rgba(250, 249, 246, 0.9)',
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      marginBottom: '8px',
                      direction: isRTL ? 'rtl' : 'ltr'
                    }}>
                      {t.contact.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      suppressHydrationWarning
                      style={{
                        width: '100%',
                        padding: isMobile ? '12px' : '16px',
                        background: 'rgba(250, 249, 246, 0.1)',
                        border: '1px solid rgba(14, 120, 136, 0.3)',
                        borderRadius: isMobile ? '8px' : '12px',
                        color: '#faf9f6',
                        fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                        fontSize: isMobile ? '14px' : '16px',
                        transition: 'all 0.3s ease'
                      }}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: isMobile ? '16px' : '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '500',
                    color: '#D8CFBC',
                    marginBottom: '8px',
                    direction: isRTL ? 'rtl' : 'ltr'
                  }}>
                    {t.contact.company}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    suppressHydrationWarning
                    style={{
                      width: '100%',
                      padding: isMobile ? '12px' : '16px',
                      background: 'rgba(17, 18, 13, 0.5)',
                      border: '1px solid rgba(86, 84, 73, 0.3)',
                      borderRadius: isMobile ? '8px' : '12px',
                      color: '#FFFBF4',
                      fontSize: isMobile ? '14px' : '16px',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="Your Company Name"
                  />
                </div>

                <div style={{ marginBottom: isMobile ? '16px' : '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '500',
                    color: '#D8CFBC',
                    marginBottom: '8px',
                    direction: isRTL ? 'rtl' : 'ltr'
                  }}>
                    {t.contact.projectType}
                  </label>
                  <select
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleInputChange}
                    suppressHydrationWarning
                    style={{
                      width: '100%',
                      padding: isMobile ? '12px' : '16px',
                      background: 'rgba(17, 18, 13, 0.5)',
                      border: '1px solid rgba(86, 84, 73, 0.3)',
                      borderRadius: isMobile ? '8px' : '12px',
                      color: '#FFFBF4',
                      fontSize: isMobile ? '14px' : '16px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <option value="">{t.contact.selectProjectType}</option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: isMobile ? '20px' : '32px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '500',
                    color: '#D8CFBC',
                    marginBottom: '8px',
                    direction: isRTL ? 'rtl' : 'ltr'
                  }}>
                    {t.contact.message}
                  </label>
                  <textarea
                    name="message"
                    rows={isMobile ? 3 : 4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: isMobile ? '12px' : '16px',
                      background: 'rgba(17, 18, 13, 0.5)',
                      border: '1px solid rgba(86, 84, 73, 0.3)',
                      borderRadius: isMobile ? '8px' : '12px',
                      color: '#FFFBF4',
                      fontSize: isMobile ? '14px' : '16px',
                      transition: 'all 0.3s ease',
                      resize: 'none',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '16px',
                      background: 'rgba(217, 83, 79, 0.1)',
                      border: '1px solid rgba(217, 83, 79, 0.5)',
                      borderRadius: '8px',
                      color: '#d9534f',
                      fontSize: isMobile ? '14px' : '16px',
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    }}
                    role="alert"
                  >
                    {submitError}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 15px 35px rgba(14, 120, 136, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  suppressHydrationWarning
                  style={{
                    width: '100%',
                    padding: isMobile ? '16px' : '20px',
                      background: 'linear-gradient(to right, #0e7888, #2f5a65)',
                      color: '#faf9f6',
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 400,
                    fontSize: isMobile ? '16px' : '18px',
                    borderRadius: isMobile ? '8px' : '12px',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send style={{ width: '20px', height: '20px' }} />
                      </motion.div>
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send style={{ width: '20px', height: '20px' }} />
                      {t.contact.sendMessage}
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px'
            }}
          >
            {/* Contact Details */}
            <div style={{
              padding: isMobile ? '20px 16px' : '32px',
              borderRadius: isMobile ? '16px' : '20px',
              background: 'rgba(250, 249, 246, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(14, 120, 136, 0.2)'
            }}>
              <h3 style={{
                fontSize: isMobile ? '18px' : '24px',
                fontWeight: 300,
                marginBottom: isMobile ? '16px' : '24px',
                color: '#faf9f6',
                fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                letterSpacing: '-0.02em',
                direction: isRTL ? 'rtl' : 'ltr'
              }}>
                {t.contact.contactInformation}
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: info.delay }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      padding: '16px',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      width: isMobile ? '40px' : '48px',
                      height: isMobile ? '40px' : '48px',
                      background: 'linear-gradient(135deg, #0e7888, #2f5a65)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}>
                      <info.icon style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', color: '#faf9f6' }} />
                    </div>
                    <div>
                      <h4 style={{
                        color: 'rgba(250, 249, 246, 0.9)',
                        fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                        fontWeight: 400,
                        marginBottom: '4px',
                        fontSize: isMobile ? '14px' : '16px'
                      }}>
                        {info.title}
                      </h4>
                      <p style={{
                        color: '#FFFBF4',
                        fontSize: isMobile ? '14px' : '16px',
                        marginBottom: '4px'
                      }}>
                        {info.value}
                      </p>
                      {info.description && (
                        <p style={{
                          color: 'rgba(250, 249, 246, 0.7)',
                          fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                          fontWeight: 300,
                          fontSize: isMobile ? '12px' : '14px'
                        }}>
                          {info.description}
                        </p>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div style={{
              padding: isMobile ? '20px 16px' : '32px',
              borderRadius: isMobile ? '16px' : '20px',
              background: 'rgba(250, 249, 246, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(14, 120, 136, 0.2)'
            }}>
              <h3 style={{
                fontSize: isMobile ? '18px' : '24px',
                fontWeight: 300,
                marginBottom: isMobile ? '12px' : '16px',
                color: '#faf9f6',
                fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                letterSpacing: '-0.02em',
                direction: isRTL ? 'rtl' : 'ltr'
              }}>
                {t.contact.connectWithUs}
              </h3>
              <p style={{
                color: 'rgba(250, 249, 246, 0.8)',
                marginBottom: '24px',
                lineHeight: 1.6,
                fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                fontWeight: 300,
                direction: isRTL ? 'rtl' : 'ltr'
              }}>
                {t.contact.connectDescription}
              </p>
              <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap'
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
                      width: '56px',
                      height: '56px',
                      background: 'rgba(14, 120, 136, 0.1)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0e7888',
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 400,
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(14, 120, 136, 0.2)'
                    }}
                    aria-label={social.label}
                  >
                    <social.icon style={{ width: '24px', height: '24px' }} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Response */}
            <div style={{
              padding: isMobile ? '20px 16px' : '32px',
              borderRadius: isMobile ? '16px' : '20px',
              background: 'linear-gradient(135deg, rgba(14, 120, 136, 0.1), rgba(47, 90, 101, 0.1))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(14, 120, 136, 0.2)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: 300,
                marginBottom: isMobile ? '12px' : '16px',
                color: '#faf9f6',
                fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                letterSpacing: '-0.02em',
                direction: isRTL ? 'rtl' : 'ltr'
              }}>
                {t.contact.quickResponse}
              </h3>
              <p style={{
                color: 'rgba(250, 249, 246, 0.8)',
                marginBottom: '20px',
                lineHeight: 1.6,
                fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                fontWeight: 300,
                direction: isRTL ? 'rtl' : 'ltr'
              }}>
                {t.contact.quickResponseDesc}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: 'rgba(250, 249, 246, 0.8)',
                fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                fontWeight: 300
              }}>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: '12px',
                    height: '12px',
                    background: '#0e7888',
                    borderRadius: '50%'
                  }}
                />
                <span style={{ fontSize: '14px' }}>{t.contact.onlineNow}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
