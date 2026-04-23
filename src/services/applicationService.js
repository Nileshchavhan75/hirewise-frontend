import api from './api';
import { API_ENDPOINTS } from '../config/constants';

class ApplicationService {
    async applyForJob(candidateId, jobData) {
        try {
            const response = await api.post(`${API_ENDPOINTS.APPLY_JOB}?candidateId=${candidateId}`, jobData);
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data,
                    message: response.data.message || 'Application submitted successfully'
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to submit application'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to submit application'
            };
        }
    }

    async getCandidateApplications(candidateId) {
        try {
            const response = await api.get(API_ENDPOINTS.CANDIDATE_APPLICATIONS(candidateId));
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to fetch applications'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to fetch applications'
            };
        }
    }

    async getJobApplications(jobId, employerId) {
        try {
            const response = await api.get(`${API_ENDPOINTS.JOB_APPLICATIONS(jobId)}?employerId=${employerId}`);
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to fetch applications'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to fetch applications'
            };
        }
    }

    async updateApplicationStatus(applicationId, employerId, statusData) {
        try {
            const response = await api.put(
                `${API_ENDPOINTS.UPDATE_APPLICATION_STATUS(applicationId)}?employerId=${employerId}`,
                statusData
            );
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data,
                    message: response.data.message || 'Status updated successfully'
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to update status'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to update status'
            };
        }
    }

    async withdrawApplication(applicationId, candidateId) {
        try {
            const response = await api.delete(`${API_ENDPOINTS.APPLICATIONS}/${applicationId}?candidateId=${candidateId}`);
            
            if (response.data.success) {
                return {
                    success: true,
                    message: response.data.message || 'Application withdrawn successfully'
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to withdraw application'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to withdraw application'
            };
        }
    }

    async hasApplied(jobId, candidateId) {
        try {
            const response = await api.get(`${API_ENDPOINTS.APPLICATIONS}/check?jobId=${jobId}&candidateId=${candidateId}`);
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to check status'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to check status'
            };
        }
    }
}

export default new ApplicationService();