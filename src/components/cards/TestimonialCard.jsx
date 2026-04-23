import React from 'react'

const TestimonialCard = ({ name, role, content, avatar, rating }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <img src={avatar} alt={name} className="testimonial-avatar" />
        <div>
          <h4>{name}</h4>
          <p>{role}</p>
        </div>
      </div>
      <div className="testimonial-rating">
        {[...Array(rating)].map((_, i) => (
          <i key={i} className="fas fa-star"></i>
        ))}
      </div>
      <p className="testimonial-content">"{content}"</p>
    </div>
  )
}

export default TestimonialCard