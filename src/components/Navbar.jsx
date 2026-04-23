import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import authService from '../services/authService'

const Navbar = () => {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuthContext()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    authService.logout()
    window.location.href = '/'
  }

  // Public navigation items (always visible)
  const publicNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Candidates', path: '/candidates' },
    { name: 'Employers', path: '/employers' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact-us' }
  ]

  // ✅ FIXED: Get dashboard link based on user role (NO duplicate for candidate)
  const getDashboardLink = () => {
    if (!user) return null
    
    if (user.role === 'candidate') {
      return null  // ✅ Don't return anything for candidate - handled separately
    } else if (user.role === 'employer') {
      return { name: 'Dashboard', path: '/employer-dashboard', icon: 'fas fa-chart-line' }
    } else if (user.role === 'admin') {
      return { name: 'Admin', path: '/admin-dashboard', icon: 'fas fa-shield-alt' }
    }
    return null
  }

  const dashboardLink = getDashboardLink()

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-gradient">Hire</span>
          <span className="logo-light">Wise</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {/* Public pages */}
            {publicNavItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            
            {/* Dashboard link for Employer/Admin only (NOT for candidate) */}
            {dashboardLink && (
              <li className="nav-item dashboard-item">
                <Link 
                  to={dashboardLink.path} 
                  className={`nav-link dashboard-link ${location.pathname === dashboardLink.path ? 'active' : ''}`}
                >
                  <i className={dashboardLink.icon}></i>
                  {dashboardLink.name}
                </Link>
              </li>
            )}

            {/* ✅ Candidate Links (only once - no duplicate) */}
            {user?.role === 'candidate' && (
              <>
                <li className="nav-item">
                  <Link 
                    to="/my-applications" 
                    className={`nav-link ${location.pathname === '/my-applications' ? 'active' : ''}`}
                  >
                    <i className="fas fa-file-alt"></i> My Applications
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/candidate/profile" 
                    className={`nav-link ${location.pathname === '/candidate/profile' ? 'active' : ''}`}
                  >
                    <i className="fas fa-user"></i> Profile
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Auth Buttons */}
          {!user ? (
            <Link to="/login" className="auth-btn login-btn">
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </Link>
          ) : (
            <div className="user-menu">
              <span className="user-greeting">
                <i className="fas fa-user-circle"></i>
                {user.name || user.email}
              </span>
              <button className="auth-btn logout-btn" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <span className="mobile-logo">HireWise</span>
            <button className="mobile-close" onClick={() => setIsMobileMenuOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <ul className="mobile-nav-list">
            {/* Public pages */}
            {publicNavItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
            
            {/* Dashboard link for Employer/Admin only */}
            {dashboardLink && (
              <li>
                <Link to={dashboardLink.path} className="mobile-nav-link dashboard-mobile" onClick={() => setIsMobileMenuOpen(false)}>
                  <i className={dashboardLink.icon}></i>
                  {dashboardLink.name}
                </Link>
              </li>
            )}

            {/* ✅ Candidate Links for Mobile (only once) */}
            {user?.role === 'candidate' && (
              <>
                <li>
                  <Link to="/my-applications" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                    <i className="fas fa-file-alt"></i> My Applications
                  </Link>
                </li>
                <li>
                  <Link to="/candidate/profile" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                    <i className="fas fa-user"></i> Profile
                  </Link>
                </li>
              </>
            )}

            {/* Auth in mobile */}
            {!user ? (
              <li>
                <Link to="/login" className="mobile-nav-link login-mobile" onClick={() => setIsMobileMenuOpen(false)}>
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button className="mobile-nav-link logout-mobile" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </li>
            )}

            {/* Theme toggle in mobile */}
            <li>
              <button className="mobile-nav-link theme-mobile" onClick={() => {
                toggleTheme()
                setIsMobileMenuOpen(false)
              }}>
                {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar