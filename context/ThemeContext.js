import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
  background: '#f0f9ff',
  card: '#ffffff',
  text: '#1e3a8a',
  accent: '#3b82f6',
};

const darkTheme = {
  background: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc',
  accent: '#38bdf8',
};
