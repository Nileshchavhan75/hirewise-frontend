import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Info */}
          <div className="footer-section company-info">
            <Link to="/" className="footer-logo">
              <span className="logo-gradient">Hire</span>
              <span className="logo-light">Wise</span>
            </Link>
            <p className="company-description">
              Hire Wise Solutions Pvt. Ltd. is a professional recruitment and HR service provider, 
              offering end-to-end talent acquisition and workforce solutions across IT and Non-IT sectors.
            </p>
            <div className="social-links">
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/candidates">For Candidates</Link></li>
              <li><Link to="/employers">For Employers</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>Our Services</h3>
            <ul className="footer-links">
              <li><Link to="/services/permanent-hiring">Permanent Hiring</Link></li>
              <li><Link to="/services/contractual-hiring">Contractual Hiring</Link></li>
              <li><Link to="/services/intern-hiring">Intern Hiring</Link></li>
              <li><Link to="/services/bulk-hiring">Bulk Hiring</Link></li>
              <li><Link to="/services/it-hiring">IT Hiring</Link></li>
              <li><Link to="/services/international">International Recruitment</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul className="contact-info">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Pune, Maharashtra, India - 411001</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>+91 98765 43210</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>support@hirewise.com</span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Hire Wise Solutions Pvt. Ltd. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer