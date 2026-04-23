import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Particles1 from './components/Particles1';

// Main Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Candidates from './pages/Candidates';
import Employers from './pages/Employers';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Additional Pages
import JobDetails from './pages/JobDetails';
import MyApplications from './pages/MyApplications';
import EmployerDashboard from './pages/EmployerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CandidateProfile from './pages/CandidateProfile';
import ResumeChecker from './pages/ResumeChecker';

// Service Detail Page (dynamic)
import ServiceDetail from './pages/services/ServiceDetail';

// Blog & HR Trends
import BlogPost from './pages/BlogPost';
import HRTrends from './pages/HRTrends';
import HRTrendDetail from './pages/HRTrendDetail';
import FAQDetail from './pages/FAQDetail';
import ComplianceDetail from './pages/ComplianceDetail';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Particles1 />
            <Navbar />
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/employers" element={<Employers />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Job & Candidate Routes */}
              <Route path="/job/:id" element={<JobDetails />} />
              <Route path="/my-applications" element={<MyApplications />} />
              <Route path="/candidate/profile" element={<CandidateProfile />} />
              <Route path="/resume-checker" element={<ResumeChecker />} />

              {/* Dashboard Routes */}
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />

              {/* Dynamic Service Pages (e.g., /services/permanent-hiring) */}
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
               {/* Blog & HR Trends Routes */}
            <Route path="/resources/blog/:id" element={<BlogPost />} />
            <Route path="/hr-trends" element={<HRTrends />} />
            <Route path="/hr-trends/:id" element={<HRTrendDetail />} />
            <Route path="/resources/faq/:id" element={<FAQDetail />} />
            <Route path="/resources/compliance/:id" element={<ComplianceDetail />} />

            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;