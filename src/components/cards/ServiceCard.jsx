import React from 'react'
import { Link } from 'react-router-dom'

const ServiceCard = ({ icon, title, description, path, color }) => {
  return (
    <Link to={path} className="service-card">
      <div className="service-icon" style={{ background: `${color}20`, color }}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="learn-more">
        Learn More <i className="fas fa-arrow-right"></i>
      </span>
    </Link>
  )
}

export default ServiceCard