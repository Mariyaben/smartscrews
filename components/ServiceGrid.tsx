'use client';

import { useState } from 'react';
import { Grid3x3, Hammer, Wrench, Palette, ChevronDown } from 'lucide-react';
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
    <section id="services" className="bg-[#faf9f6] w-full">
      {/* Title Section - Full Width */}
      <div className="relative w-full py-24 lg:py-32 mb-20 lg:mb-32" style={{ textAlign: 'center' }}>
        {/* Grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(33, 63, 81, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(33, 63, 81, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        <div className="relative z-10 w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl text-[#213f51] mb-6"
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
            className="text-lg text-[rgba(33,63,81,0.75)] max-w-3xl leading-relaxed"
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 pb-32 lg:pb-48">
          {serviceCategories.map((category) => {
            const isSelected = selectedCategory === category;
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Grid3x3;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-[#0e7888] focus:ring-offset-2
                  ${isSelected 
                    ? 'bg-[#213f51] text-white shadow-md border border-[#213f51]/20' 
                    : 'bg-white text-[rgba(33,63,81,0.7)] hover:text-[#213f51] hover:bg-[#213f51]/5 border border-gray-200'
                  }
                `}
                style={{
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                  fontWeight: 400,
                }}
                aria-pressed={isSelected}
              >
                <IconComponent 
                  className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[#0e7888]'}`} 
                  strokeWidth={2}
                />
                <span>{category}</span>
                <ChevronDown 
                  className={`w-4 h-4 ${isSelected ? 'text-white/80' : 'text-[rgba(33,63,81,0.5)]'}`} 
                  strokeWidth={2}
                />
              </button>
            );
          })}
        </div>

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

