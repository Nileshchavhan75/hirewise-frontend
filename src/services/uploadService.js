import api from './api';

class UploadService {
    async uploadResume(file) {
        const formData = new FormData();
        formData.append('file', file);   // ✅ Changed from 'resume' to 'file'
        formData.append('type', 'resume');

        try {
            const response = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log('Upload result:', response.data);

            if (response.data && response.data.url) {
                return {
                    success: true,
                    url: response.data.url,
                    message: response.data.message || 'File uploaded successfully'
                };
            }
            return {
                success: false,
                message: response.data?.message || 'Upload failed'
            };
        } catch (error) {
            console.error('Upload error:', error);
            return {
                success: false,
                message: error.response?.data?.error || error.message || 'Upload failed'
            };
        }
    }

    async uploadProfilePicture(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'profile');

        try {
            const response = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data && response.data.url) {
                return {
                    success: true,
                    url: response.data.url,
                    message: response.data.message || 'File uploaded successfully'
                };
            }
            return {
                success: false,
                message: response.data?.message || 'Upload failed'
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.error || error.message || 'Upload failed'
            };
        }
    }
}

export default new UploadService();