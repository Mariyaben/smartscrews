'use client';

import { useState } from 'react';
import ServiceSection from './ServiceSection';
import { services, serviceCategories, type Service } from '@/lib/data';

export default function ServiceGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(service => service.serviceCategory === selectedCategory);

  return (
    <section className="py-16 lg:py-24 bg-[#fffffe]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#213f51] mb-4">
            Our Services
          </h2>
          <p className="text-lg text-[rgba(33,63,81,0.7)] max-w-2xl mx-auto">
            Comprehensive building and maintenance solutions tailored to your needs
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4">
          {serviceCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#0e7888] focus:ring-offset-2 ${
                selectedCategory === category
                  ? 'bg-[#0e7888] text-white'
                  : 'bg-white text-[#213f51] hover:bg-[#2f5a65] hover:text-white border border-[#2f5a65]'
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Services Sections - Alternating Image + Card Layout */}
      <div className="space-y-0">
        {filteredServices.map((service, index) => (
          <div key={service.id}>
            <ServiceSection service={service} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}

