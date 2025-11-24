'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedTitle() {
  const [topColorIndex, setTopColorIndex] = useState(0);
  const [bottomColorIndex, setBottomColorIndex] = useState(1);
  const [mounted, setMounted] = useState(false);

  const colors = [
    '#0e7888', // Teal
    '#2f5a65', // Dark teal
    '#213f51', // Navy
    '#2f9d7a', // Green
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTopColorIndex((prev) => (prev + 1) % colors.length);
      setBottomColorIndex((prev) => (prev + 1) % colors.length);
    }, 3000); // Change color every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const topColor = colors[topColorIndex];
  const bottomColor = colors[bottomColorIndex];

  if (!mounted) {
    return (
      <div className="flex flex-col items-start justify-start gap-0 w-full overflow-visible">
        <div className="flex items-center justify-start gap-1 sm:gap-2 lg:gap-3">
          <span className="text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-black leading-none" style={{ color: '#0e7888' }}>SMART</span>
        </div>
        <div className="flex items-center justify-start gap-2 sm:gap-3 lg:gap-4 overflow-visible">
          <span className="text-6xl sm:text-7xl lg:text-8xl xl:text-[9rem] 2xl:text-[11rem] font-black leading-none" style={{ color: '#2f5a65' }}>SCREWS</span>
        </div>
      </div>
    );
  }

  const topLetters = 'SMART'.split('');
  const bottomLetters = 'SCREWS'.split('');

  return (
    <div className="flex flex-col items-start justify-start gap-0 w-full overflow-visible min-w-0">
      {/* Top Line - SMART */}
      <div className="flex items-center justify-start gap-1 sm:gap-2 lg:gap-3 w-full flex-nowrap overflow-visible">
        {topLetters.map((letter, index) => (
          <motion.span
            key={`top-${letter}-${index}`}
            className="text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-black leading-none inline-block"
            initial={{ opacity: 1 }}
            style={{
              color: topColor,
              transition: 'color 2s ease-in-out',
            }}
            animate={{
              color: topColor,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Bottom Line - SCREWS with screw icon before it */}
      <div className="flex items-center justify-start gap-2 sm:gap-3 lg:gap-4 overflow-visible flex-nowrap -ml-2 sm:-ml-3 lg:-ml-6" style={{ width: 'fit-content', maxWidth: 'none' }}>
        {/* Screw icon before SCREWS */}
        <motion.div
          className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48 inline-block flex-shrink-0 self-center"
          initial={{ scale: 0.8, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="screwGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0e7888" />
                      <stop offset="50%" stopColor="#2f5a65" />
                      <stop offset="100%" stopColor="#213f51" />
                    </linearGradient>
                  </defs>
                  
                  {/* Screw head - hexagonal */}
                  <polygon
                    points="50,20 65,30 65,50 50,60 35,50 35,30"
                    fill="url(#screwGradient)"
                    stroke="#fffffe"
                    strokeWidth="2"
                  />
                  
                  {/* Screw body */}
                  <rect x="47" y="60" width="6" height="50" fill="url(#screwGradient)" rx="3" />
                  
                  {/* Screw threads */}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <line
                      key={i}
                      x1="45"
                      y1={65 + i * 10}
                      x2="55"
                      y2={65 + i * 10}
                      stroke="#fffffe"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  ))}
                  
                  {/* Screw tip */}
                  <polygon
                    points="47,110 50,100 53,110"
                    fill="url(#screwGradient)"
                  />
                </svg>
              </motion.div>

         {/* SCREWS text - all letters visible */}
         {bottomLetters.map((letter, index) => (
           <motion.span
             key={`bottom-${letter}-${index}`}
             className="text-6xl sm:text-7xl lg:text-8xl xl:text-[9rem] 2xl:text-[11rem] font-black leading-none inline-block whitespace-nowrap"
             style={index === bottomLetters.length - 1 ? { paddingRight: '2rem' } : {}}
             initial={{ opacity: 1 }}
             style={{
               color: bottomColor,
               transition: 'color 2s ease-in-out',
             }}
             animate={{
               color: bottomColor,
             }}
           >
             {letter}
           </motion.span>
         ))}
      </div>
    </div>
  );
}

