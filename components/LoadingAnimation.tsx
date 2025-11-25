'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  fullScreen?: boolean;
  message?: string;
}

export default function LoadingAnimation({ fullScreen = true, message = 'Loading...' }: LoadingAnimationProps) {
  const wrapperClass = fullScreen
    ? 'fixed inset-0 z-[9999] flex items-center justify-center bg-[#faf9f6]'
    : 'flex items-center justify-center py-12';

  return (
    <motion.div
      className={wrapperClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-8">
          <motion.div
            className="absolute inset-0 border-4 border-[#0e7888] border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute inset-4 bg-gradient-to-br from-[#0e7888] to-[#2f5a65] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        <div className="flex gap-2 mb-4">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-gradient-to-br from-[#0e7888] to-[#2f5a65] rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <motion.p
          className="text-[#213f51] font-medium text-lg"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-[#2f5a65] border-t-[#0e7888] rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

// Page transition loader - Logo assembling from around to center
export function PageLoader() {
  // Letters of SMARTSCREWS with their starting positions
  const letters = [
    { char: 'S', startX: -400, startY: -200 },
    { char: 'M', startX: -300, startY: -250 },
    { char: 'A', startX: -200, startY: -300 },
    { char: 'R', startX: -100, startY: -300 },
    { char: 'T', startX: 0, startY: -300 },
    { char: 'S', startX: 100, startY: -300 },
    { char: 'C', startX: 200, startY: -250 },
    { char: 'R', startX: 300, startY: -200 },
    { char: 'E', startX: 350, startY: -100 },
    { char: 'W', startX: 400, startY: 0 },
    { char: 'S', startX: 350, startY: 100 },
    { char: 'S', startX: 250, startY: 200 },
  ];

  // Final positions for letters (centered)
  const finalPositions = [
    { x: -275, y: 0 }, // S
    { x: -220, y: 0 }, // M
    { x: -165, y: 0 }, // A
    { x: -110, y: 0 }, // R
    { x: -55, y: 0 },  // T
    { x: 0, y: 0 },    // S
    { x: 55, y: 0 },   // C
    { x: 110, y: 0 },  // R
    { x: 165, y: 0 },  // E
    { x: 220, y: 0 },  // W
    { x: 275, y: 0 },  // S
    { x: 330, y: 0 },  // S
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-[#faf9f6] flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
        {/* Letters assembling from around to center */}
        <div 
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {letters.map((letter, index) => {
            const finalPos = finalPositions[index];
            const delay = index * 0.08;
            
            return (
              <motion.span
                key={`${letter.char}-${index}`}
                className="absolute text-7xl font-bold text-[#0e7888] whitespace-nowrap"
                style={{
                  left: 0,
                  top: 0,
                }}
                initial={{
                  x: letter.startX,
                  y: letter.startY,
                  opacity: 0,
                  scale: 0.5,
                  rotate: -180,
                }}
                animate={{
                  x: finalPos.x,
                  y: finalPos.y,
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: delay,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {letter.char}
              </motion.span>
            );
          })}
        </div>

        {/* Building icon assembling from bottom */}
        <motion.div
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            marginTop: '128px',
          }}
          initial={{ y: 400, opacity: 0, scale: 0, rotate: 180 }}
          animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            delay: 1.2,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <svg
            viewBox="0 0 100 100"
            style={{ width: '80px', height: '80px' }}
            className="text-[#0e7888]"
            fill="currentColor"
          >
            <rect x="25" y="45" width="50" height="45" fill="currentColor" rx="2" />
            <polygon points="20,45 50,25 80,45" fill="currentColor" />
            <rect x="35" y="55" width="8" height="12" fill="#fffffe" />
            <rect x="47" y="55" width="8" height="12" fill="#fffffe" />
            <rect x="59" y="55" width="8" height="12" fill="#fffffe" />
            <rect x="42" y="70" width="16" height="20" fill="#213f51" rx="1" />
          </svg>
        </motion.div>

        {/* Tagline appearing after assembly */}
        <motion.div
          className="absolute text-center"
          style={{
            bottom: '160px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          <motion.div
            className="text-7xl font-light mb-3"
            style={{ color: 'rgba(33,63,81,0.3)' }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            00
          </motion.div>
          <p className="text-[#213f51] text-sm font-normal tracking-wide">
            quality is our standard
          </p>
        </motion.div>
      </div>
    </div>
  );
}
