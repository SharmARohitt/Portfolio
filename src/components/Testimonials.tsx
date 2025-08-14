'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    position: 'CEO at TechStart',
    content: 'Rohit delivered an exceptional website that perfectly captured our brand vision. His attention to detail and technical expertise made the process seamless.',
    avatar: '/images/testimonial1.jpg'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    position: 'Marketing Director',
    content: 'Working with Rohit was a pleasure. He understood our needs quickly and created a beautiful, functional design that exceeded our expectations.',
    avatar: '/images/testimonial2.jpg'
  },
  {
    id: 3,
    name: 'Michael Wong',
    position: 'Product Manager',
    content: "Rohit's creativity and technical skills are unmatched. The interactive elements he created for our product showcase truly elevated our online presence.",
    avatar: '/images/testimonial3.jpg'
  }
];

const Testimonials = () => {
  const { darkMode } = useTheme();

  return (
    <section 
      className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-300`}
      id="testimonials"
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Testimonials</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: testimonial.id * 0.2 }}
              className={`rounded-lg p-6 shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-300">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback for missing images
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=Avatar';
                    }}
                  />
                </div>
                <div>
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.position}</p>
                </div>
              </div>
              <p className={`italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{testimonial.content}"</p>
              <div className="mt-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
