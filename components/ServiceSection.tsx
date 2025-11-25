'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import type { Service } from '@/lib/data';

interface ServiceSectionProps {
  service: Service;
  index: number;
}

export default function ServiceSection({ service, index }: ServiceSectionProps) {
  const [imageError, setImageError] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  
  // Alternate image position: even indices have image on left, odd on right
  const imageOnLeft = index % 2 === 0;

  const toggleExpand = (itemIndex: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemIndex)) {
        newSet.delete(itemIndex);
      } else {
        newSet.add(itemIndex);
      }
      return newSet;
    });
  };

  return (
    <section className="w-full bg-[#faf9f6] pt-32 lg:pt-48 pb-16 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${imageOnLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/3] lg:aspect-square relative">
                {service.imagePath && !imageError ? (
                  <Image
                    src={service.imagePath}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    onError={() => setImageError(true)}
                    unoptimized={service.imagePath.startsWith('http')}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2f5a65] to-[#0e7888] flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <svg 
                        className="w-24 h-24 mx-auto mb-4 opacity-50" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                      </svg>
                      <p className="text-lg font-medium">{service.title}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Title */}
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#213f51] mb-5"
                style={{
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {service.title}
              </h2>

              {/* Description */}
              <p 
                className="text-lg text-[rgba(33,63,81,0.75)] mb-8 leading-relaxed"
                style={{
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                {service.shortDescription}
              </p>

              {/* Expandable Service List */}
              {service.processSteps && service.processSteps.length > 0 && (
                <div className="space-y-3 mb-8">
                  {service.processSteps.map((step, stepIndex) => {
                    const isExpanded = expandedItems.has(stepIndex);
                    return (
                      <div key={stepIndex} className="border-b border-[#213f51]/10 last:border-b-0 pb-3 last:pb-0">
                        <button
                          onClick={() => toggleExpand(stepIndex)}
                          className="w-full flex items-center justify-between text-left group"
                        >
                          <span 
                            className="text-lg text-[#213f51] pr-6"
                            style={{
                              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                              fontWeight: 300,
                            }}
                          >
                            {step}
                          </span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown 
                              className="w-5 h-5 text-[#213f51]/70 group-hover:text-[#213f51] transition-colors" 
                              strokeWidth={2}
                            />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p 
                                className="text-base text-[rgba(33,63,81,0.7)] mt-3 leading-relaxed pt-3 border-t border-[#213f51]/5"
                                style={{
                                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                                  fontWeight: 300,
                                  lineHeight: 1.7,
                                }}
                              >
                                {step} is executed with precision and expertise. We ensure consistency across all touchpoints to create lasting results and build customer trust through quality execution and attention to detail.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
