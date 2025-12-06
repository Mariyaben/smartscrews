'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import type { Service } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedService } from '@/lib/serviceTranslations';
import ServiceImageCarousel from './ServiceImageCarousel';

interface ServiceSectionProps {
  service: Service;
  index: number;
}

export default function ServiceSection({ service, index }: ServiceSectionProps) {
  const { language, isRTL } = useLanguage();
  const translatedService = getTranslatedService(service, language);
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

  // Get detailed content for move-in-move-out service steps
  const getStepDetailedContent = (serviceId: string, stepIndex: number): string | null => {
    if (serviceId !== 'move-in-move-out') {
      return null;
    }

    const detailedContent: Record<number, { en: string; ar: string }> = {
      0: {
        en: 'Our trained inspectors conduct a room-by-room assessment covering:\n\n• Walls, flooring, ceilings\n• Electrical fixtures & appliances\n• Plumbing, bathrooms & kitchens\n• Doors, windows & locks\n• Pest, mold, and safety checks\n• Furniture & inventory (if applicable)',
        ar: 'يقوم مفتشونا المدربون بإجراء تقييم غرفة بغرفة يشمل:\n\n• الجدران والأرضيات والأسقف\n• التركيبات والأجهزة الكهربائية\n• السباكة والحمامات والمطابخ\n• الأبواب والنوافذ والأقفال\n• فحوصات الآفات والعفن والسلامة\n• الأثاث والمخزون (إن وجد)'
      },
      1: {
        en: 'You receive a well-structured, photo-supported report, including:\n\n• Condition summary\n• Issues found\n• Classification of damages (wear & tear vs. tenant-caused)\n• Repair recommendations\n• Cost estimates (if requested)',
        ar: 'ستتلقى تقريراً منسقاً يدعمه الصور، يتضمن:\n\n• ملخص الحالة\n• المشاكل الموجودة\n• تصنيف الأضرار (البلى الطبيعي مقابل الأضرار التي سببها المستأجر)\n• توصيات الإصلاح\n• تقديرات التكلفة (عند الطلب)'
      },
      2: {
        en: 'We provide or arrange all necessary repair work, such as:\n\n• Painting & patching\n• Cleaning & deep cleaning\n• Electrical & plumbing fixes\n• Furniture repair\n• Appliance servicing\n• Minor carpentry\n• Pest control (optional)',
        ar: 'نوفر أو نرتب جميع أعمال الإصلاح اللازمة، مثل:\n\n• الطلاء والترقيع\n• التنظيف والتنظيف العميق\n• إصلاحات الكهرباء والسباكة\n• إصلاح الأثاث\n• صيانة الأجهزة\n• أعمال النجارة البسيطة\n• مكافحة الآفات (اختياري)'
      },
      3: {
        en: 'After rectification, a final inspection ensures the property meets required standards and is ready for the next tenant or handover.',
        ar: 'بعد التصحيح، يضمن التفتيش النهائي أن العقار يلبي المعايير المطلوبة ويكون جاهزاً للمستأجر التالي أو التسليم.'
      }
    };

    const content = detailedContent[stepIndex];
    return content ? (language === 'en' ? content.en : content.ar) : null;
  };

  return (
    <div className="w-full pt-16 sm:pt-24 lg:pt-32 xl:pt-48 pb-16 sm:pb-16 lg:pb-24" style={{ marginBottom: 'clamp(3rem, 8vw, 4rem)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${imageOnLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 sm:gap-8 lg:gap-12 items-center`}>
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
                {service.imagePaths && service.imagePaths.length > 0 ? (
                  <ServiceImageCarousel
                    images={service.imagePaths}
                    alt={`Smart Screws - ${translatedService.title} - Residential and Commercial Maintenance Services`}
                  />
                ) : service.imagePath && !imageError ? (
                  <Image
                    src={service.imagePath}
                    alt={`Smart Screws - ${translatedService.title} - Residential and Commercial Maintenance Services`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    onError={() => setImageError(true)}
                    unoptimized={service.imagePath.startsWith('http') || service.imagePath.startsWith('/')}
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
                      <p className="text-lg font-medium">{translatedService.title}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 relative z-30">
            <motion.div
              className="w-full relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Background protection for text readability */}
              <div 
                className="absolute inset-0 rounded-xl -z-10 pointer-events-none"
                style={{
                  background: imageOnLeft 
                    ? 'linear-gradient(to left, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
                    : 'linear-gradient(to right, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                  backdropFilter: 'blur(1px)'
                }}
              />
              {/* Title */}
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-700 mb-4 sm:mb-5 drop-shadow-lg"
                style={{
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  direction: isRTL ? 'rtl' : 'ltr'
                }}
              >
                {translatedService.title}
              </h2>

              {/* Description */}
              <p 
                className={`text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed drop-shadow-md ${service.id === 'move-in-move-out' ? 'whitespace-pre-line' : ''}`}
                style={{
                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  direction: isRTL ? 'rtl' : 'ltr'
                }}
              >
                {service.id === 'move-in-move-out' && translatedService.longDescription 
                  ? translatedService.longDescription 
                  : translatedService.shortDescription}
              </p>

              {/* Expandable Service List */}
              {translatedService.processSteps && translatedService.processSteps.length > 0 && (
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {translatedService.processSteps.map((step, stepIndex) => {
                    const isExpanded = expandedItems.has(stepIndex);
                    return (
                      <div key={stepIndex} className="border-b border-white/20 last:border-b-0 pb-2 sm:pb-3 last:pb-0">
                        <button
                          onClick={() => toggleExpand(stepIndex)}
                          className="w-full flex items-center justify-between text-left group"
                          suppressHydrationWarning
                        >
                          <span 
                            className="text-base sm:text-lg text-gray-700 pr-4 sm:pr-6 drop-shadow-md"
                            style={{
                              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                              fontWeight: 300,
                              direction: isRTL ? 'rtl' : 'ltr'
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
                              className="w-5 h-5 text-gray-700 group-hover:text-gray-700 transition-colors" 
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
                              <div 
                                className="text-sm sm:text-base text-gray-700 mt-2 sm:mt-3 leading-relaxed pt-2 sm:pt-3 border-t border-white/10 drop-shadow-sm"
                                style={{
                                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                                  fontWeight: 300,
                                  lineHeight: 1.7,
                                  direction: isRTL ? 'rtl' : 'ltr'
                                }}
                              >
                                {(() => {
                                  const detailedContent = getStepDetailedContent(service.id, stepIndex);
                                  if (detailedContent) {
                                    return (
                                      <div className="whitespace-pre-line">
                                        {detailedContent.split('\n').map((line, idx) => (
                                          <p key={idx} className={line.startsWith('•') ? 'ml-4' : ''}>
                                            {line}
                                          </p>
                                        ))}
                                      </div>
                                    );
                                  }
                                  return (
                                    <p>
                                      {language === 'en' 
                                        ? `${step} is executed with precision and expertise. We ensure consistency across all touchpoints to create lasting results and build customer trust through quality execution and attention to detail.`
                                        : `يتم تنفيذ ${step} بدقة وخبرة. نضمن الاتساق عبر جميع نقاط الاتصال لإنشاء نتائج دائمة وبناء ثقة العملاء من خلال التنفيذ عالي الجودة والاهتمام بالتفاصيل.`
                                      }
                                    </p>
                                  );
                                })()}
                              </div>
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
    </div>
  );
}
