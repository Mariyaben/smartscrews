'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';

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
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
                maxHeight: '90vh',
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
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#2f5a65]/50 hover:bg-[#2f5a65] text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div style={{ padding: '2rem 3rem' }}>
                <h2
                  className="text-3xl font-light mb-6 text-[#faf9f6] text-center"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Get In Touch
                </h2>

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
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
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
                            padding: '16px 20px',
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
                            padding: '16px 20px',
                          }}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-[#d9534f]">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
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
                            padding: '16px 20px',
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
                            padding: '16px 20px',
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
                        rows={4}
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
                          padding: '16px 20px',
                        }}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-[#d9534f]">{errors.message}</p>
                      )}
                    </div>

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

