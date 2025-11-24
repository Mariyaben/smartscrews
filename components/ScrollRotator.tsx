'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollRotator() {
  const { scrollYProgress } = useScroll();

  // Rotate screw continuously as user scrolls (multiple rotations)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
      <div className="w-28 h-28 lg:w-32 lg:h-32 relative">
        <svg
          viewBox="0 0 140 140"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="screwHeadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0e7888" />
              <stop offset="50%" stopColor="#2f5a65" />
              <stop offset="100%" stopColor="#213f51" />
            </linearGradient>
            <linearGradient id="screwBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2f5a65" />
              <stop offset="100%" stopColor="#213f51" />
            </linearGradient>
          </defs>
          
          {/* Screwhead with 'S' - rotates around center */}
          <g transform="translate(70, 70)">
            <motion.g
              style={{ rotate }}
            >
              <g transform="translate(-70, -70)">
                {/* Screwhead - octagon shape (centered at 70,70) */}
                <polygon
                  points="70,20 87.07,27.07 97.07,44.14 97.07,64.14 87.07,81.21 70,88.28 52.93,81.21 42.93,64.14 42.93,44.14 52.93,27.07"
                  fill="url(#screwHeadGradient)"
                  stroke="#fffffe"
                  strokeWidth="2.5"
                />
                
                {/* Letter 'S' inside octagon - perfectly centered */}
                <text
                  x="70"
                  y="70"
                  fontSize="50"
                  fontWeight="bold"
                  fill="#fef8e0"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="Arial, sans-serif"
                >
                  S
                </text>
              </g>
            </motion.g>
          </g>
        </svg>
      </div>
    </div>
  );
}

