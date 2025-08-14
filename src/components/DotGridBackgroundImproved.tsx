'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../contexts/ThemeContext';

interface DotGridBackgroundProps {
  startFrom?: string; // CSS selector to start the grid from
}

const DotGridBackground: React.FC<DotGridBackgroundProps> = ({ startFrom = '#about' }) => {
  const { darkMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate the offset from the top of the page for the startFrom element
    let startYPosition = 0;
    const startElement = document.querySelector(startFrom);
    if (startElement) {
      const rect = startElement.getBoundingClientRect();
      startYPosition = window.scrollY + rect.top;
    }

    // Set canvas to full window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 5; // Make it taller to cover all sections
      
      // Position the canvas to start from the specified element
      container.style.top = `${startYPosition}px`;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { 
        x: e.clientX, 
        y: e.clientY 
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize GSAP timeline
    const tl = gsap.timeline();

    // Dot configuration
    const spacing = 30;
    const dotSize = 1.5;
    const interactionRadius = 100;
    const dots: { x: number; y: number; baseSize: number; size: number }[] = [];

    // Create grid of dots - only starting from the specified position
    for (let x = spacing; x < canvas.width; x += spacing) {
      for (let y = spacing; y < canvas.height; y += spacing) {
        dots.push({
          x,
          y,
          baseSize: dotSize,
          size: dotSize,
        });
      }
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dots
      dots.forEach((dot) => {
        // Calculate distance from mouse
        const dx = dot.x - mousePosition.current.x;
        const dy = dot.y - (mousePosition.current.y - startYPosition + window.scrollY);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Scale dot size based on mouse distance
        if (distance < interactionRadius) {
          const scale = 1 + (interactionRadius - distance) / interactionRadius;
          dot.size = dot.baseSize * scale * 2.5;
        } else {
          // Smoothly return to base size
          dot.size = gsap.utils.interpolate(dot.size, dot.baseSize, 0.1);
        }

        // Draw the dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [darkMode, startFrom]);

  return (
    <div 
      ref={containerRef}
      className="absolute left-0 w-full pointer-events-none z-0"
      style={{ height: '100%' }}
    >
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full pointer-events-none z-0"
      />
    </div>
  );
};

export default DotGridBackground;
