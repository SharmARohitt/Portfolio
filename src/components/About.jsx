'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';
import ProfileCard from './ProfileCard';
import GooeyNavigation from './GooeyNavigation';
// Import necessary icons - using the correct exports
import { 
  FaPalette, FaCode, FaSearch, FaMobile, 
  FaPencilAlt, FaLayerGroup, FaUsers, FaCubes, 
  FaPython, FaDatabase, FaGitAlt, FaLinux, FaFigma
} from 'react-icons/fa';
import { BiLogoTypescript } from 'react-icons/bi';
import { TbBrandNextjs } from 'react-icons/tb';
import { MdDesignServices, MdColorLens, MdDevices } from 'react-icons/md';
import { SiTensorflow, SiScikitlearn, SiOpenai, SiKaggle, SiJupyter, SiNumpy, SiAdobe, SiSketch, SiFigma, SiFramer, SiCanva } from 'react-icons/si';
import { AiOutlineInteraction, AiOutlineBgColors } from 'react-icons/ai';
import { HiOutlineColorSwatch, HiOutlineTemplate } from 'react-icons/hi';
import { RiPaletteLine, RiUserSearchLine, RiSmartphoneLine, RiPaintBrushLine, RiBrushLine, RiTeamLine, RiMouseLine, RiLayout4Line } from 'react-icons/ri';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function About() {
  const { darkMode } = useTheme();
  const headerRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const canvasRef = useRef(null);
  const profileImgRef = useRef(null);
  const bioSectionRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const educationSectionRef = useRef(null);
  
  // State to manage which skills tab is active
  const [activeSkillsTab, setActiveSkillsTab] = useState('design');

  // Canvas background effect - similar to home page
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight * 0.8; // Limit height to top section

    const config = {
      gridSize: 25,
      lineWidth: 0.4,
      lineColor: darkMode ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
      waveSpeed: 0.003,
      waveHeight: 4,
      noiseScale: 0.004
    };

    const cols = Math.floor(width / config.gridSize) + 2;
    const rows = Math.floor(height / config.gridSize) + 2;
    const points = [];

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

    const noise = (x, y) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      return Math.sin(X * 0.1 + Y * 0.1) * Math.cos(X * 0.11 + Y * 0.09) * 0.5 + 0.5;
    };

    let animationTime = 0;
    let animationFrameId;

    function animate() {
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
      height = canvas.height = window.innerHeight * 0.8;
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

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  // GSAP animations
  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline();
    
    tl.fromTo(headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
    
    tl.fromTo(profileImgRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      "-=0.8"
    );
    
    tl.fromTo(bioSectionRef.current.querySelectorAll('h2, p'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
      "-=0.9"
    );

    // Skills section animation
    ScrollTrigger.create({
      trigger: skillsSectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(skillsSectionRef.current.querySelectorAll('.skill-item'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
        );
      },
      once: true
    });

    // Education & Experience section animation
    ScrollTrigger.create({
      trigger: educationSectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(educationSectionRef.current.querySelectorAll('.timeline-item'),
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
        );
      },
      once: true
    });

    return () => {
      // Clean up animations
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      {/* Navigation */}
      <GooeyNavigation />

      {/* Hero section with canvas background */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
        ></canvas>
        
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 
            ref={headerRef}
            className="font-serif font-bold text-5xl md:text-7xl lg:text-8xl text-gray-900 dark:text-gray-100"
          >
            About <span className="font-serif font-bold italic gradient-text">Me</span>
          </h1>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-[20vh] opacity-20 pointer-events-none" 
          style={{
            background: darkMode
              ? 'linear-gradient(to top, rgba(50,50,50,0.3), rgba(50,50,50,0))'
              : 'linear-gradient(to top, rgba(200,200,200,0.3), rgba(255,255,255,0))',
            zIndex: 1
          }}>
        </div>
      </section>

      {/* About me section with profile and bio */}
      <section 
        ref={aboutSectionRef}
        className={`container mx-auto px-4 py-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div 
            ref={profileImgRef}
            className="relative mx-auto md:mx-0 w-full max-w-md flex justify-center"
          >
            <ProfileCard
              name="Rohit Sharma"
              title="Full Stack Developer"
              handle="rohitsharma"
              status="Available for work"
              contactText="Contact Me"
              avatarUrl="/pfp.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => {
                // Scroll to contact section or open email
                window.location.href = 'mailto:rohitsharma@example.com';
              }}
            />
          </div>
          
          <div ref={bioSectionRef}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">Hi, I'm <span className="font-serif font-bold italic gradient-text">Rohit Sharma</span></h2>
            <p className={`text-lg md:text-xl leading-relaxed mb-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Designer by eye, developer by logic—basically, the <span className="font-medium relative px-1">
                <span className="relative z-10">Swiss Army knife</span>
                <span className={`absolute inset-0 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded opacity-30 transform -skew-x-3`}></span>
              </span> of the web. I craft <span className="italic">sleek, intuitive UIs</span> and back them up with <span className="font-mono font-medium">clean, efficient code</span>. If bad design hurts your soul and buggy code makes you cringe, we're already on the same page. Let's build something <span className="font-medium text-pink-500 dark:text-pink-400">beautiful</span> and <span className="font-medium text-purple-500 dark:text-purple-400">functional</span>—because why settle for less?
            </p>
            <div className="mt-8 mb-2 relative">
              <p className={`text-lg md:text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                My one motto - <span className="font-serif font-bold italic text-xl md:text-2xl xl:text-3xl gradient-text" style={{ letterSpacing: "-0.02em", textShadow: "0 2px 5px rgba(0, 0, 0, 0.12)" }}>Design what makes people give a damn</span>
              </p>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5 rounded-lg blur-md -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills section */}
      <section 
        ref={skillsSectionRef}
        className={`py-24 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-900 dark:text-gray-100">
            My <span className="font-serif font-bold italic gradient-text">Skills</span>
          </h2>
          
          {/* Skill Type Toggle Switch */}
          <div className="max-w-md mx-auto mb-16">
            <div className={`p-1 rounded-full flex items-center relative ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              {/* Active tab background slider - darkened */}
              <div 
                className={`absolute top-1 bottom-1 w-1/2 ${activeSkillsTab === 'design' ? 'left-1' : 'left-[calc(50%)]'} 
                  rounded-full transition-all duration-300 ease-in-out z-0 
                  ${darkMode ? 'bg-gray-800' : 'bg-gray-400'}`}
              ></div>
              
              {/* Design Tab */}
              <button 
                onClick={() => setActiveSkillsTab('design')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-medium text-sm z-10 transition-colors duration-300 ${
                  activeSkillsTab === 'design' ? 'text-white' : `${darkMode ? 'text-gray-400' : 'text-gray-600'}`
                }`}
              >
                <FaPalette className="text-lg" />
                <span>Design Skills</span>
              </button>
              
              {/* Core SDE Skills Tab */}
              <button 
                onClick={() => setActiveSkillsTab('development')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-medium text-sm z-10 transition-colors duration-300 ${
                  activeSkillsTab === 'development' ? 'text-white' : `${darkMode ? 'text-gray-400' : 'text-gray-600'}`
                }`}
              >
                <FaCode className="text-lg" />
                <span>Core SDE Skills</span>
              </button>
            </div>
          </div>
          
          {/* Design Skills */}
          <div className={`transition-all duration-500 ease-in-out ${activeSkillsTab === 'design' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 absolute -z-10'}`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <RiPaletteLine className="text-xl text-pink-400" />
                  </div>
                  <div className="font-normal text-center">UI Design</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <RiUserSearchLine className="text-xl text-blue-400" />
                  </div>
                  <div className="font-normal text-center">UX Research</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <RiSmartphoneLine className="text-xl text-green-400" />
                  </div>
                  <div className="font-normal text-center">Prototyping</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <RiPaintBrushLine className="text-xl text-purple-400" />
                  </div>
                  <div className="font-normal text-center">Visual Design</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <RiBrushLine className="text-xl text-orange-400" />
                  </div>
                  <div className="font-normal text-center">Brand Identity</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <RiTeamLine className="text-xl text-cyan-400" />
                  </div>
                  <div className="font-normal text-center">User Testing</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <RiMouseLine className="text-xl text-indigo-400" />
                  </div>
                  <div className="font-normal text-center">Interaction Design</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <RiLayout4Line className="text-xl text-teal-400" />
                  </div>
                  <div className="font-normal text-center">Design Systems</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Development Skills */}
          <div className={`transition-all duration-500 ease-in-out ${activeSkillsTab === 'development' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 absolute -z-10'}`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaPython className="text-xl text-yellow-400" />
                  </div>
                  <div className="font-normal text-center">Python</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <SiTensorflow className="text-xl text-orange-500" />
                  </div>
                  <div className="font-normal text-center">TensorFlow</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <SiScikitlearn className="text-xl text-blue-400" />
                  </div>
                  <div className="font-normal text-center">Scikit-Learn</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaCubes className="text-xl text-purple-400" />
                  </div>
                  <div className="font-normal text-center">Data Structures</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaCode className="text-xl text-green-400" />
                  </div>
                  <div className="font-normal text-center">Algorithms</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <SiOpenai className="text-xl text-teal-400" />
                  </div>
                  <div className="font-normal text-center">Machine Learning</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaDatabase className="text-xl text-red-400" />
                  </div>
                  <div className="font-normal text-center">Database Systems</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <SiJupyter className="text-xl text-orange-400" />
                  </div>
                  <div className="font-normal text-center">Jupyter</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <SiNumpy className="text-xl text-blue-300" />
                  </div>
                  <div className="font-normal text-center">NumPy</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaGitAlt className="text-xl text-orange-600" />
                  </div>
                  <div className="font-normal text-center">Git</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaLinux className="text-xl text-yellow-500" />
                  </div>
                  <div className="font-normal text-center">Linux</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Education & Experience Section */}
      <section 
        ref={educationSectionRef}
        className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-900 dark:text-gray-100">
            Education & <span className="font-serif font-bold italic gradient-text">Experience</span>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-10">
            <div className={`timeline-item relative pl-10 pb-10 ${darkMode ? 'border-l-2 border-gray-700' : 'border-l-2 border-gray-300'}`}>
              <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${darkMode ? 'bg-green-500' : 'bg-green-400'}`}></div>
              <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-gray-100">Founder</h3>
              <p className={`mb-3 font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>TactNova · Jun 2025 - Present</p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Founded and leading TactNova, driving innovation and strategic development. Building cutting-edge solutions and establishing the company's technical foundation and vision.
              </p>
            </div>
            
            <div className={`timeline-item relative pl-10 pb-10 ${darkMode ? 'border-l-2 border-gray-700' : 'border-l-2 border-gray-300'}`}>
              <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
              <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-gray-100">Internship Trainee</h3>
              <p className={`mb-3 font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Inventronics · Jan 2025 - Mar 2025 · 3 months</p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Gained hands-on experience in technology solutions and product development. Worked on-site in Gurugram, Haryana, contributing to innovative projects and learning industry best practices.
              </p>
              <span className={`inline-block px-3 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                On-site · Gurugram, Haryana, India
              </span>
            </div>
            
            <div className={`timeline-item relative pl-10 pb-10 ${darkMode ? 'border-l-2 border-gray-700' : 'border-l-2 border-gray-300'}`}>
              <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${darkMode ? 'bg-orange-500' : 'bg-orange-400'}`}></div>
              <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-gray-100">Mentor</h3>
              <p className={`mb-3 font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Social Winter of Code (SWOC) · Dec 2024 - Mar 2025 · 4 months</p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Mentored aspiring developers in open-source contributions during SWOC. Guided participants through coding challenges, project development, and best practices in collaborative software development.
              </p>
            </div>
            
            <div className={`timeline-item relative pl-10 pb-10 ${darkMode ? 'border-l-2 border-gray-700' : 'border-l-2 border-gray-300'}`}>
              <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${darkMode ? 'bg-purple-500' : 'bg-purple-400'}`}></div>
              <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-gray-100">Software Development Intern</h3>
              <p className={`mb-3 font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Prodigy InfoTech · Nov 2024 - Dec 2024 · 2 months</p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Developed software solutions and gained experience in full-stack development. Contributed to multiple projects while working remotely, enhancing technical skills and professional development practices.
              </p>
              <span className={`inline-block px-3 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                Remote · Delhi, India
              </span>
            </div>
            
            <div className={`timeline-item relative pl-10 ${darkMode ? 'border-l-2 border-gray-700' : 'border-l-2 border-gray-300'}`}>
              <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${darkMode ? 'bg-indigo-500' : 'bg-indigo-400'}`}></div>
              <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-gray-100">Bachelor of Computer Science and Engineering</h3>
              <p className={`mb-3 font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Guru Gobind Singh Indraprastha University · 2022 - Present</p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Pursuing Computer Science and Engineering with focus on software development, artificial intelligence, and data structures. Actively involved in projects and technical communities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Style for gradient text and motto */}
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(45deg, #FF3366, #854DFF, #5B7FFF);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));
        }
        
        .motto-text {
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
      `}</style>
    </div>
  );
}

export default About;
