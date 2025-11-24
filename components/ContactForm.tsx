'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { services } from '@/lib/data';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  file?: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    file: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('service', formData.service);
      formDataToSend.append('message', formData.message);
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          file: null,
        });
        setErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#213f51] mb-2">
          Name <span className="text-[#d9534f]">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.name
              ? 'border-[#d9534f] focus:ring-[#d9534f]'
              : 'border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-[#0e7888]'
          } focus:outline-none focus:ring-2 transition-colors`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-[#d9534f]" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#213f51] mb-2">
          Email <span className="text-[#d9534f]">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.email
              ? 'border-[#d9534f] focus:ring-[#d9534f]'
              : 'border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-[#0e7888]'
          } focus:outline-none focus:ring-2 transition-colors`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-[#d9534f]" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#213f51] mb-2">
          Phone <span className="text-[#d9534f]">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.phone
              ? 'border-[#d9534f] focus:ring-[#d9534f]'
              : 'border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-[#0e7888]'
          } focus:outline-none focus:ring-2 transition-colors`}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-[#d9534f]" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Service Selection */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-[#213f51] mb-2">
          Service <span className="text-[#d9534f]">*</span>
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) => handleChange('service', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.service
              ? 'border-[#d9534f] focus:ring-[#d9534f]'
              : 'border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-[#0e7888]'
          } focus:outline-none focus:ring-2 transition-colors bg-white`}
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? 'service-error' : undefined}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="service-error" className="mt-1 text-sm text-[#d9534f]" role="alert">
            {errors.service}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#213f51] mb-2">
          Message <span className="text-[#d9534f]">*</span>
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={6}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.message
              ? 'border-[#d9534f] focus:ring-[#d9534f]'
              : 'border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-[#0e7888]'
          } focus:outline-none focus:ring-2 transition-colors resize-vertical`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-[#d9534f]" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* File Upload */}
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-[#213f51] mb-2">
          Attach File (Optional)
        </label>
        <input
          type="file"
          id="file"
          onChange={(e) => handleChange('file', e.target.files?.[0] || null)}
          className="w-full px-4 py-3 rounded-lg border border-[#2f5a65]/30 focus:border-[#0e7888] focus:ring-2 focus:ring-[#0e7888] focus:outline-none transition-colors"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
        <p className="mt-1 text-sm text-[rgba(33,63,81,0.7)]">
          Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
        </p>
      </div>

      {/* Submit Status */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#2f9d7a]/10 border border-[#2f9d7a] rounded-lg text-[#2f9d7a]"
          role="alert"
        >
          <p className="font-medium">Thank you! Your message has been sent successfully.</p>
          <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#d9534f]/10 border border-[#d9534f] rounded-lg text-[#d9534f]"
          role="alert"
        >
          <p className="font-medium">Something went wrong. Please try again later.</p>
        </motion.div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-[#0e7888] text-white rounded-lg font-medium hover:bg-[#2f5a65] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0e7888] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

