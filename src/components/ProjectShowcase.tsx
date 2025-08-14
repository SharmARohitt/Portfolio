'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const projects = [
  {
    id: 1,
    title: 'Cosmic Portfolio',
    category: 'Web Development',
    image: '/images/project1.jpg',
    description: 'Interactive portfolio with galaxy-themed elements using Three.js and GSAP animations.',
    link: '#'
  },
  {
    id: 2,
    title: 'Gooey Navigation',
    category: 'UI/UX Design',
    image: '/images/project2.jpg',
    description: 'Modern navigation component with fluid animations and gooey effects.',
    link: '#'
  },
  {
    id: 3,
    title: 'Data Visualization Dashboard',
    category: 'Web App',
    image: '/images/project3.jpg',
    description: 'Interactive dashboard for data visualization using D3.js and React.',
    link: '#'
  }
];

const ProjectShowcase = () => {
  const { darkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      className={`py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}
      id="projects"
    >
      <div className="container mx-auto">
        <h2 className={`text-4xl font-bold mb-10 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: project.id * 0.2 }}
              className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
            >
              <div className="h-48 bg-gray-300 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    // Fallback for missing images
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Project+Image';
                  }}
                />
              </div>
              
              <div className="p-6">
                <span className={`text-xs font-semibold inline-block py-1 px-2 rounded ${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-200 text-purple-800'} mb-2`}>
                  {project.category}
                </span>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                <a 
                  href={project.link} 
                  className={`inline-block px-4 py-2 rounded ${darkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'} text-white transition-colors duration-300`}
                >
                  View Project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
