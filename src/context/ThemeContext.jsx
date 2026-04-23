import React, { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  // Default to dark theme
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    // If no saved theme, default to 'dark'
    return savedTheme || 'dark'
  })

  useEffect(() => {
    // Apply theme to body
    if (theme === 'light') {
      document.body.classList.add('light')
    } else {
      document.body.classList.remove('light')
    }
    // Save theme to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}