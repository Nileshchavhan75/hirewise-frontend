export const validateEmail = (email) => {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
    return password && String(password).length >= 6;
};

export const validatePhone = (phone) => {
    if (!phone) return true; // Phone is optional
    const re = /^[0-9]{10}$/;
    return re.test(String(phone));
};

export const validateRequired = (value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === 'boolean') return value === true; // For checkboxes
    if (typeof value === 'string') return value.trim().length > 0;
    if (typeof value === 'number') return true;
    return false;
};

export const validateMinLength = (value, min) => {
    if (!value) return false;
    return String(value).length >= min;
};

export const validateMaxLength = (value, max) => {
    if (!value) return true;
    return String(value).length <= max;
};

export const validateMatch = (value1, value2) => {
    return String(value1) === String(value2);
};

export const getValidationErrors = (data, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
        const value = data[field];
        const rule = rules[field];
        
        if (rule.required && !validateRequired(value)) {
            errors[field] = `${field} is required`;
        } else if (rule.email && value && !validateEmail(value)) {
            errors[field] = 'Invalid email format';
        } else if (rule.password && value && !validatePassword(value)) {
            errors[field] = 'Password must be at least 6 characters';
        } else if (rule.phone && value && !validatePhone(value)) {
            errors[field] = 'Phone must be 10 digits';
        } else if (rule.minLength && value && !validateMinLength(value, rule.minLength)) {
            errors[field] = `${field} must be at least ${rule.minLength} characters`;
        } else if (rule.maxLength && value && !validateMaxLength(value, rule.maxLength)) {
            errors[field] = `${field} must be less than ${rule.maxLength} characters`;
        } else if (rule.match && value && !validateMatch(value, data[rule.match])) {
            errors[field] = `${field} does not match`;
        }
    });
    
    return errors;
};