'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Axe, Award, Shield, Users } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutSection() {
  const { t, isRTL } = useLanguage()
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const lockRef = useRef(false)
  const [enableInternalScroll, setEnableInternalScroll] = useState(false)
  const aboutSectionRef = useRef<HTMLElement>(null)

  const sections = [
    { id: 'about', label: t.about.about },
    { id: 'story', label: t.about.ourStory },
    { id: 'values', label: t.about.ourValues },
    { id: 'approach', label: t.about.ourApproach },
    { id: 'why-choose', label: t.about.whyChooseUs },
  ]

  // Detect when About section is in view to enable internal scrolling (desktop only)
  useEffect(() => {
    if (!aboutSectionRef.current) return
    
    // Disable internal scrolling on mobile
    if (window.innerWidth < 1024) {
      setEnableInternalScroll(false)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Enable internal scrolling when section is fully visible (desktop only)
          if (entry.isIntersecting && entry.intersectionRatio >= 0.9 && window.innerWidth >= 1024) {
            setEnableInternalScroll(true)
          }
        })
      },
      {
        threshold: [0, 0.5, 0.9, 1.0],
        rootMargin: '0px'
      }
    )

    observer.observe(aboutSectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const el = document.querySelector('[data-right-section]') as HTMLElement
    if (!el) return

    // Only enable internal scroll features on desktop
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop) {
      // On mobile, ensure internal scroll is disabled
      setEnableInternalScroll(false)
    }

    const forceReveal = () => {
      // Only run on desktop
      if (!isDesktop || lockRef.current) return
      lockRef.current = true
      el.scrollTo({ top: 0, behavior: 'instant' })
      setTimeout(() => {
        el.scrollTo({ top: 1, behavior: 'smooth' })
      }, 50)
      setTimeout(() => {
        lockRef.current = false
      }, 400)
    }

    if (isDesktop) {
      forceReveal()
    }

    const handleScroll = () => {
      if (lockRef.current) return

      // Use window scroll when internal scrolling is not enabled, element scroll when it is
      const scrollTop = enableInternalScroll ? el.scrollTop : window.scrollY
      const viewportHeight = enableInternalScroll ? el.clientHeight : window.innerHeight
      const viewportMiddle = scrollTop + viewportHeight * 0.4 // 40% from top

      let activeIndex = 0
      let minDistance = Infinity

      sectionRefs.current.forEach((ref: HTMLElement | null, index: number) => {
        if (!ref) return
        
        const rect = ref.getBoundingClientRect()
        
        if (enableInternalScroll) {
          // When using internal scroll, calculate relative to container
          const containerRect = el.getBoundingClientRect()
          const sectionTop = scrollTop + (rect.top - containerRect.top)
          const sectionBottom = sectionTop + rect.height
          const sectionMiddle = sectionTop + (rect.height / 2)
          const isVisible = sectionBottom > scrollTop && sectionTop < scrollTop + viewportHeight
          
          if (isVisible) {
            const distance = Math.abs(viewportMiddle - sectionMiddle)
            if (distance < minDistance) {
              minDistance = distance
              activeIndex = index
            }
          }
        } else {
          // When using window scroll, use absolute positions
          const sectionTop = window.scrollY + rect.top
          const sectionBottom = sectionTop + rect.height
          const sectionMiddle = sectionTop + (rect.height / 2)
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0
          
          if (isVisible) {
            const distance = Math.abs((window.scrollY + window.innerHeight * 0.4) - sectionMiddle)
            if (distance < minDistance) {
              minDistance = distance
              activeIndex = index
            }
          }
        }
      })

      // If scrolled to top, always highlight first section
      if (scrollTop < 50) {
        activeIndex = 0
      }

      setActiveSection(activeIndex)
    }

    // Use Intersection Observer as backup method
    const observerOptions = {
      root: el,
      rootMargin: '-30% 0px -50% 0px', // Trigger when section is in middle-upper portion
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    }

    const observer = new IntersectionObserver((entries) => {
      if (lockRef.current) return

      // Use scroll handler instead - it's more reliable
      handleScroll()
    }, observerOptions)

    // Wait for refs to be set, then observe
    const timeoutId = setTimeout(() => {
      // Verify all refs are set
      const allRefsSet = sectionRefs.current.every(ref => ref !== null)
      
      if (allRefsSet) {
        sectionRefs.current.forEach((ref: HTMLElement | null) => {
          if (ref) observer.observe(ref)
        })
        // Initial check
        handleScroll()
      } else {
        // Retry if refs aren't ready
        setTimeout(() => {
          sectionRefs.current.forEach((ref: HTMLElement | null) => {
            if (ref) observer.observe(ref)
          })
          handleScroll()
        }, 300)
      }
    }, 500)

    // Use scroll handler - throttled for performance
    let scrollTimeout: NodeJS.Timeout | null = null
    const throttledScroll = () => {
      if (scrollTimeout) return
      scrollTimeout = setTimeout(() => {
        handleScroll()
        scrollTimeout = null
      }, 100) // Check every 100ms
    }
    
    // Listen to appropriate scroll event
    if (enableInternalScroll) {
      el.addEventListener('scroll', throttledScroll, { passive: true })
    } else {
      window.addEventListener('scroll', throttledScroll, { passive: true })
    }
    
    // Initial check after refs are set
    setTimeout(() => {
      handleScroll()
    }, 500)

    // Handle window resize to toggle internal scroll
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Desktop - enable internal scroll if section is in view
        if (aboutSectionRef.current) {
          const rect = aboutSectionRef.current.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            setEnableInternalScroll(true)
          }
        }
      } else {
        // Mobile - disable internal scroll
        setEnableInternalScroll(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeoutId)
      if (scrollTimeout) clearTimeout(scrollTimeout)
      if (enableInternalScroll) {
        el.removeEventListener('scroll', throttledScroll)
      } else {
        window.removeEventListener('scroll', throttledScroll)
      }
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [enableInternalScroll])

  const scrollToSection = (index: number) => {
    const el = document.querySelector('[data-right-section]')
    const ref = sectionRefs.current[index]
    if (!el || !ref) return

    // Temporarily lock scroll detection during programmatic scroll
    lockRef.current = true
    setActiveSection(index)
    
    const pos = (ref as HTMLElement).offsetTop
    el.scrollTo({ top: pos - 100, behavior: 'smooth' })
    
    // Unlock after scroll completes
    setTimeout(() => {
      lockRef.current = false
    }, 1000)
  }

  return (
    <section 
      ref={aboutSectionRef}
      id="about" 
      className="relative w-full min-h-screen"
    >
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
      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">

        {/* Left navigation section */}
      <div 
      className="
      hidden lg:flex
      lg:sticky lg:top-0 lg:h-screen
      w-full lg:w-1/3
      flex-col justify-start lg:justify-center
      bg-[#faf9f6]/20
      px-4 sm:px-6 lg:pr-12
      py-8 sm:py-12 lg:py-20
      z-10 relative self-start
      space-y-6 sm:space-y-8 lg:space-y-12
      "
      style={{ paddingLeft: 'clamp(1rem, 3vw, 3rem)' }}
      >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-40 h-40 border-2 border-[#0e7888] rounded-full" />
            <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-[#2f5a65] rotate-45" />
          </div>

          <div className="relative z-10">
            {sections.map((item, index) => (
              <div key={item.id}>
                <motion.button
                  onClick={() => scrollToSection(index)}
                  className="w-full text-left relative group transition-all duration-300"
                  whileHover={{ x: 8 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <motion.div
                    className={`absolute top-0 bottom-0 w-1 rounded-r-full ${
                      activeSection === index
                        ? 'bg-gradient-to-b from-[#0e7888] to-[#2f5a65]'
                        : 'bg-[#2f5a65]/20 group-hover:bg-[#2f5a65]/40'
                    }`}
                    style={{ left: '-3rem' }}
                    animate={{
                      height: activeSection === index ? '100%' : '60%',
                      opacity: activeSection === index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.25 }}
                  />

                  <div 
                    style={{ 
                      paddingTop: 'clamp(0.75rem, 2vw, 1.5rem)',
                      paddingBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
                      paddingLeft: 'clamp(0.5rem, 2vw, 1.5rem)'
                    }}
                  >
                    <span
                      className={`text-lg sm:text-xl md:text-2xl lg:text-3xl transition-colors duration-300 ${
                        activeSection === index
                          ? 'text-[#0e7888]'
                          : 'text-[#213f51]/60 group-hover:text-[#213f51]'
                      }`}
                      style={{
                        fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </motion.button>

                {index < sections.length - 1 && (
                  <div 
                    className="h-px bg-[#2f5a65]/10" 
                    style={{ 
                      marginTop: '0.75rem',
                      marginBottom: '0.75rem'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right content section */}
        <div
        data-right-section
        className="w-full lg:w-2/3 lg:ml-[33.333333%] bg-[#faf9f6]/20 relative scroll-smooth overflow-visible lg:overflow-y-auto"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          height: enableInternalScroll ? 'auto' : 'auto',
          maxHeight: enableInternalScroll ? 'none' : 'none'
        }}
        >
          <div 
            className="max-w-4xl mx-auto md:px-8 lg:px-16 py-0 mobile-about-padding"
            style={{
              paddingLeft: 'clamp(1.5rem, 6vw, 2rem)',
              paddingRight: 'clamp(1.5rem, 6vw, 2rem)'
            }}
          >

            {/* About */}
            <motion.div
              ref={el => { sectionRefs.current[0] = el }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[60vh] sm:min-h-screen flex items-center py-12 sm:py-20 lg:py-32"
            >
              <div className="w-full max-w-3xl">
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#213f51] mb-8 sm:mb-12 lg:mb-16"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    direction: isRTL ? 'rtl' : 'ltr'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  {t.about.aboutTitle}
                </motion.h2>

                <div className="space-y-4 sm:space-y-6">
                  <motion.p
                    className="text-base sm:text-lg text-[rgba(33,63,81,0.75)] leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.8,
                      direction: isRTL ? 'rtl' : 'ltr'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {t.about.aboutDescription1}
                  </motion.p>
                  <motion.p
                    className="text-lg text-[rgba(33,63,81,0.75)] leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.8,
                      direction: isRTL ? 'rtl' : 'ltr'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {t.about.aboutDescription2}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Our Story */}
            <motion.div
              ref={el => { sectionRefs.current[1] = el }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[60vh] sm:min-h-screen flex items-center py-12 sm:py-20 lg:py-32"
            >
              <div className="w-full max-w-3xl">
                <motion.h3
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#213f51] mb-8 sm:mb-12 lg:mb-16"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    direction: isRTL ? 'rtl' : 'ltr'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {t.about.storyTitle}
                </motion.h3>

                <div className="space-y-4 sm:space-y-6">
                  <motion.p
                    className="text-base sm:text-lg text-[rgba(33,63,81,0.75)] leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.8,
                      direction: isRTL ? 'rtl' : 'ltr'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {t.about.storyDescription1}
                  </motion.p>

                  <motion.p
                    className="text-lg text-[rgba(33,63,81,0.75)] leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.8,
                      direction: isRTL ? 'rtl' : 'ltr'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {t.about.storyDescription2}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Our Values */}
            <motion.div
              ref={el => { sectionRefs.current[2] = el }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[60vh] sm:min-h-screen flex items-center py-12 sm:py-20 lg:py-32"
            >
              <div className="w-full max-w-5xl">
                <motion.h3
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#213f51] mb-8 sm:mb-12 lg:mb-20"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    direction: isRTL ? 'rtl' : 'ltr'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {t.about.valuesTitle}
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
                  {[
                    { title: t.about.qualityFirst, description: t.about.qualityFirstDesc, icon: Award },
                    { title: t.about.integrity, description: t.about.integrityDesc, icon: Shield },
                    { title: t.about.customerFocus, description: t.about.customerFocusDesc, icon: Users },
                  ].map((value, index) => {
                    const IconComponent = value.icon
                    return (
                    <motion.div
                      key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`relative min-w-0 ${index === 0 ? 'px-0 md:px-8 lg:px-12' : 'pr-0 md:pr-8 lg:pr-12'}`}
                      >
                        {index > 0 && (
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#2f5a65]/10 hidden md:block" />
                        )}
                        <div className={`w-full ${index > 0 ? 'pl-0 md:pl-16 lg:pl-20' : ''}`}>
                          {/* Icon */}
                          <div className="mb-6 flex justify-center md:justify-start">
                            <div
                              className="w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center"
                              style={{
                                background: 'linear-gradient(135deg, rgba(14, 120, 136, 0.15) 0%, rgba(47, 90, 101, 0.15) 100%)',
                              }}
                            >
                              <IconComponent
                                className="w-7 h-7 lg:w-8 lg:h-8"
                                style={{
                                  color: 'rgba(14, 120, 136, 1)',
                                }}
                                strokeWidth={2.5}
                                fill="none"
                              />
                            </div>
                        </div>
                          {/* Title */}
                          <h4
                            className="text-xl lg:text-2xl font-semibold text-[#213f51] mb-4 text-center md:text-left"
                            style={{
                              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                              fontWeight: 600,
                              letterSpacing: '-0.01em',
                              lineHeight: 1.3,
                              direction: isRTL ? 'rtl' : 'ltr'
                            }}
                          >
                            {value.title}
                          </h4>
                          {/* Description */}
                          <p
                            className="text-sm lg:text-base text-[rgba(33,63,81,0.7)] leading-relaxed text-center md:text-left"
                            style={{
                              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                              fontWeight: 300,
                              lineHeight: 1.7,
                              direction: isRTL ? 'rtl' : 'ltr'
                            }}
                          >
                            {value.description}
                          </p>
                      </div>
                    </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Our Approach */}
            <motion.div
              ref={el => { sectionRefs.current[3] = el }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[60vh] sm:min-h-screen flex items-center py-12 sm:py-20 lg:py-32"
            >
              <div className="w-full max-w-3xl">
                <motion.h3
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#213f51] mb-8 sm:mb-12 lg:mb-16"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    direction: isRTL ? 'rtl' : 'ltr'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {t.about.approachTitle}
                </motion.h3>

                <div className="space-y-6">
                  <p
                    className="text-lg text-[rgba(33,63,81,0.75)] leading-relaxed italic"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.8,
                      direction: isRTL ? 'rtl' : 'ltr'
                    }}
                  >
                    &ldquo;{t.about.approachQuote}&rdquo;
                  </p>
                  <p
                    className="text-lg text-[rgba(33,63,81,0.75)] leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.8,
                      direction: isRTL ? 'rtl' : 'ltr'
                    }}
                  >
                    {t.about.approachDescription}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div
              ref={el => { sectionRefs.current[4] = el }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative min-h-screen flex items-center py-32"
            >
              <div className="w-full max-w-6xl">
                <motion.h3
                  className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#213f51] mb-12"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    direction: isRTL ? 'rtl' : 'ltr'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {t.about.whyChooseTitle}
                </motion.h3>

                <motion.p
                  className="text-sm sm:text-base text-[rgba(33,63,81,0.7)] mb-8 sm:mb-12 lg:mb-16 max-w-3xl"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    fontWeight: 300,
                    lineHeight: 1.6,
                    direction: isRTL ? 'rtl' : 'ltr'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {t.about.whyChooseDescription}
                </motion.p>

                {/* Central Icon with Feature Boxes */}
                <div className="relative w-full min-h-[400px] sm:min-h-[500px] lg:h-[700px] flex flex-col lg:flex-row items-center justify-center lg:justify-center">
                  {/* Mobile: Stack boxes vertically */}
                  <div className="lg:hidden w-full space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                    {[
                      {
                        position: 'top-left',
                        title: t.about.modernFacilities,
                        description: t.about.modernFacilitiesDesc,
                        icon: (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                        ),
                      },
                      {
                        position: 'top-right',
                        title: t.about.transparentAffordable,
                        description: t.about.transparentAffordableDesc,
                        icon: (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        ),
                      },
                      {
                        position: 'bottom-left',
                        title: t.about.expertTeam,
                        description: t.about.expertTeamDesc,
                        icon: (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                          </svg>
                        ),
                      },
                      {
                        position: 'bottom-right',
                        title: t.about.clientSupport,
                        description: t.about.clientSupportDesc,
                        icon: (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                          </svg>
                        ),
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.position}
                        className="w-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      >
                        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
                          <div className="flex items-start gap-4">
                            <div
                              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                              style={{
                                background: 'linear-gradient(135deg, rgba(14, 120, 136, 0.2) 0%, rgba(47, 90, 101, 0.2) 100%)',
                                color: 'rgba(14, 120, 136, 1)',
                              }}
                            >
                              {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4
                                className="text-lg font-semibold text-[#213f51] mb-2"
                                style={{
                                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                                  fontWeight: 600,
                                  letterSpacing: '-0.01em',
                                  direction: isRTL ? 'rtl' : 'ltr'
                                }}
                              >
                                {item.title}
                              </h4>
                              <p
                                className="text-sm text-[rgba(33,63,81,0.7)] leading-relaxed"
                                style={{
                                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                                  fontWeight: 300,
                                  lineHeight: 1.6,
                                  direction: isRTL ? 'rtl' : 'ltr'
                                }}
                              >
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {/* SVG for connecting lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} viewBox="0 0 1000 700" preserveAspectRatio="none">
                    {/* Top Left */}
                    <motion.path
                      d="M 500 350 Q 350 210, 200 140"
                      fill="none"
                      stroke="rgba(47, 90, 101, 0.15)"
                      strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="hidden lg:block"
                    />
                    {/* Top Right */}
                    <motion.path
                      d="M 500 350 Q 650 210, 800 140"
                      fill="none"
                      stroke="rgba(47, 90, 101, 0.15)"
                      strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="hidden lg:block"
                    />
                    {/* Bottom Left */}
                    <motion.path
                      d="M 500 350 Q 350 490, 200 560"
                      fill="none"
                      stroke="rgba(47, 90, 101, 0.15)"
                      strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="hidden lg:block"
                    />
                    {/* Bottom Right */}
                    <motion.path
                      d="M 500 350 Q 650 490, 800 560"
                      fill="none"
                      stroke="rgba(47, 90, 101, 0.15)"
                      strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="hidden lg:block"
                    />
                  </svg>

                  {/* Central Icon - Desktop only */}
                  <motion.div
                    className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-40 lg:h-40 rounded-full items-center justify-center z-10"
                    style={{
                      background: 'linear-gradient(135deg, rgba(14, 120, 136, 1) 0%, rgba(47, 90, 101, 1) 100%)',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Axe
                      className="w-16 h-16 lg:w-20 lg:h-20"
                      strokeWidth="1.5"
                      color="white"
                    />
                </motion.div>

                  {/* Feature Boxes */}
                  {[
                    {
                      position: 'top-left',
                      title: t.about.modernFacilities,
                      description: t.about.modernFacilitiesDesc,
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      ),
                    },
                    {
                      position: 'top-right',
                      title: t.about.transparentAffordable,
                      description: t.about.transparentAffordableDesc,
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      ),
                    },
                    {
                      position: 'bottom-left',
                      title: t.about.expertTeam,
                      description: t.about.expertTeamDesc,
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                        </svg>
                      ),
                    },
                    {
                      position: 'bottom-right',
                      title: t.about.clientSupport,
                      description: t.about.clientSupportDesc,
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      ),
                    },
                  ].map((item, index) => {
                    const positions: Record<string, string> = {
                      'top-left': 'lg:absolute lg:top-[10%] lg:left-[5%] lg:bottom-auto lg:right-auto',
                      'top-right': 'lg:absolute lg:top-[10%] lg:right-[5%] lg:bottom-auto lg:left-auto',
                      'bottom-left': 'lg:absolute lg:bottom-[10%] lg:left-[5%] lg:top-auto lg:right-auto',
                      'bottom-right': 'lg:absolute lg:bottom-[10%] lg:right-[5%] lg:top-auto lg:left-auto',
                    }

                    return (
                    <motion.div
                        key={item.position}
                        className={`relative lg:absolute ${positions[item.position]} w-full max-w-[280px] lg:w-[320px] mx-auto lg:mx-0 mb-6 lg:mb-0 z-20`}
                        initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      >
                        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div
                              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                              style={{
                                background: 'linear-gradient(135deg, rgba(14, 120, 136, 0.2) 0%, rgba(47, 90, 101, 0.2) 100%)',
                                color: 'rgba(14, 120, 136, 1)',
                              }}
                            >
                              {item.icon}
                      </div>
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h4
                                className="text-lg font-semibold text-[#213f51] mb-2"
                                style={{
                                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                                  fontWeight: 600,
                                  letterSpacing: '-0.01em',
                                  direction: isRTL ? 'rtl' : 'ltr'
                                }}
                              >
                                {item.title}
                              </h4>
                              <p
                                className="text-sm text-[rgba(33,63,81,0.7)] leading-relaxed"
                                style={{
                                  fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                                  fontWeight: 300,
                                  lineHeight: 1.6,
                                  direction: isRTL ? 'rtl' : 'ltr'
                                }}
                              >
                        {item.description}
                      </p>
                            </div>
                          </div>
                        </div>
                    </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
