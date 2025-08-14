'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

const GooeyNavigation = () => {
  const { darkMode } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [viewport, setViewport] = useState('desktop');
  const navRef = useRef<HTMLDivElement>(null);
  const contactDropdownRef = useRef<HTMLDivElement>(null);
  
  // Check viewport size and track scroll position
  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewport('mobile');
      } else if (width < 1024) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };
    
    const handleScroll = () => {
      if (viewport === 'desktop') {
        const isScrolled = window.scrollY > 800; 
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
      }
    };
    
    checkViewport();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkViewport);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkViewport);
    };
  }, [scrolled, viewport]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target as Node)) {
        setContactOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contactDropdownRef, navRef]);
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (contactOpen) setContactOpen(false);
  };
  
  const toggleContact = () => {
    setContactOpen(!contactOpen);
  };

  // Contact dropdown component
  const ContactDropdown = () => (
    <div className={`absolute right-0 top-full mt-2 p-5 rounded-xl shadow-lg transition-all duration-300 backdrop-blur-md border border-gray-700 w-[260px] ${contactOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'} bg-gray-900/90`}>
      <div className="flex flex-col space-y-4">
        <h3 className="font-montserrat font-semibold text-lg mb-1">
          <span className="gradient-text">Contact Me</span>
        </h3>
        
        <div className="flex space-x-4">
          <a href="https://github.com/SharmARohitt" target="_blank" rel="noopener noreferrer" 
            className="social-link-nav">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span className="text-sm ml-1">GitHub</span>
          </a>
          
          <a href="https://www.linkedin.com/in/rohittshharmaaa/" target="_blank" rel="noopener noreferrer" 
            className="social-link-nav">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span className="text-sm ml-1">LinkedIn</span>
          </a>
        </div>
        
        <div className="font-mono text-sm text-gray-300">
          <a href="mailto:rohittsharmaa2005@gmail.com" className="flex items-center hover:text-gray-100 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            rohittsharmaa2005@gmail.com
          </a>
        </div>
        
        <div className="text-xs font-montserrat text-gray-400">
          Based in <span className="font-medium">India</span>
        </div>
      </div>
    </div>
  );

  // Mobile menu component
  const MobileMenu = () => (
    <div className={`absolute top-[70px] right-0 bg-gray-900/90 backdrop-blur-md rounded-lg shadow-lg p-4 transition-all duration-300 border border-gray-700 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
      <ul className="flex flex-col space-y-3 font-montserrat font-semibold text-sm">
        <li>
          <Link 
            href="/" 
            className={`block px-4 py-2 rounded-full transition-colors duration-300 ${
              isActive('/') 
                ? 'bg-white/10 text-gray-100' 
                : 'text-gray-200 hover:bg-white/5'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            href="/about" 
            className={`block px-4 py-2 rounded-full transition-colors duration-300 ${
              isActive('/about') 
                ? 'bg-white/10 text-gray-100' 
                : 'text-gray-200 hover:bg-white/5'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            About Me
          </Link>
        </li>
        <li>
          <div 
            className={`block px-4 py-2 rounded-full transition-colors duration-300 cursor-pointer
              ${contactOpen 
                ? 'bg-white/10 text-gray-100' 
                : 'text-gray-200 hover:bg-white/5'
              }`}
            onClick={toggleContact}
          >
            Contact Me
            <div className="mt-3 pl-2 border-l-2 border-gray-700">
              <div className="flex flex-col space-y-3">
                <a href="https://github.com/rohitsharma" target="_blank" rel="noopener noreferrer" 
                  className="flex items-center text-xs py-1 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  GitHub
                </a>
                <a href="https://linkedin.com/in/rohit-sharma" target="_blank" rel="noopener noreferrer" 
                  className="flex items-center text-xs py-1 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn
                </a>
                <a href="mailto:rohitsharma@gmail.com" 
                  className="flex items-center text-xs py-1 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );

  return (
    <div ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full mt-4 transition-all duration-500 ease-in-out">
      <nav className={`flex items-center px-4 h-[60px] transition-all duration-500 ease-in-out relative
        ${viewport !== 'desktop'
          ? 'w-[90vw] bg-black/10 backdrop-blur-md rounded-full shadow-sm border border-gray-700 justify-between' 
          : scrolled 
            ? 'w-[50vw] bg-black/10 backdrop-blur-md rounded-full shadow-sm border border-gray-700 justify-between' 
            : 'w-[80vw] bg-transparent justify-between'
        }`}>
        {/* Left section - Name and title */}
        <div className="flex flex-col justify-center">
          <Link href="/" className="group">
            <h1 className="font-bold text-md text-gray-100 transition-all duration-300 group-hover:text-pink-400">Rohit Sharma</h1>
            <p className="text-xs text-gray-400 font-light transition-all duration-300">Software Developer / AI Engineer</p>
          </Link>
        </div>
        
        {/* Middle section - Navigation pills - Centered with absolute positioning */}
        {viewport !== 'mobile' && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="bg-white/10 backdrop-blur-md rounded-full shadow-sm inline-flex items-center border border-gray-700 p-0.5">
              <ul className="flex font-semibold text-xs items-center">
                <li className="flex items-center">
                  <Link 
                    href="/" 
                    className={`inline-block px-4 py-2 rounded-full transition-colors duration-300 ${
                      isActive('/') 
                        ? 'bg-gray-800 text-gray-100 backdrop-blur-md' 
                        : 'text-gray-200 hover:bg-gray-800/70'
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link 
                    href="/about" 
                    className={`inline-block px-4 py-2 rounded-full transition-colors duration-300 ${
                      isActive('/about') 
                        ? 'bg-gray-800 text-gray-100 backdrop-blur-sm' 
                        : 'text-gray-200 hover:bg-gray-800/70'
                    }`}
                  >
                    About Me
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Right section - Contact dropdown on larger screens, Menu button on mobile */}
        <div className="flex items-center gap-2">
          {viewport === 'mobile' ? (
            <>
              <button 
                onClick={toggleMenu}
                className="px-3 py-2 text-gray-100 rounded-full hover:bg-gray-800/50 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
              <MobileMenu />
            </>
          ) : (
            <div className="relative" ref={contactDropdownRef}>
              <button 
                onClick={toggleContact}
                className={`px-5 py-2 text-sm rounded-full backdrop-blur-sm transition-colors duration-300 flex items-center ${
                  contactOpen 
                    ? 'bg-gray-800/50 text-gray-100' 
                    : 'text-gray-100 hover:bg-gray-800/50'
                }`}
              >
                Contact Me
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform duration-300 ${contactOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <ContactDropdown />
            </div>
          )}
        </div>
      </nav>

      {/* Styles for contact dropdown */}
      <style dangerouslySetInnerHTML={{ __html: `
        .gradient-text {
          background: linear-gradient(45deg, #FF3366, #854DFF, #5B7FFF);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .social-link-nav {
          color: #9CA3AF;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
        }
        .social-link-nav:hover {
          color: #F3F4F6;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
      `}} />
    </div>
  );
};

export default GooeyNavigation;
