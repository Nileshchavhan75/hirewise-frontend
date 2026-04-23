import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/candidate/BrowseJobs.css'

const BrowseJobs = () => {
  return (
    <div className="browse-jobs-page">
      <div className="browse-header">
        <h1>Browse Jobs</h1>
        <p>Find your perfect role from thousands of opportunities</p>
      </div>

      <div className="coming-soon">
        <i className="fas fa-search"></i>
        <h2>Coming Soon!</h2>
        <p>We're working on bringing you an extensive job search experience. Stay tuned!</p>
        <Link to="/candidates" className="back-link">
          <i className="fas fa-arrow-left"></i>
          Back to Candidates
        </Link>
      </div>
    </div>
  )
}

export default BrowseJobs