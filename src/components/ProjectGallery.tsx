'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Stack, { CardData } from './Stack';
import ProjectModal from './ProjectModal';

export default function ProjectGallery() {
  const { darkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState<CardData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: CardData[] = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format",
      title: "Project Management Dashboard",
      description: "A comprehensive project management solution with real-time collaboration features",
      detailedDescription: "This full-stack project management application enables teams to collaborate effectively with real-time updates, task assignments, progress tracking, and integrated communication tools. Built with modern technologies for optimal performance and user experience.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
      demoUrl: "https://project-demo.com",
      githubUrl: "https://github.com/rohitsharma/project-manager"
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=500&auto=format",
      title: "E-commerce Platform",
      description: "Modern e-commerce solution with payment integration and admin dashboard",
      detailedDescription: "A complete e-commerce platform featuring user authentication, product catalog, shopping cart, secure payment processing with Stripe, order management, and an comprehensive admin dashboard for inventory and sales management.",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Prisma"],
      demoUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/rohitsharma/ecommerce-platform"
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format",
      title: "Weather Forecast App",
      description: "Beautiful weather application with location-based forecasts and interactive maps",
      detailedDescription: "An elegant weather application that provides detailed weather information, 7-day forecasts, interactive weather maps, and location-based suggestions. Features a responsive design with smooth animations and real-time weather updates.",
      technologies: ["React", "OpenWeather API", "Mapbox", "CSS3", "Framer Motion"],
      demoUrl: "https://weather-app-demo.com",
      githubUrl: "https://github.com/rohitsharma/weather-app"
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format",
      title: "Task Management System",
      description: "Productive task management with drag-and-drop functionality and team collaboration",
      detailedDescription: "A sophisticated task management system featuring drag-and-drop kanban boards, team collaboration tools, deadline tracking, priority management, and detailed analytics. Perfect for agile teams and personal productivity.",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS", "Drag & Drop API"],
      demoUrl: "https://task-manager-demo.com",
      githubUrl: "https://github.com/rohitsharma/task-manager"
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format",
      title: "Social Media Analytics",
      description: "Comprehensive analytics dashboard for social media performance tracking",
      detailedDescription: "A powerful analytics platform that tracks social media performance across multiple platforms, provides detailed insights, engagement metrics, and automated reporting features for businesses and content creators.",
      technologies: ["React", "D3.js", "Node.js", "Redis", "Chart.js"],
      demoUrl: "https://analytics-demo.com",
      githubUrl: "https://github.com/rohitsharma/social-analytics"
    }
  ];

  const handleProjectClick = (project: CardData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className={`py-24 relative ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className={`font-bold text-4xl md:text-5xl lg:text-6xl mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'} leading-tight`}>
          My Latest <span className="font-bold italic gradient-text">Projects</span>
        </h2>
        
        <p className={`text-xl md:text-2xl mb-16 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Drag, interact, and click on the cards to explore my work. Each project represents a unique solution crafted with attention to detail and modern technologies.
        </p>

        <div className={`flex justify-center items-center min-h-[650px] ${isModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
          <Stack
            randomRotation={true}
            sensitivity={150}
            sendToBackOnClick={false}
            cardDimensions={{ width: 480, height: 320 }}
            cardsData={projects}
            onCardClick={handleProjectClick}
            animationConfig={{ stiffness: 300, damping: 25 }}
          />
        </div>

        <div className={`mt-12 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>💡 Tip: Drag the cards around or click on them to see project details</p>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(45deg, #FF3366, #854DFF, #5B7FFF);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));
        }
      `}</style>
    </section>
  );
}
