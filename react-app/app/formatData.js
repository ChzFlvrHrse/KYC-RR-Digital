function formatPhoneNumberFlexible(phoneNumber) {
    // Remove all non-digit characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // Format numbers of various lengths
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 11 || cleaned.startsWith('1')) {
        // For numbers with a leading country code "1"
        return cleaned.replace(/1(\d{3})(\d{3})(\d{4})/, '+1 ($1) $2-$3');
    } else if (cleaned.length > 10) {
        // Handle longer numbers (e.g., extensions)
        const base = cleaned.slice(0, 10).replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        const extension = cleaned.slice(10);
        return `${base} x${extension}`;
    } else {
        return 'Invalid phone number';
    }
}

function isValidEmail(email) {
    // Define the regular expression for validating an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regex
    return emailRegex.test(email);
}

export { formatPhoneNumberFlexible, isValidEmail };
