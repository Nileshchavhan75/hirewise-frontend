import React from 'react'

const StatCard = ({ value, label, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  )
}

export default StatCard