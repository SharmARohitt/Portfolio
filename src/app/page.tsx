'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import DotGrid from '@/components/DotGrid';
import GooeyNavigation from '@/components/GooeyNavigation';
import Skills from '@/components/Skills';
import ProjectGallery from '@/components/ProjectGallery';
import Testimonials from '@/components/Testimonials';
import DotGridBackgroundImproved from '@/components/DotGridBackgroundImproved';
import RotatingText from '@/components/ui/RotatingText';
import Stack from '@/components/Stack';
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
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
            <span className="inline-block mr-2">Pixels</span>
            <span className="inline-block mr-2 font-bold italic gradient-text">obey</span>
            <span className="inline-block mr-2">me & </span>
            <span className="inline-block mr-2">Logic</span>
            <span className="inline-block mr-2 font-bold italic gradient-text">serves</span>
            <span className="inline-block">me.</span>
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
              <span className="pastel-gradient">design</span> that makes people give a damn • 
              <span className="pastel-gradient">design</span> that makes people give a damn • 
              <span className="pastel-gradient">design</span> that makes people give a damn • 
              <span className="pastel-gradient">design</span> that makes people give a damn • 
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
              <span className="terminal-code">code</span> that brings it to life ; 
              <span className="terminal-code">code</span> that brings it to life ; 
              <span className="terminal-code">code</span> that brings it to life ; 
              <span className="terminal-code">code</span> that brings it to life ;
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
              Hey I'm <span className="font-bold italic">Rohit Sharma</span> - I make <span className="font-bold italic gradient-text">pixels</span> meet <span className="font-mono font-thin">code</span>
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed mx-auto">
              I <span className="italic">design with intent</span> and <span className="font-mono font-thin">code</span> with efficiency - crafting sleek, intuitive experiences that are as smooth to use as they are to look at. No guesswork, no mess - just <span className="italic">clean design, seamless functionality</span>, and a developer's touch to bring it all to life.
            </p>
          </div>
        </section>
        
        {/* Skills Section with higher z-index to appear above the grid */}
        <div className="relative z-10">
          <Skills />
        </div>

        {/* Latest Projects Section - Restructured */}
        <section id="projects" className="relative py-20 z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-100">
                Latest <span className="font-bold italic gradient-text">Projects</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Showcasing <span className="font-mono font-medium text-purple-400">25+ projects</span> across full-stack development, AI/ML, and system design
              </p>
            </div>

            {/* Main Projects Layout - Left Text, Right Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-start">
              
              {/* Left Side - Recent Projects Text List */}
              <div className="space-y-8">
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-8">
                    Recent <span className="gradient-text">Development</span>
                  </h3>
                </div>

                {/* Project List */}
                <div className="space-y-6">
                  
                  {/* Project 1 */}
                  <div className="group p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-semibold text-gray-100 group-hover:text-purple-400 transition-colors">
                        AI-Powered Task Manager
                      </h4>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      Full-stack application with AI task prioritization, real-time collaboration, and intelligent scheduling. Built with Next.js, TypeScript, and OpenAI integration.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">Next.js</span>
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">TypeScript</span>
                      <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-1 rounded-full">OpenAI</span>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">MongoDB</span>
                    </div>
                  </div>

                  {/* Project 2 */}
                  <div className="group p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-semibold text-gray-100 group-hover:text-orange-400 transition-colors">
                        Computer Vision Analytics
                      </h4>
                      <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">ML</span>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      Real-time object detection and tracking system using TensorFlow and OpenCV. Deployed on AWS with scalable microservices architecture.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">TensorFlow</span>
                      <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">OpenCV</span>
                      <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">Python</span>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">AWS</span>
                    </div>
                  </div>

                  {/* Project 3 */}
                  <div className="group p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">
                        Blockchain Trading Platform
                      </h4>
                      <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full">Web3</span>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      Decentralized trading platform with smart contracts, real-time price feeds, and portfolio analytics. React frontend with Ethereum integration.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">React</span>
                      <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full">Solidity</span>
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">Web3.js</span>
                      <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">Node.js</span>
                    </div>
                  </div>

                  {/* Project 4 */}
                  <div className="group p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-semibold text-gray-100 group-hover:text-pink-400 transition-colors">
                        Mobile Fitness Companion
                      </h4>
                      <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full">Mobile</span>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      Cross-platform fitness app with AI-powered workout plans, nutrition tracking, and social features. Built with React Native and Firebase.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">React Native</span>
                      <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">Firebase</span>
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">TypeScript</span>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Node.js</span>
                    </div>
                  </div>

                  {/* Project 5 */}
                  <div className="group p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-semibold text-gray-100 group-hover:text-green-400 transition-colors">
                        DevOps Automation Suite
                      </h4>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">DevOps</span>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      Complete CI/CD pipeline with automated testing, deployment, and monitoring. Kubernetes orchestration with Docker containerization.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">Docker</span>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Kubernetes</span>
                      <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">Jenkins</span>
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">AWS</span>
                    </div>
                  </div>

                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-700/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">25+</div>
                    <div className="text-gray-400 text-sm">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">15+</div>
                    <div className="text-gray-400 text-sm">Technologies</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Stack Component */}
              <div className="lg:sticky lg:top-20">
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
                    Interactive <span className="gradient-text">Portfolio</span>
                  </h3>
                </div>
                <div className="flex justify-center">
                  <Stack 
                    cardDimensions={{ width: 650, height: 420 }}
                    sensitivity={180}
                    animationConfig={{ stiffness: 280, damping: 25 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section - New Component */}
        <div className="relative z-10">
          <ProjectGallery />
        </div>

        {/* Testimonials Section */}
        <div className="relative z-10">
          <Testimonials />
        </div>
        
        {/* Contact Section */}
        <section id="contact" className="relative min-h-screen py-20 z-10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-100 mb-6">
              Done with my <span className="font-bold italic gradient-text">designer</span> side?
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Explore my developer portfolio to see the code behind the designs
            </p>
            <a 
              href="https://rohitsharma.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold text-lg hover:opacity-90 transition-opacity duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-300"
            >
              View Developer Portfolio
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
