'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function AboutSection() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    { id: 'about', label: 'ABOUT' },
    { id: 'story', label: 'OUR STORY' },
    { id: 'values', label: 'OUR VALUES' },
    { id: 'approach', label: 'OUR APPROACH' },
    { id: 'why-choose', label: 'WHY CHOOSE US' },
  ];

  useEffect(() => {
    const rightSection = document.querySelector('[data-right-section]') as HTMLElement;
    if (!rightSection) return;

    const handleScroll = () => {
      const scrollPosition = rightSection.scrollTop + rightSection.clientHeight / 2;

      sectionRefs.current.forEach((ref, index) => {
        if (ref && rightSection.contains(ref)) {
          const sectionTop = ref.offsetTop;
          const sectionBottom = sectionTop + ref.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(index);
          }
        }
      });
    };

    rightSection.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => rightSection.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const ref = sectionRefs.current[index];
    const rightSection = document.querySelector('[data-right-section]') as HTMLElement;
    if (ref && rightSection) {
      const sectionTop = ref.offsetTop;
      rightSection.scrollTo({
        top: sectionTop - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full bg-[#fffffe] min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        {/* Left Section - Sticky Navigation Bars (only within About section) */}
        <div className="lg:sticky lg:top-0 lg:h-screen w-full lg:w-1/3 flex flex-col justify-center bg-[#fffffe] pr-12 lg:pr-20 py-16 z-10 relative overflow-hidden self-start">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-40 h-40 border-2 border-[#0e7888] rounded-full" />
            <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-[#2f5a65] rotate-45" />
          </div>

          <div className="relative z-10 pl-24 lg:pl-44">
            {sections.map((section, index) => (
              <div key={section.id}>
                <motion.button
                  onClick={() => scrollToSection(index)}
                  className="w-full text-left relative group transition-all duration-300 pl-0"
                  whileHover={{ x: 8 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Active indicator bar */}
                  <motion.div
                    className={`absolute -left-24 lg:-left-44 top-0 bottom-0 w-1 rounded-r-full ${
                      activeSection === index
                        ? 'bg-gradient-to-b from-[#0e7888] to-[#2f5a65]'
                        : 'bg-[#2f5a65]/20 group-hover:bg-[#2f5a65]/40'
                    }`}
                    animate={{
                      height: activeSection === index ? '100%' : '60%',
                      opacity: activeSection === index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Text */}
                  <div className="py-12 lg:py-16">
                    <span
                      className={`text-2xl lg:text-3xl font-bold tracking-wide transition-colors duration-300 ${
                        activeSection === index
                          ? 'text-[#0e7888]'
                          : 'text-[#213f51]/60 group-hover:text-[#213f51]'
                      }`}
                    >
                      {section.label}
                    </span>
                  </div>
                </motion.button>
                
                {/* Divider line between items (except after last item) */}
                {index < sections.length - 1 && (
                  <div className="h-px bg-[#2f5a65]/10 my-8" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Scrollable Content */}
        <div 
          data-right-section 
          className="w-full lg:w-2/3 lg:ml-[33.333333%] bg-[#fffffe] relative h-screen overflow-y-auto scroll-smooth"
          style={{
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
          }}
        >
          <div className="max-w-4xl mx-auto px-8 lg:px-16 py-0">
            {/* About Section */}
            <motion.div
              ref={(el) => (sectionRefs.current[0] = el)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative min-h-screen flex items-center"
            >
              <div className="w-full">
                <motion.h2
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#213f51] mb-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  About Smartscrews
                </motion.h2>
                <div className="space-y-6">
                  <p className="text-xl text-[rgba(33,63,81,0.8)] leading-relaxed">
                    We are a leading provider of professional building and maintenance services, 
                    committed to delivering exceptional craftsmanship and outstanding customer service.
                  </p>
                  <p className="text-xl text-[rgba(33,63,81,0.8)] leading-relaxed">
                    With years of experience and a team of certified professionals, we bring 
                    expertise, reliability, and quality to every project we undertake.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Our Story */}
            <motion.div
              ref={(el) => (sectionRefs.current[1] = el)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative min-h-screen flex items-center"
            >
              <div className="w-full">
                <motion.div
                  className="flex items-center gap-4 mb-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-1 bg-gradient-to-r from-[#0e7888] to-[#2f5a65]" />
                  <h3 className="text-4xl sm:text-5xl font-bold text-[#213f51]">
                    Our Story
                  </h3>
                </motion.div>
                
                <div className="space-y-6">
                  <motion.p
                    className="text-xl text-[rgba(33,63,81,0.8)] leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Smartscrews was founded with a simple mission: to provide exceptional building 
                    and maintenance services that homeowners and businesses can trust. We combine 
                    traditional craftsmanship with modern techniques to deliver results that stand 
                    the test of time.
                  </motion.p>
                  <motion.p
                    className="text-xl text-[rgba(33,63,81,0.8)] leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    What started as a small team of skilled craftsmen has grown into a comprehensive 
                    service provider, but our core values remain unchanged. Every project we undertake 
                    reflects our commitment to quality, integrity, and customer satisfaction.
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Our Values */}
            <motion.div
              ref={(el) => (sectionRefs.current[2] = el)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative min-h-screen flex items-center"
            >
              
              <div className="w-full">
                <motion.div
                  className="flex items-center gap-4 mb-12"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-1 bg-gradient-to-r from-[#0e7888] to-[#2f5a65]" />
                  <h3 className="text-4xl sm:text-5xl font-bold text-[#213f51]">
                    Our Values
                  </h3>
                </motion.div>
              
              <div className="space-y-8">
                {[
                  {
                    title: 'Quality First',
                    icon: '✓',
                    description: 'We never compromise on quality. Every material, every technique, and every detail is chosen to ensure lasting results that exceed expectations.',
                    color: 'from-[#0e7888] to-[#2f9d7a]',
                  },
                  {
                    title: 'Integrity',
                    icon: '⚖',
                    description: 'Honest communication, transparent pricing, and ethical business practices form the foundation of every relationship we build.',
                    color: 'from-[#2f5a65] to-[#0e7888]',
                  },
                  {
                    title: 'Customer Focus',
                    icon: '❤',
                    description: 'Your satisfaction is our success. We listen carefully, communicate clearly, and go above and beyond to ensure your vision becomes reality.',
                    color: 'from-[#0e7888] to-[#2f5a65]',
                  },
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-white to-[#fffefb]/30 border border-[#2f5a65]/10 hover:border-[#0e7888]/30 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {value.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-[#0e7888] mb-3 group-hover:text-[#2f5a65] transition-colors">
                          {value.title}
                        </h4>
                        <p className="text-lg text-[rgba(33,63,81,0.8)] leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              </div>
            </motion.div>

            {/* Our Approach */}
            <motion.div
              ref={(el) => (sectionRefs.current[3] = el)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative min-h-screen flex items-center"
            >
              <div className="w-full">
                <motion.div
                  className="flex items-center gap-4 mb-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-1 bg-gradient-to-r from-[#0e7888] to-[#2f5a65]" />
                  <h3 className="text-4xl sm:text-5xl font-bold text-[#213f51]">
                    Our Approach
                  </h3>
                </motion.div>
              
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0e7888]/5 to-[#2f5a65]/5 border-l-4 border-[#0e7888]">
                <p className="text-lg text-[rgba(33,63,81,0.8)] leading-relaxed mb-6 italic">
                  "We believe in hiring people based on who they are, not just what they've done."
                </p>
                <p className="text-lg text-[rgba(33,63,81,0.8)] leading-relaxed mb-6">
                  Training someone in our unique processes is easier than training someone to 
                  embody our core values—integrity, performance, and relationships.
                </p>
                <p className="text-lg text-[rgba(33,63,81,0.8)] leading-relaxed">
                  Our team is friendly, hardworking, and trustworthy. We take pride in our work 
                  and in the relationships we build with our clients. Every project is an 
                  opportunity to demonstrate our commitment to excellence.
                </p>
              </div>
              </div>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div
              ref={(el) => (sectionRefs.current[4] = el)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative min-h-screen flex items-center"
            >
              <div className="w-full">
                <motion.div
                  className="flex items-center gap-4 mb-12"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-1 bg-gradient-to-r from-[#0e7888] to-[#2f5a65]" />
                  <h3 className="text-4xl sm:text-5xl font-bold text-[#213f51]">
                    Why Choose Us
                  </h3>
                </motion.div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: '15+ Years',
                    subtitle: 'of Experience',
                    description: 'Over a decade of delivering exceptional results across residential and commercial projects.',
                  },
                  {
                    title: 'Certified',
                    subtitle: 'Professionals',
                    description: 'All our technicians are certified and continuously trained in the latest techniques.',
                  },
                  {
                    title: 'Comprehensive',
                    subtitle: 'Services',
                    description: 'From carpentry to HVAC, we offer a full range of building solutions under one roof.',
                  },
                  {
                    title: 'Quality',
                    subtitle: 'Guarantee',
                    description: 'We stand behind our work with comprehensive warranties and ongoing support.',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-white to-[#fffefb]/20 border border-[#2f5a65]/10 hover:border-[#0e7888]/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="mb-3">
                      <div className="text-3xl font-bold text-[#0e7888]">{item.title}</div>
                      <div className="text-lg font-semibold text-[#213f51]">{item.subtitle}</div>
                    </div>
                    <p className="text-base text-[rgba(33,63,81,0.7)] leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

