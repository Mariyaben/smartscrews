'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import ContactModal from './ContactModal';

function FloatingActionButton() {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  if (!mounted) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 'clamp(16px, 4vw, 32px)',
          right: 'clamp(16px, 4vw, 32px)',
          zIndex: 99999,
        }}
      >
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center rounded-full shadow-lg cursor-pointer transition-all duration-300 border-none"
          style={{
            width: 'clamp(56px, 8vw, 64px)',
            height: 'clamp(56px, 8vw, 64px)',
            background: 'linear-gradient(135deg, #0e7888 0%, #2f5a65 100%)',
            boxShadow: '0 4px 20px rgba(14, 120, 136, 0.4), 0 0 40px rgba(14, 120, 136, 0.2)',
          }}
          aria-label="Contact Us"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <MessageCircle 
            className="text-white" 
            style={{
              width: 'clamp(24px, 4vw, 28px)',
              height: 'clamp(24px, 4vw, 28px)'
            }}
            strokeWidth={2}
          />
        </motion.button>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default FloatingActionButton;
