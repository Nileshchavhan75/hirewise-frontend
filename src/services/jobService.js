import api from './api';
import { API_ENDPOINTS } from '../config/constants';

class JobService {
    async getAllJobs(page = 0, size = 10) {
        try {
            const response = await api.get(API_ENDPOINTS.JOBS, {
                params: { page, size }
            });
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to fetch jobs'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to fetch jobs'
            };
        }
    }

    async getJobById(id) {
        try {
            const response = await api.get(API_ENDPOINTS.JOB_BY_ID(id));
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to fetch job'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to fetch job'
            };
        }
    }

    async searchJobs(searchParams) {
        try {
            const response = await api.post(API_ENDPOINTS.JOBS_SEARCH, searchParams);
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Search failed'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Search failed'
            };
        }
    }

    async postJob(jobData, employerId) {
        try {
            const response = await api.post(`${API_ENDPOINTS.JOBS}?employerId=${employerId}`, jobData);
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to post job'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to post job'
            };
        }
    }

    async updateJob(jobId, jobData, userId) {
        try {
            const response = await api.put(`${API_ENDPOINTS.JOB_BY_ID(jobId)}?userId=${userId}`, jobData);
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to update job'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to update job'
            };
        }
    }

    async deleteJob(jobId, userId) {
        try {
            const response = await api.delete(`${API_ENDPOINTS.JOB_BY_ID(jobId)}?userId=${userId}`);
            
            if (response.data.success) {
                return {
                    success: true,
                    message: response.data.message || 'Job deleted successfully'
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to delete job'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to delete job'
            };
        }
    }

    async getJobsByEmployer(employerId) {
        try {
            const response = await api.get(API_ENDPOINTS.JOBS_BY_EMPLOYER(employerId));
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to fetch jobs'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to fetch jobs'
            };
        }
    }
}

export default new JobService();