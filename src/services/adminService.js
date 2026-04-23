import api from './api';
import { API_ENDPOINTS } from '../config/constants';

class AdminService {
    async getStats() {
        try {
            const response = await api.get('/admin/stats');
            if (response.data.success) {
                return { success: true, data: response.data.data };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async getAllUsers() {
        try {
            const response = await api.get('/admin/users');
            if (response.data.success) {
                return { success: true, data: response.data.data };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async updateUserStatus(userId, active) {
        try {
            const response = await api.put(`/admin/users/${userId}/status?active=${active}`);
            if (response.data.success) {
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async deleteUser(userId) {
        try {
            const response = await api.delete(`/admin/users/${userId}`);
            if (response.data.success) {
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async getAllApplications() {
        try {
            const response = await api.get('/admin/applications');
            if (response.data.success) {
                return { success: true, data: response.data.data };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async updateJobStatus(jobId, active) {
        try {
            const response = await api.put(`/admin/jobs/${jobId}/status?active=${active}`);
            if (response.data.success) {
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // ✅ NEW: Get all jobs with approval status
    async getAllJobs() {
        try {
            const response = await api.get('/admin/jobs');
            if (response.data.success) {
                return { success: true, data: response.data.data };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // ✅ NEW: Approve or reject a job
    async updateJobApproval(jobId, status) {
        try {
            const response = await api.put(`/admin/jobs/${jobId}/approve?status=${status}`);
            if (response.data.success) {
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

export default new AdminService();