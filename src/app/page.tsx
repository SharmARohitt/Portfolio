'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import DotGrid from '@/components/DotGrid';
import GooeyNavigation from '@/components/GooeyNavigation';
import Skills from '@/components/Skills';
import DotGridBackgroundImproved from '@/components/DotGridBackgroundImproved';
import RotatingText from '@/components/ui/RotatingText';
import InfiniteMenu from '@/components/InfiniteMenu';
import { useTheme } from '@/contexts/ThemeContext';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { darkMode } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const bioTextRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const glowEffectRef = useRef<HTMLDivElement>(null);

  // Array of simple font styles for rotating text
  const nameStyles = [
    "font-normal",
    "font-medium",
    "font-semibold", 
    "font-bold",
    "font-light",
    "font-thin",
    "italic",
    "font-mono",
    "font-serif",
    "uppercase",
    "lowercase",
    "capitalize"
  ];

  // Canvas background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const config = {
      gridSize: 20,
      lineWidth: 0.4,
      lineColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      waveSpeed: 0.004,
      waveHeight: 5,
      noiseScale: 0.005
    };

    const cols = Math.floor(width / config.gridSize) + 2;
    const rows = Math.floor(height / config.gridSize) + 2;
    const points: any[] = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        points.push({
          x: x * config.gridSize,
          y: y * config.gridSize,
          originX: x * config.gridSize,
          originY: y * config.gridSize
        });
      }
    }

    const noise = (x: number, y: number) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      return Math.sin(X * 0.1 + Y * 0.1) * Math.cos(X * 0.11 + Y * 0.09) * 0.5 + 0.5;
    };

    let animationTime = 0;
    let animationFrameId: number;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      animationTime += config.waveSpeed;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const noiseX = noise(point.originX * config.noiseScale, point.originY * config.noiseScale + animationTime);
        const noiseY = noise(point.originX * config.noiseScale + animationTime, point.originY * config.noiseScale);
        point.x = point.originX + (noiseX * 2 - 1) * config.waveHeight;
        point.y = point.originY + (noiseY * 2 - 1) * config.waveHeight;
      }

      ctx.beginPath();
      ctx.strokeStyle = config.lineColor;
      ctx.lineWidth = config.lineWidth;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const index = y * cols + x;
          const point = points[index];
          const nextPoint = points[index + 1];
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
        }
      }

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows - 1; y++) {
          const index = y * cols + x;
          const point = points[index];
          const nextPoint = points[index + cols];
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
        }
      }

      ctx.stroke();
      animationFrameId = requestAnimationFrame(animate);
    }

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newCols = Math.floor(width / config.gridSize) + 2;
      const newRows = Math.floor(height / config.gridSize) + 2;
      points.length = 0;

      for (let y = 0; y < newRows; y++) {
        for (let x = 0; x < newCols; x++) {
          points.push({
            x: x * config.gridSize,
            y: y * config.gridSize,
            originX: x * config.gridSize,
            originY: y * config.gridSize
          });
        }
      }
    }

    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(animate);

    // GSAP Animations
    if (bioTextRef.current) {
      const spanElements = bioTextRef.current.querySelectorAll('span');
      if (spanElements.length > 0) {
        gsap.fromTo(
          spanElements,
          { 
            opacity: 0,
            y: 20 
          },
          { 
            opacity: 1, 
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bioTextRef.current,
              start: "top 80%"
            }
          }
        );
      }
    }

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [darkMode]);

  // Setup ScrollTrigger for text straps with locomotive-like effect
  useEffect(() => {
    // Clear any existing ScrollTrigger instances first
    ScrollTrigger.getAll()
      .filter(trigger => trigger.vars.id?.includes('textStrap'))
      .forEach(trigger => trigger.kill());
    
    // Design text strap animation
    const designStrapEl = document.querySelector('.design-strap-container');
    if (designStrapEl) {
      const designText = designStrapEl.querySelector('.scroll-text');
      if (designText) {
        const designTextWidth = designText.getBoundingClientRect().width;
        
        const designClone = designText.cloneNode(true);
        designStrapEl.appendChild(designClone);
        
        gsap.set(designClone, { x: designTextWidth });
        
        gsap.to([designText, designClone], {
          x: `-=${designTextWidth}`,
          ease: "none",
          scrollTrigger: {
            id: "textStrap-design",
            trigger: designStrapEl,
            start: "top bottom",
            end: "+=" + (designTextWidth * 2),
            scrub: 0.5,
            invalidateOnRefresh: true,
          }
        });
      }
    }
    
    // Code text strap animation
    const codeStrapEl = document.querySelector('.code-strap-container');
    if (codeStrapEl) {
      const codeText = codeStrapEl.querySelector('.scroll-text');
      if (codeText) {
        const codeTextWidth = codeText.getBoundingClientRect().width;
        
        const codeClone = codeText.cloneNode(true);
        codeStrapEl.appendChild(codeClone);
        
        gsap.set(codeText, { x: -codeTextWidth * 0.3 });
        gsap.set(codeClone, { x: codeTextWidth * 0.4 });
        
        gsap.to([codeText, codeClone], {
          x: `+=${codeTextWidth * 0.7}`,
          ease: "none",
          scrollTrigger: {
            id: "textStrap-code",
            trigger: codeStrapEl,
            start: "top bottom",
            end: "+=" + (codeTextWidth * 2),
            scrub: 0.5,
            invalidateOnRefresh: true,
          }
        });
      }
    }

    return () => {
      // Clean up ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll()
        .filter(trigger => trigger.vars.id?.includes('textStrap'))
        .forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={`w-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Navigation */}
      <GooeyNavigation />

      {/* Hero Section with Galaxy Background */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Dot Grid Background */}
        <div className="absolute inset-0 z-0">
          <DotGrid 
            dotSize={5}
            gap={15}
            baseColor="#1E1E37" /* R-30, G-30, B-55 */
            activeColor="#5227FF" /* R-82, G-39, B-255 */
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-1 opacity-40"
        ></canvas>
        
        <div
          ref={glowEffectRef}
          className="absolute bottom-4 left-0 right-0 flex justify-center items-center pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <div className="w-[90vw] h-[35vh] rounded-full" 
            style={{ 
              background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(200,200,200,0.05) 40%, rgba(255,255,255,0) 70%)',
              transform: 'translateY(25%)',
              filter: 'blur(50px)',
              opacity: 0.7
            }}>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            ref={subtitleRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-4 text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium"
          >
            <RotatingText 
              text={[
                "Hello",        // English
                "नमस्ते",      // Hindi
                "Hola"          // Spanish
              ]} 
              styles={["font-medium", "font-semibold", "font-bold", "italic", "font-normal"]} 
              interval={2500} 
            />, I'm
          </motion.div>
          
          <motion.h1
            ref={nameRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">
              Rohit <RotatingText 
                text={[
                  "Sharma",           // English
                  "शर्मा",             // Hindi
                  "شرما",              // Urdu
                  "シャルマ",            // Japanese
                  "夏尔马",             // Chinese
                 // "샤르마",             // Korean
                  "Шарма",            // Russian
                 // "شارما",             // Arabic
                  "Σάρμα",            // Greek
                  "Sharma",           // German/French (same)
                   "შარმა",            // Georgian
                  // "ශර්මා"             // Sinhala
                ]} 
                styles={nameStyles} 
                interval={2500} 
              />
            </span>
          </motion.h1>
          
          <motion.div
            ref={bioTextRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="max-w-lg mx-auto text-xl md:text-2xl text-gray-200 font-light"
          >
            <span className="inline-block mr-2">Backend</span>
            <span className="inline-block mr-2 font-bold italic gradient-text">architect</span>
            <span className="inline-block mr-2">& Full-Stack</span>
            <span className="inline-block mr-2 font-bold italic gradient-text">engineer</span>
            <span className="inline-block">crafting scalable solutions.</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-10"
          >
            <a
              href="#about"
              className="
                inline-flex items-center justify-center
                w-12 h-12 rounded-full
                bg-gray-800 hover:bg-gray-700
                text-gray-300
                shadow-md transition-all duration-300 animate-bounce
              "
              style={{ animationDuration: '3s' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 13l5 5 5-5"></path>
                <path d="M7 6l5 5 5-5"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Scrolling Text Strap Section */}
      <section 
        className="bg-black py-6 overflow-hidden relative transform -rotate-[0.8deg]"
        style={{ 
          zIndex: 10,
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
        }}
      >
        <div className="design-strap-container" style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
          <div className="scroll-text">
            <h2 className="text-white font-bold italic text-4xl md:text-5xl lg:text-6xl">
              <span className="pastel-gradient">backend systems</span> that scale and perform • 
              <span className="pastel-gradient">backend systems</span> that scale and perform • 
              <span className="pastel-gradient">backend systems</span> that scale and perform • 
              <span className="pastel-gradient">backend systems</span> that scale and perform • 
            </h2>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-70"></div>
      </section>
      
      {/* White Scrolling Text Strap for Code */}
      <section 
        className="bg-gray-800 py-6 overflow-hidden relative transform rotate-[1.2deg] -mt-3 border-t border-b border-gray-700"
        style={{ 
          zIndex: 5,
          boxShadow: '0 -4px 15px rgba(0,0,0,0.2), 0 4px 15px rgba(0,0,0,0.2)'
        }}
      >
        <div className="code-strap-container" style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
          <div className="scroll-text">
            <h2 className="text-gray-200 font-mono text-3xl md:text-4xl lg:text-5xl">
              <span className="terminal-code">full-stack solutions</span> that deliver results ; 
              <span className="terminal-code">full-stack solutions</span> that deliver results ; 
              <span className="terminal-code">full-stack solutions</span> that deliver results ; 
              <span className="terminal-code">full-stack solutions</span> that deliver results ;
            </h2>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
      </section>

      {/* Clear separation between Galaxy section and Dot Grid sections */}
      <div className="h-1 w-full bg-transparent"></div>

      {/* Dot Grid Background for remaining sections */}
      <div className="relative" style={{ marginTop: "-1px" }}>
        {/* The DotGridBackgroundImproved is positioned to start from the About section */}
        <DotGridBackgroundImproved startFrom="#about" />

        {/* About Section */}
        <section id="about" className="relative min-h-screen py-20 z-10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <h2 className="font-bold text-4xl md:text-5xl lg:text-7xl mb-12 text-gray-100 leading-tight">
              Hey I'm <span className="font-bold italic">Rohit Sharma</span> - I architect <span className="font-bold italic gradient-text">scalable systems</span> and craft <span className="font-mono font-thin">production-ready code</span>
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed mx-auto">
              I <span className="italic">engineer with precision</span> and <span className="font-mono font-thin">code</span> with efficiency - building robust backend architectures, seamless full-stack applications, and real-time systems that handle thousands of users. No shortcuts, no compromises - just <span className="italic">scalable solutions, optimized performance</span>, and a software engineer's expertise to deliver production-grade systems.
            </p>
          </div>
        </section>
        
        {/* Skills Section with higher z-index to appear above the grid */}
        <div className="relative z-10">
          <Skills />
        </div>

        {/* Featured Projects Section - Infinite Menu */}
        <section id="projects" className="relative py-20 z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-100">
                Featured <span className="font-bold italic gradient-text">Projects</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Interactive 3D showcase of production-scale systems built with <span className="font-mono font-medium text-purple-400">modern tech stacks</span>
              </p>
            </div>

            {/* Infinite Menu Container */}
            <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-xl overflow-hidden bg-black/20 border border-gray-700/30">
              <InfiniteMenu 
                items={[
                  {
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=900&fit=crop&crop=center',
                    link: 'https://github.com/rohitsharma/urja-sarthi',
                    title: 'Urja-Sarthi',
                    description: 'Real-time energy monitoring platform with FastAPI backend processing 10K+ data sources. Reduced latency by 45% with WebSockets and AWS scaling.'
                  },
                  {
                    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&h=900&fit=crop&crop=center',
                    link: 'https://github.com/rohitsharma/indra-digital-twin',
                    title: 'Indra Digital Twin',
                    description: 'Enterprise digital twin system using Node.js microservices managing 5K+ assets. Achieved 50% operational efficiency gains through optimized APIs.'
                  },
                  {
                    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=900&fit=crop&crop=center',
                    link: 'https://github.com/rohitsharma/collabcode',
                    title: 'CollabCode Platform',
                    description: 'Real-time collaborative coding platform with WebSockets and Redis. Scaled to 3K+ concurrent users with 35% reduced execution delays.'
                  },
                  {
                    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=900&fit=crop&crop=center',
                    link: 'https://github.com/rohitsharma/ecommerce-backend',
                    title: 'E-Commerce Backend',
                    description: 'Microservices ecosystem with Django and PostgreSQL handling 10K+ products. Boosted transaction speeds by 40% via query optimizations.'
                  },
                  {
                    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=900&h=900&fit=crop&crop=center',
                    link: 'https://github.com/rohitsharma/patient-management',
                    title: 'Patient Management',
                    description: 'Full-stack healthcare platform with Express.js and MongoDB. Automated scheduling for 1K+ users, cutting admin workload by 40%.'
                  }
                ]}
                scale={1.2}
              />
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <div className="text-3xl font-bold text-purple-400 mb-2">5+</div>
                <div className="text-gray-400 text-sm">Production Systems</div>
              </div>
              <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <div className="text-3xl font-bold text-blue-400 mb-2">10K+</div>
                <div className="text-gray-400 text-sm">Users Served</div>
              </div>
              <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <div className="text-3xl font-bold text-green-400 mb-2">99.99%</div>
                <div className="text-gray-400 text-sm">Uptime</div>
              </div>
              <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <div className="text-3xl font-bold text-orange-400 mb-2">45%</div>
                <div className="text-gray-400 text-sm">Performance Boost</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-20 z-10 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-100 mb-6">
              Ready to build something <span className="font-bold italic gradient-text">scalable</span>?
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Let's architect backend systems and full-stack solutions that handle real-world scale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:rohittsharmaa2005@gmail.com" 
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold text-lg hover:opacity-90 transition-opacity duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-300"
              >
                Get In Touch
              </a>
              <a 
                href="https://github.com/rohitsharma" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-full bg-gray-800 text-white font-semibold text-lg hover:bg-gray-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-300"
              >
                View GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Footer Section - Gen Z Style */}
        <footer className="relative py-16 z-10 bg-black border-t border-gray-800">
          <div className="container mx-auto px-4">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              
              {/* Left - Personal Brand */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Rohit <span className="gradient-text">Sharma</span>
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Full-Stack Software Engineer crafting scalable solutions that actually work 💯
                  </p>
                </div>
                
                {/* Status Badge */}
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Available for opportunities</span>
                </div>

                {/* Quick Stats */}
                <div className="flex space-x-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-400">5+</div>
                    <div className="text-xs text-gray-500">Production Systems</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-400">10K+</div>
                    <div className="text-xs text-gray-500">Users Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-400">99.99%</div>
                    <div className="text-xs text-gray-500">Uptime</div>
                  </div>
                </div>
              </div>

              {/* Center - Quick Links */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                <div className="grid grid-cols-2 gap-3">
                  <a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">About</a>
                  <a href="#skills" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Skills</a>
                  <a href="#projects" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Projects</a>
                  <a href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Contact</a>
                  <a href="/about" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Full About</a>
                  <a href="mailto:rohittsharmaa2005@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Email</a>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Current Stack:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">FastAPI</span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">React</span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">PostgreSQL</span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">Docker</span>
                  </div>
                </div>
              </div>

              {/* Right - Social & Contact */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Let's Connect</h4>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/rohitsharma" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://linkedin.com/in/rohitsharma" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="mailto:rohittsharmaa2005@gmail.com"
                    className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>

                {/* Fun Fact */}
                <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                  <p className="text-xs text-gray-500 mb-1">Fun Fact 🚀</p>
                  <p className="text-sm text-gray-300">
                    I debug with console.log() and I'm not ashamed of it
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm text-gray-400">Delhi, India 🇮🇳</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-500">
                  © 2025 Rohit Sharma. Built with ❤️ and lots of ☕
                </p>
              </div>
              
              <div className="flex items-center space-x-6">
                <span className="text-xs text-gray-600">Made with</span>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">Next.js</span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">TypeScript</span>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs">Tailwind</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
