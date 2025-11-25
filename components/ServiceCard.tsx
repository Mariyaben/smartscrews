'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Service } from '@/lib/data';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors: Record<string, { gradient: string; bg: string }> = {
    'Construction': { 
      gradient: 'from-[#2f5a65] to-[#0e7888]',
      bg: 'bg-[#2f5a65]/10'
    },
    'Maintenance': { 
      gradient: 'from-[#0e7888] to-[#2f9d7a]',
      bg: 'bg-[#0e7888]/10'
    },
    'Decorative': { 
      gradient: 'from-[#213f51] to-[#2f5a65]',
      bg: 'bg-[#213f51]/10'
    },
  };

  const colors = categoryColors[service.serviceCategory] || categoryColors['Construction'];

  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 z-0`} />
      
      {/* Category badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1 bg-gradient-to-r ${colors.gradient} text-white text-xs font-semibold rounded-full shadow-lg`}>
          {service.serviceCategory}
        </span>
      </div>

      <div className="block rounded-2xl relative z-10">
        {/* Enhanced Animation Container */}
        <div className={`relative h-56 ${colors.bg} overflow-hidden`}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(14,120,136,0.1),transparent_50%)]" />
          </div>
          
          <div className="relative h-full flex items-center justify-center">
            <ServiceAnimation
              serviceId={service.id}
              isHovered={isHovered}
            />
          </div>
          
          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
            animate={{
              x: isHovered ? '200%' : '-100%',
            }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Enhanced Content */}
        <div className="p-6 relative">
          <h3 className="text-xl font-bold text-[#213f51] mb-3 group-hover:text-[#0e7888] transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-[rgba(33,63,81,0.7)] mb-4 line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>
          
          {/* Hover reveal bullets with animation */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-2 mb-4 pt-2">
              {service.processSteps.slice(0, 3).map((step, stepIndex) => (
                <motion.li
                  key={stepIndex}
                  className="text-sm text-[rgba(33,63,81,0.7)] flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -10,
                  }}
                  transition={{ delay: stepIndex * 0.1 }}
                >
                  <span className={`text-[#0e7888] mr-2 font-bold`}>▸</span>
                  {step}
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Service Animations
function ServiceAnimation({ serviceId, isHovered }: { serviceId: string; isHovered: boolean }) {
  const animationProps = {
    animate: isHovered ? { scale: 1.15, rotate: 3 } : { scale: 1, rotate: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  };

  switch (serviceId) {
    case 'carpentry-wood-flooring':
      return <CarpentryAnimation {...animationProps} />;
    case 'floor-wall-tiling':
      return <TilingAnimation {...animationProps} />;
    case 'plumbing-sanitary':
      return <PlumbingAnimation {...animationProps} />;
    case 'painting':
      return <PaintingAnimation {...animationProps} />;
    case 'air-conditioning':
      return <AirConditioningAnimation {...animationProps} />;
    default:
      return <DefaultAnimation {...animationProps} />;
  }
}

function CarpentryAnimation(props: any) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[180px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2f5a65" />
          <stop offset="100%" stopColor="#0e7888" />
        </linearGradient>
      </defs>
      <motion.rect
        x="40"
        y="80"
        width="120"
        height="25"
        fill="url(#woodGrad)"
        rx="4"
        animate={{
          x: [40, 50, 40],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        {...props}
      />
      <motion.path
        d="M60 105 L80 55 L100 105"
        fill="#0e7888"
        stroke="#213f51"
        strokeWidth="2"
        animate={{
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        {...props}
      />
      <motion.circle
        cx="140"
        cy="92"
        r="10"
        fill="#2f9d7a"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        {...props}
      />
    </svg>
  );
}

function TilingAnimation(props: any) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[180px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tileGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2f5a65" />
          <stop offset="100%" stopColor="#0e7888" />
        </linearGradient>
        <linearGradient id="tileGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0e7888" />
          <stop offset="100%" stopColor="#2f9d7a" />
        </linearGradient>
      </defs>
      {[
        { x: 50, y: 70, grad: 'tileGrad1', delay: 0 },
        { x: 100, y: 70, grad: 'tileGrad2', delay: 0.3 },
        { x: 50, y: 120, grad: 'tileGrad2', delay: 0.3 },
        { x: 100, y: 120, grad: 'tileGrad1', delay: 0 },
      ].map((tile, i) => (
        <motion.rect
          key={i}
          x={tile.x}
          y={tile.y}
          width="50"
          height="50"
          fill={`url(#${tile.grad})`}
          stroke="#213f51"
          strokeWidth="3"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: tile.delay,
            ease: 'easeInOut',
          }}
          {...props}
        />
      ))}
    </svg>
  );
}

function PlumbingAnimation(props: any) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[180px]" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M60 60 L60 140 L140 140 L140 60"
        fill="none"
        stroke="#2f5a65"
        strokeWidth="10"
        strokeLinecap="round"
        {...props}
      />
      <motion.circle
        cx="100"
        cy="100"
        r="35"
        fill="none"
        stroke="#0e7888"
        strokeWidth="5"
        strokeDasharray="15 8"
        animate={{
          rotate: [0, 360],
          strokeDashoffset: [0, 23],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        {...props}
      />
      <motion.rect
        x="85"
        y="85"
        width="30"
        height="8"
        fill="#213f51"
        rx="4"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        {...props}
      />
    </svg>
  );
}

function PaintingAnimation(props: any) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[180px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="paintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2f5a65" />
          <stop offset="100%" stopColor="#0e7888" />
        </linearGradient>
      </defs>
      <rect x="40" y="60" width="120" height="80" fill="url(#paintGrad)" rx="4" />
      <motion.path
        d="M80 80 Q100 60 120 80 T160 80"
        fill="none"
        stroke="#2f9d7a"
        strokeWidth="8"
        strokeLinecap="round"
        animate={{
          pathLength: [0, 1, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        {...props}
      />
      <motion.ellipse
        cx="70"
        cy="100"
        rx="20"
        ry="30"
        fill="#0e7888"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        {...props}
      />
    </svg>
  );
}

function AirConditioningAnimation(props: any) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[180px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="acGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2f5a65" />
          <stop offset="100%" stopColor="#0e7888" />
        </linearGradient>
      </defs>
      <rect x="50" y="70" width="100" height="60" fill="url(#acGrad)" rx="6" />
      <motion.circle
        cx="100"
        cy="100"
        r="25"
        fill="none"
        stroke="#2f9d7a"
        strokeWidth="4"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        {...props}
      />
      <motion.path
        d="M60 80 L80 60 M140 80 L160 60 M60 140 L80 160 M140 140 L160 160"
        stroke="#0e7888"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        {...props}
      />
    </svg>
  );
}

function DefaultAnimation(props: any) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[180px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="defaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2f5a65" />
          <stop offset="100%" stopColor="#0e7888" />
        </linearGradient>
      </defs>
      <motion.rect
        x="60"
        y="80"
        width="80"
        height="40"
        fill="url(#defaultGrad)"
        rx="6"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        {...props}
      />
    </svg>
  );
}
