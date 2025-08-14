'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void; // Keeping the interface the same for compatibility
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const darkMode = true; // Always dark mode

  // Set dark mode class on document
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  }, []);

  // Keep toggleDarkMode function for API compatibility, but it does nothing
  const toggleDarkMode = () => {
    // No-op function - we don't want to toggle anymore
    console.log('Dark mode is permanently enabled');
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
