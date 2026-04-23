import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../css/employer/SubmitRequirement.css'

const SubmitRequirement = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    jobTitle: '',
    jobType: 'permanent',
    experience: '',
    location: '',
    salaryRange: '',
    vacancies: 1,
    urgency: 'normal',
    jobDescription: '',
    skills: '',
    qualifications: '',
    industry: 'it'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 1500)
  }

  const jobTypes = [
    { value: 'permanent', label: 'Permanent' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'bulk', label: 'Bulk Hiring' }
  ]

  const urgencyLevels = [
    { value: 'low', label: 'Low (30+ days)' },
    { value: 'normal', label: 'Normal (15-30 days)' },
    { value: 'high', label: 'High (7-14 days)' },
    { value: 'critical', label: 'Critical (48 hours)' }
  ]

  return (
    <div className="submit-requirement-page">
      <div className="requirement-header">
        <h1>Post a Job Requirement</h1>
        <p>Tell us about your hiring needs and we'll find the perfect candidates</p>
      </div>

      {submitStatus === 'success' && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          <div>
            <h3>Requirement Submitted Successfully!</h3>
            <p>Our team will contact you within 24 hours to discuss your requirements.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="requirement-form">
        <div className="form-section">
          <h2>Company Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="Enter company name"
              />
            </div>
            <div className="form-group">
              <label>Contact Person *</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                placeholder="Full name"
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="10 digit mobile number"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Job Details</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Job Title *</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                placeholder="e.g., Senior Software Engineer"
              />
            </div>
            <div className="form-group">
              <label>Job Type *</label>
              <select name="jobType" value={formData.jobType} onChange={handleChange} required>
                {jobTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Industry *</label>
              <select name="industry" value={formData.industry} onChange={handleChange} required>
                <option value="it">Information Technology</option>
                <option value="finance">Banking & Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="pharma">Pharmaceuticals</option>
                <option value="oil">Oil & Gas</option>
              </select>
            </div>
            <div className="form-group">
              <label>Experience Required *</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                placeholder="e.g., 5-8 years"
              />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., Pune, Bangalore, Remote"
              />
            </div>
            <div className="form-group">
              <label>Salary Range</label>
              <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                placeholder="e.g., ₹15-25 LPA"
              />
            </div>
            <div className="form-group">
              <label>Number of Vacancies *</label>
              <input
                type="number"
                name="vacancies"
                value={formData.vacancies}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Urgency *</label>
              <select name="urgency" value={formData.urgency} onChange={handleChange} required>
                {urgencyLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Skills & Requirements</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Key Skills *</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                placeholder="Enter skills separated by commas (e.g., Java, React, Python)"
                rows="3"
              ></textarea>
            </div>
            <div className="form-group full-width">
              <label>Qualifications</label>
              <textarea
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="e.g., Bachelor's degree in Computer Science"
                rows="2"
              ></textarea>
            </div>
            <div className="form-group full-width">
              <label>Job Description *</label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                required
                placeholder="Detailed description of the role, responsibilities, and requirements"
                rows="5"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Submitting...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Submit Requirement
              </>
            )}
          </button>
          <p className="form-note">
            By submitting, you agree to our <Link to="/terms">Terms of Service</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SubmitRequirement