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

      {/* Bottom Line - SCREWS */}
      <div className="flex items-center justify-start gap-2 sm:gap-3 lg:gap-4 overflow-visible flex-nowrap" style={{ width: 'fit-content', maxWidth: 'none' }}>
         {/* SCREWS text - all letters visible */}
         {bottomLetters.map((letter, index) => (
           <motion.span
             key={`bottom-${letter}-${index}`}
             className="text-6xl sm:text-7xl lg:text-8xl xl:text-[9rem] 2xl:text-[11rem] font-black leading-none inline-block whitespace-nowrap"
             style={{
               color: bottomColor,
               transition: 'color 2s ease-in-out',
             }}
             initial={{ opacity: 1 }}
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

