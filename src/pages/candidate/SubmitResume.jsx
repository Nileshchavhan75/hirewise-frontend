import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../css/candidate/SubmitResume.css'

const SubmitResume = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    currentCompany: '',
    currentRole: '',
    skills: '',
    expectedSalary: '',
    preferredLocation: '',
    jobType: 'permanent',
    noticePeriod: '',
    resume: null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }))
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

  return (
    <div className="submit-resume-page">
      <div className="resume-container">
        <div className="resume-header">
          <h1>Submit Your Resume</h1>
          <p>Get noticed by top recruiters and companies</p>
        </div>

        {submitStatus === 'success' && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            <div>
              <h3>Resume Submitted Successfully!</h3>
              <p>Our recruiters will review your profile and contact you soon.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="resume-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
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
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="10 digit mobile number"
              />
            </div>

            <div className="form-group">
              <label>Total Experience *</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">Select experience</option>
                <option value="fresher">Fresher</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-8">5-8 years</option>
                <option value="8-12">8-12 years</option>
                <option value="12+">12+ years</option>
              </select>
            </div>

            <div className="form-group">
              <label>Current Company</label>
              <input
                type="text"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                placeholder="Current/Last company"
              />
            </div>

            <div className="form-group">
              <label>Current Role</label>
              <input
                type="text"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                placeholder="Your current designation"
              />
            </div>

            <div className="form-group full-width">
              <label>Skills *</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                placeholder="List your key skills (e.g., Java, React, Python, Project Management)"
                rows="3"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Expected Salary</label>
              <input
                type="text"
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
                placeholder="e.g., ₹12 LPA or $80K"
              />
            </div>

            <div className="form-group">
              <label>Preferred Location</label>
              <input
                type="text"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                placeholder="e.g., Pune, Bangalore, International"
              />
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="permanent">Permanent</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div className="form-group">
              <label>Notice Period</label>
              <select
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
              >
                <option value="">Select notice period</option>
                <option value="immediate">Immediate</option>
                <option value="15">15 days</option>
                <option value="30">30 days</option>
                <option value="45">45 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Upload Resume * (PDF, DOC, DOCX - Max 5MB)</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="resume" className="file-label">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>Choose file</span>
                </label>
                {formData.resume && (
                  <span className="file-name">{formData.resume.name}</span>
                )}
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
                  Submit Resume
                </>
              )}
            </button>
            <p className="form-note">
              By submitting your resume, you agree to our <Link to="/terms">Terms & Conditions</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubmitResume