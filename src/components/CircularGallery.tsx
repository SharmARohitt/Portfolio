'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  impact: string;
  technologies: string[];
}

const demoProjects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive dashboard for e-commerce store owners with real-time analytics, inventory management, and customer insights.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    imageUrl: '/images/projects/project1.jpg',
    videoUrl: 'https://example.com/videos/project1.mp4',
    liveUrl: 'https://example.com/project1',
    githubUrl: 'https://github.com/username/project1',
    impact: 'Improved sales tracking efficiency by 45% and reduced inventory management time by 30% for multiple clients.',
    technologies: ['React.js', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Chart.js']
  },
  {
    id: 'project-2',
    title: 'AI Content Generator',
    description: 'An AI-powered content generation tool that creates marketing copy, blog posts, and social media content based on user prompts.',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind'],
    imageUrl: '/images/projects/project2.jpg',
    liveUrl: 'https://example.com/project2',
    githubUrl: 'https://github.com/username/project2',
    impact: 'Helped content creators reduce content creation time by 60% while maintaining high-quality standards.',
    technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS', 'Vercel']
  },
  {
    id: 'project-3',
    title: 'Real-time Collaboration Tool',
    description: 'A collaborative workspace allowing teams to work together on documents, manage tasks, and communicate in real-time.',
    tags: ['React', 'Firebase', 'WebSockets', 'Material UI'],
    imageUrl: '/images/projects/project3.jpg',
    videoUrl: 'https://example.com/videos/project3.mp4',
    githubUrl: 'https://github.com/username/project3',
    impact: 'Increased team productivity by 35% by streamlining communication and document workflows.',
    technologies: ['React.js', 'Firebase', 'WebSockets', 'Material UI', 'WebRTC']
  },
  {
    id: 'project-4',
    title: 'Mobile Health Tracker',
    description: 'A cross-platform mobile application for tracking health metrics, setting fitness goals, and monitoring progress over time.',
    tags: ['React Native', 'Redux', 'Node.js', 'MongoDB'],
    imageUrl: '/images/projects/project4.jpg',
    liveUrl: 'https://example.com/project4',
    impact: 'Helped over 5,000 users improve their fitness habits with personalized tracking and insights.',
    technologies: ['React Native', 'Redux', 'Node.js', 'MongoDB', 'Express.js', 'HealthKit API', 'Google Fit API']
  }
];

