'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { Service } from '@/lib/data';

interface ServiceSectionProps {
  service: Service;
  index: number;
}

export default function ServiceSection({ service, index }: ServiceSectionProps) {
  const [imageError, setImageError] = useState(false);
  
  // Alternate image position: even indices have image on right, odd on left
  const imageOnRight = index % 2 === 0;
  
  const categoryColors: Record<string, { accent: string; bg: string }> = {
    'Construction': { 
      accent: '#0e7888',
      bg: 'bg-[#2f5a65]/5'
    },
    'Maintenance': { 
      accent: '#0e7888',
      bg: 'bg-[#0e7888]/5'
    },
    'Decorative': { 
      accent: '#213f51',
      bg: 'bg-[#213f51]/5'
    },
  };

  const colors = categoryColors[service.serviceCategory] || categoryColors['Construction'];

  return (
    <section className="w-full bg-white">
      <div className="w-full">
        <div className={`flex flex-col ${imageOnRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[600px] lg:min-h-[700px]`}>
          {/* Image Section */}
          <div className="w-full lg:w-2/3 relative overflow-hidden">
            <motion.div
              className="w-full h-full min-h-[400px] lg:min-h-[700px] relative"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Placeholder or actual image */}
              {service.imagePath && !imageError ? (
                <Image
                  src={service.imagePath}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  onError={() => setImageError(true)}
                  unoptimized={service.imagePath.startsWith('http')}
                />
              ) : null}
              
              {/* Placeholder when image is missing or fails to load */}
              <div 
                className="image-placeholder absolute inset-0 bg-gradient-to-br from-[#2f5a65] to-[#0e7888] flex items-center justify-center"
                style={{ display: (service.imagePath && !imageError) ? 'none' : 'flex' }}
              >
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
            </motion.div>
          </div>

          {/* Card Section */}
          <div className={`w-full lg:w-1/3 flex items-center justify-center bg-white relative z-10 ${imageOnRight ? 'lg:ml-[-8%] lg:pl-12 lg:pr-8' : 'lg:mr-[-8%] lg:pr-12 lg:pl-8'} py-12 lg:py-16 px-6 lg:px-0`}>
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, x: imageOnRight ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Category Badge */}
              <div className="mb-5">
                <span 
                  className="inline-block px-4 py-1.5 text-xs font-semibold text-white rounded-full"
                  style={{ backgroundColor: colors.accent }}
                >
                  {service.serviceCategory}
                </span>
              </div>

              {/* Title with underline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#213f51] mb-5 leading-tight">
                {service.title.toUpperCase()}
                <div 
                  className="h-1 w-16 mt-3"
                  style={{ backgroundColor: colors.accent }}
                />
              </h2>

              {/* Description */}
              <p className="text-[rgba(33,63,81,0.8)] text-base leading-relaxed mb-7">
                {service.shortDescription}
              </p>

              {/* Process Steps Preview */}
              {service.processSteps && service.processSteps.length > 0 && (
                <ul className="space-y-2.5 mb-8">
                  {service.processSteps.slice(0, 3).map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start text-sm text-[rgba(33,63,81,0.7)] leading-relaxed">
                      <span 
                        className="mr-3 mt-1.5 flex-shrink-0 text-base"
                        style={{ color: colors.accent }}
                      >
                        ▸
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA Button */}
              <Link
                href={`/services/${service.id}`}
                className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ 
                  backgroundColor: colors.accent,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `2px solid ${colors.accent}`;
                  e.currentTarget.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = '';
                  e.currentTarget.style.outlineOffset = '';
                }}
              >
                Learn More
                <svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

