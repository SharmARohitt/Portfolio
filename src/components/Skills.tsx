'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { 
  SiMongodb, SiReact, SiExpress, SiNodedotjs, 
  SiNextdotjs, SiTypescript, SiJavascript, SiPython, 
  SiHtml5, SiCss3, SiGit, SiGithub,
  SiGooglecloud, SiTensorflow
} from 'react-icons/si';
import { useTheme } from '../contexts/ThemeContext';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Skills = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSkill, setActiveSkill] = useState<{ icon: any; name: string; color: string } | null>(null);

  const skills = [
    { icon: SiMongodb, name: "MongoDB", color: "#4DB33D" },
    { icon: SiReact, name: "React.js", color: "#61DAFB" },
    { icon: SiExpress, name: "Express.js", color: "#000000" },
    { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
    { icon: SiNextdotjs, name: "NEXT.js", color: "#000000" },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
    { icon: SiPython, name: "Python", color: "#3776AB" },
    { icon: SiGooglecloud, name: "Cloud Computing", color: "#4285F4" },
    { icon: SiHtml5, name: "HTML5", color: "#E34F26" },
    { icon: SiCss3, name: "CSS3", color: "#1572B6" },
    { icon: SiTensorflow, name: "AI-ML", color: "#FF6F00" },
    { icon: SiGit, name: "Git", color: "#F05032" },
    { icon: SiGithub, name: "GitHub", color: "#181717" }
  ];

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const section = sectionRef.current;
    const circle = circleRef.current;
    const heading = headingRef.current;
    const skillElements = skillsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !circle || !heading || skillElements.length === 0) return;

    // Initial setup - hide skills and set up the heading
    gsap.set(skillElements, { 
      autoAlpha: 0,
      scale: 0.5,
      transformOrigin: "center center"
    });
    
    // Position skills exactly ON the orbital ring border
    skillsRef.current.forEach((el, i) => {
      if (el) {
        const angle = (i * (2 * Math.PI / skills.length));
        const radius = 40; // 40% - position icons so they intersect with the ring border
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        
        gsap.set(el, {
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)', // Center the icon exactly on the calculated position
        });
      }
    });
    
    gsap.set(heading, {
      autoAlpha: 0,
      scale: 0.8
    });

    // Create a timeline for the animation with even slower animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=4000", // Significantly increase scroll distance for slower animation
        pin: true,
        pinSpacing: true,
        scrub: 1.5, // Increase scrub value for slower animation
      }
    });

    // Animate the heading in
    tl.to(heading, {
      autoAlpha: 1,
      scale: 1,
      duration: 2, // Longer duration for slower animation
      ease: "power2.out"
    });

    // Add a longer pause before starting skills animation
    tl.to({}, { duration: 1 });

    // Animate skills one by one with longer durations
    skillElements.forEach((skill, index) => {
      // Highlight each skill individually
      tl.to(skill, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.5, // Even longer duration
        ease: "back.out(1.5)",
        onStart: () => setActiveSkill(skills[index]), // Set active skill when animation starts
        onReverseComplete: () => {
          // If scrolling back up, set the previous skill as active
          if (index > 0) {
            setActiveSkill(skills[index - 1]);
          } else {
            setActiveSkill(null);
          }
        }
      });
      
      // Add a longer pause after each skill for the info to be visible
      tl.to({}, { duration: 1.2 }); 
    });
    
    // Scale the entire circle slightly at the end
    tl.to(circle, {
      scale: 1.05,
      duration: 1.5,
      ease: "sine.inOut"
    });

    return () => {
      // Clean up
      setActiveSkill(null);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`relative h-screen w-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center overflow-hidden transition-colors duration-300`}
    >
      {/* Background gradient effects */}
      <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-950' : 'bg-gradient-to-b from-gray-50 to-gray-100'} opacity-70`}></div>
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute -left-[10%] top-[20%] w-[40%] h-[40%] rounded-full ${darkMode ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-r from-blue-100 to-purple-100'} blur-3xl opacity-30 animate-pulse`}></div>
        <div className={`absolute right-[5%] bottom-[10%] w-[35%] h-[35%] rounded-full ${darkMode ? 'bg-gradient-to-r from-orange-900/20 to-red-900/20' : 'bg-gradient-to-r from-orange-100 to-red-100'} blur-3xl opacity-20 animate-pulse`} style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div 
        ref={circleRef}
        className="relative w-[80vmin] h-[80vmin] max-w-[800px] max-h-[800px]"
      >
        {/* Center heading */}
        <div 
          ref={headingRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center w-[60%]"
        >
          <h2 className={`font-serif font-bold text-3xl md:text-4xl lg:text-5xl ${darkMode ? 'text-gray-100' : 'text-gray-800'} mb-2`}>
            my <span className="italic">expertise</span>
          </h2>
          {!activeSkill && (
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm md:text-base mt-2 opacity-80`}>Scroll to explore my skills</p>
          )}
        </div>
        
        {/* Orbital ring (80% of container width/height) */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/70'}`}></div>
        
        {/* Skills in a circle */}
        {skills.map((skill, index) => {
          // Calculate position on circle - radius should match exactly 40% (half of 80% ring)
          const angle = (index * (2 * Math.PI / skills.length));
          const radius = 40; // 40% - exactly half of the 80% ring diameter to place icons ON the ring
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          
          return (
            <div
              key={skill.name}
              ref={(el) => { skillsRef.current[index] = el }}
              className={`absolute skill-item transition-all duration-300 flex flex-col items-center ${activeSkill?.name === skill.name ? 'active' : ''}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)', // Perfect centering on the ring
              }}
            >
              <div className="relative group">
                <div 
                  className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-500`}
                  style={{ 
                    boxShadow: activeSkill?.name === skill.name ? `0 0 20px ${skill.color}80` : '0 4px 12px rgba(0,0,0,0.1)',
                    transform: activeSkill?.name === skill.name ? 'scale(1.25)' : 'scale(1)',
                    border: activeSkill?.name === skill.name ? `2px solid ${skill.color}` : 'none',
                  }}
                >
                  <skill.icon 
                    style={{ color: skill.color }} 
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" 
                  />
                </div>
                
                {/* Animated glow effect for active skill */}
                {activeSkill?.name === skill.name && (
                  <div 
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      boxShadow: `0 0 25px 8px ${skill.color}40`,
                      animation: 'pulse-glow 2s ease-in-out infinite'
                    }}
                  ></div>
                )}
                
                {/* Skill name label positioned next to icon */}
                {activeSkill?.name === skill.name && (
                  <div 
                    className="absolute whitespace-nowrap font-bold pointer-events-none"
                    style={{
                      // Position the label based on which quadrant the icon is in
                      left: x < 50 ? 'calc(100% + 8px)' : 'auto',
                      right: x >= 50 ? 'calc(100% + 8px)' : 'auto',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: skill.color,
                      textShadow: darkMode 
                        ? '0 0 10px rgba(0,0,0,0.8), 0 0 5px rgba(0,0,0,0.9)' 
                        : '0 0 10px rgba(255,255,255,0.8), 0 0 5px rgba(255,255,255,0.9)',
                      fontSize: 'clamp(0.7rem, 2vw, 1rem)',
                      fontWeight: 600,
                    }}
                  >
                    {skill.name}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(45deg, #FF3366, #854DFF, #5B7FFF);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .skill-item.active {
          z-index: 20;
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