const CircularGallery = () => {
  const { darkMode } = useTheme();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const projects = demoProjects; // Replace with your actual projects
  const galleryRef = useRef<HTMLDivElement>(null);
  const radius = 250; // Radius of the circular gallery in pixels

  // Calculate project positions in a circle
  const getProjectPosition = (index: number, totalProjects: number) => {
    const angle = (index / totalProjects) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const rotateY = angle * (180 / Math.PI);
    
    return { x, y, rotateY };
  };

  // Handle clicking on a project
  const handleProjectClick = (project: Project, index: number) => {
    setActiveProject(project);
    setActiveIndex(index);
    setIsDetailsOpen(true);
  };

  // Handle navigation between projects
  const navigateProjects = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next'
      ? (activeIndex + 1) % projects.length
      : (activeIndex - 1 + projects.length) % projects.length;
    
    setActiveIndex(newIndex);
    setActiveProject(projects[newIndex]);
  };

  useEffect(() => {
    // Set initial active project
    if (projects.length > 0 && !activeProject) {
      setActiveProject(projects[0]);
    }
  }, [projects, activeProject]);

  return (
    <section className={`relative min-h-screen w-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-20 overflow-hidden`}>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className={`text-4xl md:text-5xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          My <span className="text-indigo-500">Projects</span>
        </h2>
        
        {/* Circular Gallery */}
        <div className="flex justify-center items-center h-[600px] relative" ref={galleryRef}>
          {/* Project Items in Circle */}
          {projects.map((project, index) => {
            const { x, y, rotateY } = getProjectPosition(index, projects.length);
            const isActive = activeIndex === index;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isActive ? 1 : 0.6,
                  scale: isActive ? 1 : 0.8,
                  x: x,
                  y: y,
                  rotateY: `${rotateY}deg`,
                  zIndex: isActive ? 10 : 1
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                onClick={() => handleProjectClick(project, index)}
                className={`absolute cursor-pointer transform-gpu hover:scale-105 transition-transform duration-300`}
              >
                <div 
                  className={`
                    w-48 h-64 md:w-56 md:h-72 rounded-lg overflow-hidden shadow-xl
                    ${isActive ? 'ring-4 ring-indigo-500' : ''}
                    transform-style-3d backface-visibility-hidden
                  `}
                >
                  {/* Project Card Content */}
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-10"></div>
                    <div className="w-full h-full bg-gray-200">
                      {/* Placeholder for project image */}
                      <div 
                        className={`w-full h-full flex items-center justify-center text-xl font-bold ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-300 text-gray-700'}`}
                        style={{
                          backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {!project.imageUrl && project.title[0]}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <h3 className="text-white font-bold text-lg truncate">{project.title}</h3>
                      <div className="flex flex-wrap mt-2 gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span 
                            key={`${project.id}-${tag}`}
                            className="inline-block bg-indigo-500 bg-opacity-80 text-white text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="inline-block bg-gray-700 bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Navigation Controls */}
        <div className="flex justify-center mt-8 space-x-6">
          <button
            onClick={() => navigateProjects('prev')}
            className={`p-3 rounded-full ${
              darkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-white text-gray-800 hover:bg-gray-100'
            } shadow-md transition-colors duration-200`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>
          <button
            onClick={() => navigateProjects('next')}
            className={`p-3 rounded-full ${
              darkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-white text-gray-800 hover:bg-gray-100'
            } shadow-md transition-colors duration-200`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {isDetailsOpen && activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
              onClick={() => setIsDetailsOpen(false)}
            ></div>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative max-w-4xl w-full rounded-xl overflow-hidden ${
                darkMode ? 'bg-gray-900' : 'bg-white'
              } shadow-2xl max-h-[90vh] overflow-y-auto`}
            >
              {/* Close button */}
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-70 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Media Section */}
                <div className={`h-60 md:h-full ${activeProject.videoUrl ? 'bg-black' : ''}`}>
                  {activeProject.videoUrl ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        {/* Replace with actual video component */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                        <p className="mt-2">Video Demo Available</p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: activeProject.imageUrl ? `url(${activeProject.imageUrl})` : 'none',
                      }}
                    >
                      {!activeProject.imageUrl && (
                        <div className={`w-full h-full flex items-center justify-center text-5xl font-bold ${
                          darkMode ? 'bg-gray-800 text-gray-600' : 'bg-gray-300 text-gray-500'
                        }`}>
                          {activeProject.title[0]}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Project Details */}
                <div className={`p-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  <h2 className="text-2xl md:text-3xl font-bold">{activeProject.title}</h2>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 my-4">
                    {activeProject.tags.map(tag => (
                      <span 
                        key={`detail-${activeProject.id}-${tag}`}
                        className="px-2 py-1 text-xs rounded bg-indigo-500 text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    {/* Description with reveal animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold mb-1">Description</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {activeProject.description}
                      </p>
                    </motion.div>
                    
                    {/* Impact statement with reveal animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-lg font-semibold mb-1">Impact</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {activeProject.impact}
                      </p>
                    </motion.div>
                    
                    {/* Technologies with reveal animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-lg font-semibold mb-1">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.technologies.map(tech => (
                          <span 
                            key={`tech-${activeProject.id}-${tech}`}
                            className={`px-2 py-1 text-xs rounded ${
                              darkMode 
                                ? 'bg-gray-800 text-gray-300' 
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* Links with reveal animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-3 pt-4"
                    >
                      {activeProject.liveUrl && (
                        <a 
                          href={activeProject.liveUrl}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`px-4 py-2 rounded ${
                            darkMode 
                              ? 'bg-indigo-600 hover:bg-indigo-700' 
                              : 'bg-indigo-500 hover:bg-indigo-600'
                          } text-white transition-colors duration-200`}
                        >
                          Live Demo
                        </a>
                      )}
                      {activeProject.githubUrl && (
                        <a 
                          href={activeProject.githubUrl}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`px-4 py-2 rounded ${
                            darkMode 
                              ? 'bg-gray-800 hover:bg-gray-700' 
                              : 'bg-gray-200 hover:bg-gray-300'
                          } ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-200`}
                        >
                          View Code
                        </a>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CircularGallery;
