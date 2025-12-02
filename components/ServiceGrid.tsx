'use client';

import { useState, useEffect } from 'react';
import { Grid3x3, Hammer, Wrench, Palette, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import ServiceSection from './ServiceSection';
import { services, serviceCategories } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedServices } from '@/lib/serviceTranslations';

const categoryIcons = {
  'All': Grid3x3,
  'Construction': Hammer,
  'Maintenance': Wrench,
  'Decorative': Palette,
};

export default function ServiceGrid() {
  const { t, isRTL, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Preload background image immediately
  useEffect(() => {
    const img = new window.Image();
    img.src = '/about_bg.png';
  }, []);

  const allServices = getTranslatedServices(services, language);
  const filteredServices = selectedCategory === 'All'
    ? allServices
    : allServices.filter(service => service.serviceCategory === selectedCategory);

  return (
    <section id="services" className="relative w-full overflow-hidden">
      {/* Desktop Background Image */}
      <div 
        className="hidden md:block absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/about_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Mobile Background Image */}
      <div 
        className="md:hidden absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/mobile_bg.png)',
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
              direction: isRTL ? 'rtl' : 'ltr'
            }}
          >
            {t.services.title}
          </h2>
          <p 
            className="text-lg text-white/90 max-w-3xl leading-relaxed drop-shadow-md"
            style={{
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              fontWeight: 300,
              lineHeight: 1.8,
              textAlign: 'center',
              direction: isRTL ? 'rtl' : 'ltr'
            }}
          >
            {t.services.description}
          </p>
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-24 z-20">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 pb-6 sm:pb-8 lg:pb-12">
          {serviceCategories.map((category) => {
            const isSelected = selectedCategory === category;
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Grid3x3;
            const categoryLabel = category === 'All' ? t.services.all :
                                 category === 'Construction' ? t.services.construction :
                                 category === 'Maintenance' ? t.services.maintenance :
                                 t.services.decorative;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  group relative flex items-center gap-2 sm:gap-2.5 lg:gap-3 pl-6 sm:pl-8 lg:pl-12 pr-4 sm:pr-6 lg:pr-8 py-3 sm:py-4 lg:py-7 xl:py-8 
                  rounded-lg sm:rounded-xl font-medium transition-all duration-300 ease-out
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
                <div className="w-1.5 sm:w-2 lg:w-3"></div>
                <IconComponent 
                  className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 transition-all duration-300 ${
                    isSelected 
                      ? 'text-white/85' 
                      : 'text-[#0e7888]/70 group-hover:text-[#0e7888]/90 group-hover:scale-110'
                  }`} 
                  strokeWidth={isSelected ? 2.5 : 2}
                />
                <span className="text-xs sm:text-sm lg:text-base whitespace-nowrap">{categoryLabel}</span>
                <ChevronDown 
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 ${
                    isSelected 
                      ? 'text-white/80 rotate-180' 
                      : 'text-[#213f51]/40 group-hover:text-[#0e7888]/80 group-hover:rotate-180'
                  }`} 
                  strokeWidth={2}
                />
                {isSelected && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Spacing below filters */}
        <div className="relative h-24 lg:h-32 z-20"></div>

        {/* Services Sections - Alternating Image + Card Layout */}
        {filteredServices.map((service, index) => (
          <div key={service.id} style={{ marginTop: index > 0 ? 'clamp(3rem, 8vw, 4rem)' : '0' }}>
            <ServiceSection service={service} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}

