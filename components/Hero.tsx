'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AnimatedTitle from './AnimatedTitle';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [isInitialShow, setIsInitialShow] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Show content first, then transition to video after a delay
  useEffect(() => {
    if (!isInitialShow) return;

    const timer = setTimeout(() => {
      // Sweep out initial content
      setShowContent(false);
      // After sweep out completes (0.6s), sweep in video
      setTimeout(() => {
        setShowVideo(true);
        setIsInitialShow(false);
      }, 600);
    }, 4000); // Show content for 4 seconds before transitioning to video

    return () => clearTimeout(timer);
  }, [isInitialShow]);

  // Handle video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

    const handleVideoEnd = () => {
      // Start sweeping out video
      setShowVideo(false);
      // After sweep out completes (0.6s), sweep in content
      setTimeout(() => {
        setShowContent(true);
      }, 600);
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [showVideo]);

  return (
    <section id="hero" className="relative overflow-hidden min-h-[90vh]">
      {/* Smooth transition gradient at top - blends with header */}
      <div 
        className="absolute inset-x-0 top-0 h-32 z-30 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(20, 40, 50, 0.9) 0%, rgba(20, 40, 50, 0.7) 20%, rgba(20, 40, 50, 0.5) 40%, rgba(20, 40, 50, 0.3) 60%, rgba(20, 40, 50, 0.1) 80%, transparent 100%)',
        }}
      />
      
      {/* Video Background */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              loop={false}
              className="w-full h-full object-cover"
              preload="auto"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key="hero-content"
            initial={isInitialShow ? { x: 0, opacity: 1 } : { x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 w-full"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fffffe] via-[#fffffe] to-[#fefbf7] opacity-50" />
            
            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-[#0e7888] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
            <div className="absolute top-40 left-10 w-72 h-72 bg-[#2f5a65] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#213f51] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40 relative z-10 overflow-visible">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 xl:gap-32 items-center min-h-[90vh] overflow-visible" style={{ overflow: 'visible' }}>
                {/* Text Content - Title Only */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="w-full overflow-visible flex items-center"
                  style={{ minWidth: 0 }}
                >
                  <div className="w-full overflow-visible pr-8 lg:pr-12 -ml-2 lg:-ml-6" style={{ width: 'calc(100% + 2rem)' }}>
                    <AnimatedTitle />
                  </div>
                </motion.div>

                {/* Enhanced Visual */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                  className="relative flex items-center justify-center ml-8 lg:ml-16 xl:ml-24"
                >
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0e7888] to-[#2f5a65] rounded-3xl blur-2xl opacity-30 animate-pulse" />
                    
                    {/* Main visual container */}
                    <div className="relative bg-gradient-to-br from-white to-[#fffffe] rounded-3xl p-4 lg:p-6 shadow-2xl border border-[#2f5a65]/10">
                      <div className="relative w-full aspect-square max-w-sm mx-auto">
                  <svg
                    viewBox="0 0 400 400"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Animated background pattern */}
                    <defs>
                      <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2f5a65" />
                        <stop offset="100%" stopColor="#0e7888" />
                      </linearGradient>
                      <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0e7888" />
                        <stop offset="100%" stopColor="#2f9d7a" />
                      </linearGradient>
                    </defs>
                    
                    {/* Building with gradient */}
                    <motion.rect
                      x="100"
                      y="120"
                      width="200"
                      height="200"
                      fill="url(#buildingGradient)"
                      rx="8"
                      initial={{ scale: 0.8, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                    
                    {/* Animated windows */}
                    {[
                      { x: 130, y: 150, delay: 0.8 },
                      { x: 230, y: 150, delay: 1.0 },
                      { x: 130, y: 230, delay: 1.2 },
                      { x: 230, y: 230, delay: 1.4 },
                    ].map((window, i) => (
                      <motion.rect
                        key={i}
                        x={window.x}
                        y={window.y}
                        width="40"
                        height="50"
                        fill="url(#windowGradient)"
                        rx="4"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                          scale: 1,
                        }}
                        transition={{ 
                          duration: 2,
                          delay: window.delay,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      />
                    ))}
                    
                    {/* Door with animation */}
                    <motion.rect
                      x="175"
                      y="250"
                      width="50"
                      height="70"
                      fill="#213f51"
                      rx="4"
                      initial={{ y: 320, opacity: 0 }}
                      animate={{ y: 250, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1 }}
                    />
                    <motion.circle
                      cx="215"
                      cy="285"
                      r="4"
                      fill="#0e7888"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.3 }}
                    />
                    
                    {/* Roof with gradient */}
                    <motion.polygon
                      points="80,120 200,60 320,120"
                      fill="#213f51"
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    />
                    
                    {/* Floating tools */}
                    <motion.g
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        rotate: 0,
                        y: [0, -10, 0],
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 1.6,
                        y: {
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }}
                    >
                      <rect x="280" y="280" width="60" height="8" fill="#0e7888" rx="4" />
                      <rect x="310" y="250" width="8" height="40" fill="#0e7888" rx="4" />
                      <circle cx="290" cy="284" r="3" fill="#2f9d7a" />
                    </motion.g>
                    
                    {/* Plumbing work - pipes on the right side of the house */}
                    <motion.g
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                      }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 1.8,
                      }}
                    >
                      {/* Vertical pipe */}
                      <motion.rect
                        x="305"
                        y="140"
                        width="6"
                        height="60"
                        fill="#0e7888"
                        rx="3"
                        animate={{
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      {/* Horizontal pipe */}
                      <motion.rect
                        x="305"
                        y="195"
                        width="40"
                        height="6"
                        fill="#0e7888"
                        rx="3"
                        animate={{
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.3,
                        }}
                      />
                      {/* Pipe connection/joint */}
                      <motion.circle
                        cx="325"
                        cy="198"
                        r="5"
                        fill="#2f5a65"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      {/* Water drop animation */}
                      <motion.circle
                        cx="325"
                        cy="198"
                        r="2"
                        fill="#2f9d7a"
                        animate={{
                          y: [198, 210, 198],
                          opacity: [1, 0.3, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.5,
                        }}
                      />
                      {/* Small faucet/valve at the end */}
                      <motion.rect
                        x="340"
                        y="192"
                        width="8"
                        height="12"
                        fill="#213f51"
                        rx="2"
                        animate={{
                          rotate: [0, 15, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </motion.g>
                    
                    {/* Decorative elements */}
                    <motion.circle
                      cx="80"
                      cy="100"
                      r="15"
                      fill="#0e7888"
                      opacity="0.3"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
