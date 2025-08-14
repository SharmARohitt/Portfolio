'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { CardData } from './Stack';
import { useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: CardData | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { darkMode } = useTheme();

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm cursor-pointer"
            onClick={() => {
              onClose();
            }}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl z-10 ${
              darkMode ? 'bg-gray-900' : 'bg-white'
            } shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className={`absolute top-4 right-4 z-20 p-3 rounded-full transition-colors shadow-lg hover:scale-110 ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-800'
              }`}
              aria-label="Close modal"
              type="button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Project Image */}
            <div className="aspect-video overflow-hidden rounded-t-2xl">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Content */}
            <div className="p-8">
              <h2 className={`text-3xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {project.title}
              </h2>

              <p className={`text-lg leading-relaxed mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className={`text-xl font-semibold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        darkMode
                          ? 'bg-gray-800 text-gray-300 border border-gray-700'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                    </svg>
                    View Live Demo
                  </a>
                )}
                
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                      darkMode
                        ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
