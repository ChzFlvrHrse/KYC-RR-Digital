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
};

function containsLetters(phoneNumber) {
    const letterRegex = /[a-zA-Z]/; // Regular expression to check for any letters
    return letterRegex.test(phoneNumber);
}

function formatDateToMonthDayYear(dateString) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const [year, month, day] = dateString.split("-"); // Split the input date
    const monthName = months[parseInt(month, 10) - 1]; // Get the month name
    return `${monthName} ${parseInt(day, 10)}, ${year}`; // Combine as Month Day, Year
};

function taxIdFormatter(taxId) {
    // Remove all non-digit characters
    const cleaned = ('' + taxId).replace(/\D/g, '');

    // Format SSN
    if (cleaned.length === 9) {
        return cleaned.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
    } else {
        return 'Invalid tax ID';
    }
}

function isValidEmail(email) {
    // Define the regular expression for validating an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regex
    return emailRegex.test(email);
};

export { formatPhoneNumberFlexible, containsLetters, formatDateToMonthDayYear, taxIdFormatter, isValidEmail };
