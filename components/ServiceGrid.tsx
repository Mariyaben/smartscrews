'use client';

import { useState } from 'react';
import { Grid3x3, Hammer, Wrench, Palette, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import ServiceSection from './ServiceSection';
import { services, serviceCategories } from '@/lib/data';

const categoryIcons = {
  'All': Grid3x3,
  'Construction': Hammer,
  'Maintenance': Wrench,
  'Decorative': Palette,
};

export default function ServiceGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(service => service.serviceCategory === selectedCategory);

  return (
    <section id="services" className="relative w-full overflow-hidden">
      {/* Full Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/about_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Overlay for better text readability */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(42, 42, 42, 0.3) 0%, rgba(42, 42, 42, 0.2) 50%, rgba(42, 42, 42, 0.4) 100%)'
        }}
      />

      {/* Spacing above title */}
      <div className="relative h-24 lg:h-32 z-20"></div>

      {/* Title Section - Full Width */}
      <div className="relative w-full pt-24 lg:pt-32 pb-24 lg:py-32 mb-20 lg:mb-32 z-20" style={{ textAlign: 'center' }}>
        
        <div className="relative z-20 w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6 drop-shadow-lg"
            style={{
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              textAlign: 'center',
              width: '100%',
            }}
          >
            Our Services
          </h2>
          <p 
            className="text-lg text-white/90 max-w-3xl leading-relaxed drop-shadow-md"
            style={{
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300,
              lineHeight: 1.8,
              textAlign: 'center',
            }}
          >
            We craft world-class building and maintenance solutions that elevate your property and drive lasting results. From strategy to execution, we bring your vision to life with expertise and precision.
          </p>
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 z-20">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4 pb-8 lg:pb-12">
          {serviceCategories.map((category) => {
            const isSelected = selectedCategory === category;
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Grid3x3;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  group relative flex items-center gap-2.5 lg:gap-3 pl-10 lg:pl-12 pr-6 lg:pr-8 py-7 lg:py-8 
                  rounded-xl font-medium transition-all duration-300 ease-out
                  focus:outline-none focus:ring-2 focus:ring-[#0e7888] focus:ring-offset-2 focus:ring-offset-transparent
                  transform hover:scale-105 active:scale-100
                  ${isSelected 
                    ? 'bg-[#0e7888] text-white/90 shadow-lg shadow-[#0e7888]/30 border-2 border-[#0e7888]' 
                    : 'bg-white/95 backdrop-blur-md text-[#213f51]/70 hover:bg-white hover:text-[#0e7888]/80 border-2 border-white/40 hover:border-white/60 shadow-md hover:shadow-lg'
                  }
                `}
                style={{
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                }}
                aria-pressed={isSelected}
              >
                <div className="w-2 lg:w-3"></div>
                <IconComponent 
                  className={`w-5 h-5 lg:w-5 lg:h-5 transition-all duration-300 ${
                    isSelected 
                      ? 'text-white/85' 
                      : 'text-[#0e7888]/70 group-hover:text-[#0e7888]/90 group-hover:scale-110'
                  }`} 
                  strokeWidth={isSelected ? 2.5 : 2}
                />
                <span className="text-sm lg:text-base">{category}</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-all duration-300 ${
                    isSelected 
                      ? 'text-white/80 rotate-180' 
                      : 'text-[#213f51]/40 group-hover:text-[#0e7888]/80 group-hover:rotate-180'
                  }`} 
                  strokeWidth={2}
                />
                {isSelected && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Spacing below filters */}
        <div className="relative h-24 lg:h-32 z-20"></div>

        {/* Services Sections - Alternating Image + Card Layout */}
        {filteredServices.map((service, index) => (
          <div key={service.id} className={index > 0 ? "mt-24 lg:mt-32" : ""}>
            <ServiceSection service={service} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}

