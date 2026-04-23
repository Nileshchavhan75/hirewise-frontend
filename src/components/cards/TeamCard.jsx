import React from 'react'

const TeamCard = ({ name, position, image, bio }) => {
  return (
    <div className="team-card">
      <div className="team-image">
        <img src={image} alt={name} />
      </div>
      <div className="team-info">
        <h3>{name}</h3>
        <p className="team-position">{position}</p>
        <p className="team-bio">{bio}</p>
        <div className="team-social">
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fas fa-envelope"></i></a>
        </div>
      </div>
    </div>
  )
}

export default TeamCard