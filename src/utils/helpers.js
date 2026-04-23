export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

export const formatSalary = (salary) => {
    if (!salary) return 'Not disclosed';
    return salary;
};

export const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export const truncateText = (text, length = 100) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
};

export const getJobTypeColor = (type) => {
    const colors = {
        permanent: '#4158D0',
        contract: '#FF6B4A',
        intern: '#2A9D8F',
        bulk: '#9C89B8'
    };
    return colors[type?.toLowerCase()] || '#666';
};

export const getSectorIcon = (sector) => {
    const icons = {
        it: '💻',
        non_it: '📊',
        international: '🌍'
    };
    return icons[sector?.toLowerCase()] || '📋';
};

export const getStatusBadgeClass = (status) => {
    const classes = {
        pending: 'badge-warning',
        reviewed: 'badge-info',
        shortlisted: 'badge-success',
        rejected: 'badge-danger',
        accepted: 'badge-success',
        contacted: 'badge-primary',
        new_status: 'badge-info'
    };
    return classes[status?.toLowerCase()] || 'badge-secondary';
};