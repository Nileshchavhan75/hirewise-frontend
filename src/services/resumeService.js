import api from './api';

class ResumeService {
    /**
     * Check resume against job requirements
     * @param {File} file - Resume file (PDF or DOCX)
     * @param {number} jobId - Job ID to match against
     * @returns {Promise<Object>} Match result with score and keywords
     */
    async checkResume(file, jobId) {
        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobId', jobId);

        try {
            const response = await api.post('/resume/check', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                return {
                    success: true,
                    data: response.data
                };
            }
            return {
                success: false,
                message: response.data.message || 'Failed to check resume'
            };
        } catch (error) {
            console.error('Resume check error:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to check resume'
            };
        }
    }
}

export default new ResumeService();