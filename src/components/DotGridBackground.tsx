'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../contexts/ThemeContext';

const DotGridBackground = () => {
  const { darkMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize GSAP timeline
    const tl = gsap.timeline();

    // Dot configuration
    const spacing = 30;
    const dotSize = 1.5;
    const interactionRadius = 100;
    const dots: { x: number; y: number; baseSize: number; size: number }[] = [];

    // Create grid of dots
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
        const dy = dot.y - mousePosition.current.y;
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
  }, [darkMode]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ position: 'fixed' }}
    />
  );
};

export default DotGridBackground;
