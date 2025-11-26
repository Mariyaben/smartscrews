'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Axe, Award, Shield, Users } from 'lucide-react'

export default function AboutSection() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const lockRef = useRef(false)

  const sections = [
    { id: 'about', label: 'ABOUT' },
    { id: 'story', label: 'OUR STORY' },
    { id: 'values', label: 'OUR VALUES' },
    { id: 'approach', label: 'OUR APPROACH' },
    { id: 'why-choose', label: 'WHY CHOOSE US' },
  ]

  useEffect(() => {
    const el = document.querySelector('[data-right-section]') as HTMLElement
    if (!el) return

    const forceReveal = () => {
      if (lockRef.current) return
      lockRef.current = true
      el.scrollTo({ top: 0, behavior: 'instant' })
      setTimeout(() => {
        el.scrollTo({ top: 1, behavior: 'smooth' })
      }, 50)
      setTimeout(() => {
        lockRef.current = false
      }, 400)
    }

    forceReveal()

    const handleScroll = () => {
      if (lockRef.current) return

      const scrollTop = el.scrollTop
      const viewportHeight = el.clientHeight
      const triggerPoint = scrollTop + viewportHeight * 0.35 // 35% from top

      let activeIndex = 0
      let maxVisible = 0

      sectionRefs.current.forEach((ref: HTMLElement | null, index: number) => {
        if (!ref) return
        
        const rect = ref.getBoundingClientRect()
        const containerRect = el.getBoundingClientRect()
        
        // Calculate position relative to scroll container
        const sectionTop = scrollTop + (rect.top - containerRect.top)
        const sectionBottom = sectionTop + rect.height

        // Check how much of the section is visible at the trigger point
        if (triggerPoint >= sectionTop && triggerPoint <= sectionBottom) {
          // Calculate visible portion
          const visibleTop = Math.max(sectionTop, triggerPoint - viewportHeight * 0.1)
          const visibleBottom = Math.min(sectionBottom, triggerPoint + viewportHeight * 0.1)
          const visibleAmount = visibleBottom - visibleTop
          
          if (visibleAmount > maxVisible) {
            maxVisible = visibleAmount
            activeIndex = index
          }
        }
      })

      // If scrolled to top, always highlight first section
      if (scrollTop < 50) {
        activeIndex = 0
      }

      setActiveSection(activeIndex)
    }

    // Use Intersection Observer as primary method
    const observerOptions = {
      root: el,
      rootMargin: '-25% 0px -45% 0px', // Trigger when section is in upper-middle portion
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
    }

    const observer = new IntersectionObserver((entries) => {
      if (lockRef.current) return

      // Track all intersecting sections
      const intersecting: Array<{ index: number; ratio: number }> = []

      entries.forEach((entry) => {
        const index = sectionRefs.current.findIndex((ref: HTMLElement | null) => ref === entry.target)
        if (index !== -1 && entry.isIntersecting && entry.intersectionRatio > 0.1) {
          intersecting.push({ index, ratio: entry.intersectionRatio })
        }
      })

      if (intersecting.length > 0) {
        // Find the section with the highest intersection ratio
        const active = intersecting.reduce((prev, current) => 
          current.ratio > prev.ratio ? current : prev
        )
        setActiveSection(active.index)
      }
    }, observerOptions)

    // Wait for refs to be set, then observe
    const timeoutId = setTimeout(() => {
      sectionRefs.current.forEach((ref: HTMLElement | null) => {
        if (ref) observer.observe(ref)
      })
      // Initial check
      handleScroll()
    }, 200)

    // Also use scroll handler as fallback
    el.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check
    setTimeout(() => handleScroll(), 300)

    return () => {
      clearTimeout(timeoutId)
      el.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

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
    <section id="about" className="relative w-full bg-[#faf9f6] min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">

        {/* Left navigation section */}
      <div className="
      lg:sticky lg:top-0 lg:h-screen
      w-full lg:w-1/3
      flex flex-col justify-center
      bg-[#faf9f6]
          pl-12 lg:pl-20
          pr-8 lg:pr-12
      py-20
      z-10 relative overflow-hidden self-start
          space-y-12
      ">
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
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full ${
                      activeSection === index
                        ? 'bg-gradient-to-b from-[#0e7888] to-[#2f5a65]'
                        : 'bg-[#2f5a65]/20 group-hover:bg-[#2f5a65]/40'
                    }`}
                    animate={{
                      height: activeSection === index ? '100%' : '60%',
                      opacity: activeSection === index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.25 }}
                  />

                  <div className="py-28 lg:py-32 pl-6">
                    <span
                      className={`text-2xl lg:text-3xl transition-colors duration-300 ${
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
                  <div className="h-px bg-[#2f5a65]/10 my-16 lg:my-20" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right content section */}
        <div
        data-right-section
        className="w-full lg:w-2/3 lg:ml-[33.333333%] bg-[#faf9f6] relative scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="max-w-4xl mx-auto px-8 lg:px-16 py-0">

            {/* About */}
            <motion.div
              ref={el => { sectionRefs.current[0] = el }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative min-h-screen flex items-center py-32"
            >
              <div className="w-full max-w-3xl">
                <motion.h2
                  className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#213f51] mb-16"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  About Smartscrews
                </motion.h2>

                <div className="space-y-6">
                  <motion.p
                    className="text-lg text-[rgba(33,63,81,0.75)] leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.8,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    We are a leading provider of professional building and maintenance services, committed to delivering exceptional craftsmanship and outstanding customer service.
                  </motion.p>
                  <motion.p
                    className="text-lg text-[rgba(33,63,81,0.75)] leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.8,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    With a team of certified professionals and a commitment to excellence, we bring expertise and reliability to every project, ensuring results that exceed expectations.
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
              className="relative min-h-screen flex items-center py-32"
            >
              <div className="w-full max-w-3xl">
                <motion.h3
                  className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#213f51] mb-16"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                    Our Story
                </motion.h3>

                <div className="space-y-6">
                  <motion.p
                    className="text-lg text-[rgba(33,63,81,0.75)] leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.8,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    Smartscrews was founded with a simple purpose: to deliver trustworthy building and maintenance services through exceptional skill and unwavering integrity.
                  </motion.p>

                  <motion.p
                    className="text-lg text-[rgba(33,63,81,0.75)] leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.8,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    What began as a small crew of dedicated craftsmen has grown into a comprehensive service provider, yet our commitment to quality and attention to detail remains unchanged.
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
              className="relative min-h-screen flex items-center py-32"
            >
              <div className="w-full max-w-5xl">
                <motion.h3
                  className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#213f51] mb-20"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                    Our Values
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {[
                    { title: 'Quality First', description: 'Meticulously selected materials and attention to detail for lasting results.', icon: Award },
                    { title: 'Integrity', description: 'Transparent communication and honest practices in everything we do.', icon: Shield },
                    { title: 'Customer Focus', description: 'We listen and collaborate to bring your vision to life with precision.', icon: Users },
                  ].map((value, index) => {
                    const IconComponent = value.icon
                    return (
                    <motion.div
                      key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`relative min-w-0 ${index === 0 ? 'px-0 md:px-8 lg:px-12' : 'pr-8 lg:pr-12'}`}
                      >
                        {index > 0 && (
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#2f5a65]/10 hidden md:block" />
                        )}
                        <div className={`w-full ${index > 0 ? 'pl-12 md:pl-16 lg:pl-20' : ''}`}>
                          {/* Icon */}
                          <div className="mb-6">
                            <div
                              className="w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto md:mx-0"
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
              className="relative min-h-screen flex items-center py-32"
            >
              <div className="w-full max-w-3xl">
                <motion.h3
                  className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#213f51] mb-16"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                    Our Approach
                </motion.h3>

                <div className="space-y-6">
                  <p
                    className="text-lg text-[rgba(33,63,81,0.75)] leading-relaxed italic"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.8,
                    }}
                  >
                    &ldquo;We believe in hiring people based on who they are, not just what they have done.&rdquo;
                  </p>
                  <p
                    className="text-lg text-[rgba(33,63,81,0.75)] leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.8,
                    }}
                  >
                    Training someone in our methods is easier than teaching someone to uphold our values. Our team is friendly, committed, and takes genuine pride in producing work that reflects our high standards.
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
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                    Why Choose Us
                </motion.h3>

                <motion.p
                  className="text-base text-[rgba(33,63,81,0.7)] mb-16 max-w-3xl"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Clients choose Smart Screws because we combine expert craftsmanship with precision, modern techniques, and a client-first approach. From installation to maintenance, we make construction simple, reliable, and centered around your needs.
                </motion.p>

                {/* Central Icon with Feature Boxes */}
                <div className="relative w-full min-h-[600px] lg:h-[700px] flex flex-col lg:flex-row items-center justify-center lg:justify-center">
                  {/* Mobile: Stack boxes vertically */}
                  <div className="lg:hidden w-full space-y-6 mb-8">
                    {[
                      {
                        position: 'top-left',
                        title: 'Modern Facilities & Technology',
                        description: 'Latest tools and techniques for precision work.',
                        icon: (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                        ),
                      },
                      {
                        position: 'top-right',
                        title: 'Transparent & Affordable',
                        description: 'Quality work without hidden costs.',
                        icon: (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        ),
                      },
                      {
                        position: 'bottom-left',
                        title: 'Expert Team of Specialists',
                        description: 'Skilled professionals committed to excellence.',
                        icon: (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                          </svg>
                        ),
                      },
                      {
                        position: 'bottom-right',
                        title: '24/7 Client Support',
                        description: "Because construction needs don't wait for office hours.",
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
                      title: 'Modern Facilities & Technology',
                      description: 'Latest tools and techniques for precision work.',
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      ),
                    },
                    {
                      position: 'top-right',
                      title: 'Transparent & Affordable',
                      description: 'Quality work without hidden costs.',
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      ),
                    },
                    {
                      position: 'bottom-left',
                      title: 'Expert Team of Specialists',
                      description: 'Skilled professionals committed to excellence.',
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                        </svg>
                      ),
                    },
                    {
                      position: 'bottom-right',
                      title: '24/7 Client Support',
                      description: "Because construction needs don't wait for office hours.",
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
