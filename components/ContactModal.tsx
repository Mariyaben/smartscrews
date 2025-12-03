'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Phone, Mail } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectTypes = [
  { value: 'construction', label: 'Construction' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'decorative', label: 'Decorative' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' },
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.projectType) {
      newErrors.projectType = 'Project type is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

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
            message: '',
          });
          setErrors({});
          onClose();
        }, 2000);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to send message. Please try again.' }));
        setErrors({ submit: errorData.error || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 99998,
            }}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              pointerEvents: 'none',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '42rem',
                maxHeight: '95vh',
                overflowY: 'auto',
                backgroundColor: 'rgba(33, 63, 81, 0.98)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(14, 120, 136, 0.3)',
                borderRadius: '1rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                pointerEvents: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              className="[&::-webkit-scrollbar]:hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#2f5a65]/50 hover:bg-[#2f5a65] text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div style={{ padding: isMobile ? '1.5rem 1.25rem' : '2rem 3rem' }}>
                <h2
                  className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-center"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                  }}
                >
                  Contact Us
                </h2>

                {/* Contact Information */}
                <div className="flex flex-col items-center gap-3 mb-6 sm:mb-8">
                  {/* Email */}
                  <a
                    href="mailto:hello@smartscrews.ae"
                    className="flex items-center gap-2 text-[#faf9f6]/90 hover:text-[#0e7888] transition-colors"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontSize: isMobile ? '14px' : '16px',
                    }}
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span><strong>Email:</strong> hello@smartscrews.ae</span>
                  </a>
                  
                  {/* Phone */}
                  <a
                    href="tel:+971529804784"
                    className="flex items-center gap-2 text-[#faf9f6]/90 hover:text-[#0e7888] transition-colors"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontSize: isMobile ? '14px' : '16px',
                    }}
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span><strong>Mobile:</strong> +971 52 980 4784</span>
                  </a>
                  
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/971529804784"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#faf9f6]/90 hover:text-[#0e7888] transition-colors"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontSize: isMobile ? '14px' : '16px',
                    }}
                  >
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span><strong>WhatsApp:</strong> +971 52 980 4784</span>
                  </a>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-[#0e7888] mx-auto mb-4" />
                    <h3
                      className="text-2xl font-light text-[#faf9f6] mb-2"
                      style={{
                        fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      }}
                    >
                      Message Sent Successfully!
                    </h3>
                    <p
                      className="text-[#faf9f6]/80"
                      style={{
                        fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      }}
                    >
                      We&apos;ll get back to you within 2-4 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '1.5rem' }}>
                    {/* First Name & Last Name */}
                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`} style={{ gap: isMobile ? '1rem' : '1.5rem' }}>
                      <div>
                        <label
                          className="block text-sm font-medium text-[#faf9f6]/90 mb-2"
                          style={{
                            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                          }}
                        >
                          First Name <span className="text-[#d9534f]">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border transition-colors ${
                            errors.firstName
                              ? 'border-[#d9534f] focus:ring-[#d9534f]'
                              : 'border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-[#0e7888]'
                          } bg-[#2f5a65]/20 text-[#faf9f6] focus:outline-none focus:ring-2`}
                          placeholder="John"
                          style={{
                            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                            padding: isMobile ? '12px 16px' : '16px 20px',
                            fontSize: isMobile ? '14px' : '16px',
                          }}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-[#d9534f]">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium text-[#faf9f6]/90 mb-2"
                          style={{
                            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                          }}
                        >
                          Last Name <span className="text-[#d9534f]">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border transition-colors ${
                            errors.lastName
                              ? 'border-[#d9534f] focus:ring-[#d9534f]'
                              : 'border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-[#0e7888]'
                          } bg-[#2f5a65]/20 text-[#faf9f6] focus:outline-none focus:ring-2`}
                          placeholder="Doe"
                          style={{
                            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                            padding: isMobile ? '12px 16px' : '16px 20px',
                            fontSize: isMobile ? '14px' : '16px',
                          }}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-[#d9534f]">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`} style={{ gap: isMobile ? '1rem' : '1.5rem' }}>
                      <div>
                        <label
                          className="block text-sm font-medium text-[#faf9f6]/90 mb-2"
                          style={{
                            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                          }}
                        >
                          Email <span className="text-[#d9534f]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border transition-colors ${
                            errors.email
                              ? 'border-[#d9534f] focus:ring-[#d9534f]'
                              : 'border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-[#0e7888]'
                          } bg-[#2f5a65]/20 text-[#faf9f6] focus:outline-none focus:ring-2`}
                          placeholder="john@company.com"
                          style={{
                            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                            padding: isMobile ? '12px 16px' : '16px 20px',
                            fontSize: isMobile ? '14px' : '16px',
                          }}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-[#d9534f]">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium text-[#faf9f6]/90 mb-2"
                          style={{
                            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                          }}
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-2 focus:ring-[#0e7888] bg-[#2f5a65]/20 text-[#faf9f6] focus:outline-none transition-colors"
                          placeholder="+1 (555) 123-4567"
                          style={{
                            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                            padding: isMobile ? '12px 16px' : '16px 20px',
                            fontSize: isMobile ? '14px' : '16px',
                          }}
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        className="block text-sm font-medium text-[#faf9f6]/90 mb-2"
                        style={{
                          fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                        }}
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-2 focus:ring-[#0e7888] bg-[#2f5a65]/20 text-[#faf9f6] focus:outline-none transition-colors"
                        placeholder="Your Company Name"
                        style={{
                          fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                          padding: '16px 20px',
                        }}
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label
                        className="block text-sm font-medium text-[#faf9f6]/90 mb-2"
                        style={{
                          fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                        }}
                      >
                        Project Type <span className="text-[#d9534f]">*</span>
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg border transition-colors ${
                          errors.projectType
                            ? 'border-[#d9534f] focus:ring-[#d9534f]'
                            : 'border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-[#0e7888]'
                        } bg-[#2f5a65]/20 text-[#faf9f6] focus:outline-none focus:ring-2`}
                        style={{
                          fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                          padding: '16px 20px',
                        }}
                      >
                        <option value="">Select a project type</option>
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p className="mt-1 text-sm text-[#d9534f]">{errors.projectType}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        className="block text-sm font-medium text-[#faf9f6]/90 mb-2"
                        style={{
                          fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                        }}
                      >
                        Message <span className="text-[#d9534f]">*</span>
                      </label>
                      <textarea
                        name="message"
                        rows={isMobile ? 3 : 4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg border transition-colors resize-none ${
                          errors.message
                            ? 'border-[#d9534f] focus:ring-[#d9534f]'
                            : 'border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-[#0e7888]'
                        } bg-[#2f5a65]/20 text-[#faf9f6] focus:outline-none focus:ring-2`}
                        placeholder="Tell us about your project, goals, and timeline..."
                        style={{
                          fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                          padding: isMobile ? '12px 16px' : '16px 20px',
                          fontSize: isMobile ? '14px' : '16px',
                        }}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-[#d9534f]">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-[#d9534f]/10 border border-[#d9534f] rounded-lg text-[#d9534f]"
                        role="alert"
                      >
                        <p className="text-sm font-medium">{errors.submit}</p>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 bg-gradient-to-r from-[#0e7888] to-[#2f5a65] text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{
                        fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                        paddingTop: '1.25rem',
                        paddingBottom: '1.25rem',
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Send className="w-5 h-5" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return mounted && typeof window !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}

