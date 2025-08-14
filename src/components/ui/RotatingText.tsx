'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface RotatingTextProps {
  text: string | string[];
  styles: string[];
  interval?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({ 
  text, 
  styles, 
  interval = 2500 
}) => {
  const { darkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);
  
  // Handle both single text and array of texts
  const textArray = Array.isArray(text) ? text : [text];
  const maxLength = Math.max(styles.length, textArray.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % maxLength);
      setKey(prev => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, maxLength]);

  const currentText = textArray[currentIndex % textArray.length];
  const currentStyle = styles[currentIndex % styles.length];

  return (
    <span className="inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`${currentStyle} ${darkMode ? 'text-white' : 'text-gray-900'}`}
        >
          {currentText}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
