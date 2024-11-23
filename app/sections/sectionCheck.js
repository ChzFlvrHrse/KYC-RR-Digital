import { isValidEmail, containsLettersOrSymbols } from "../formatData"; // Import custom validation functions.

// Function to validate each section of the form.
// I know this is a lot of code, but it's important to understand how the validation works.
const sectionChecks = (firstName, lastName, dob, phone, email, address, city, state, country, zip, taxId, taxIdType, countryOfCitizenship, countryOfBirth, countryOfResidence, fundingSource, carousel) => {
    const errorObj = {}; // Object to store validation errors.

    if (carousel === 0) { // Identity section validation.
        if (firstName.trim().length === 0) {
            errorObj.firstName = "Please enter a valid first name";
        } else {
            delete errorObj.firstName;
        }

        if (lastName.trim().length === 0) {
            errorObj.lastName = "Please enter a valid last name";
        } else {
            delete errorObj.lastName;
        }

        if (dob.trim().length === 0) {
            errorObj.dob = "Please enter a valid date of birth";
        } else {
            const dobVal = new Date(dob);
            const today = new Date();
            const cutoffDate = new Date(
                today.getFullYear() - 18,
                today.getMonth(),
                today.getDate()
            );

            if (dobVal > cutoffDate) {
                errorObj.dob = "You must be 18 years or older to create an account";
            } else {
                delete errorObj.dob;
            }
        }
    } else if (carousel === 1) { // Contact section validation.
        if (!isValidEmail(email)) {
            errorObj.email = "Please enter a valid email address";
        } else {
            delete errorObj.email;
        }

        if (phone.trim().length !== 10 || containsLettersOrSymbols(phone)) {
            errorObj.phone = containsLettersOrSymbols(phone)
                ? "Phone number cannot contain letters"
                : "Please enter a valid phone number";
        } else {
            delete errorObj.phone;
        }

        if (address.trim().length === 0) {
            errorObj.address = "Please enter a valid address";
        } else {
            delete errorObj.address;
        }

        if (city.trim().length === 0) {
            errorObj.city = "Please enter a valid city";
        } else {
            delete errorObj.city;
        }

        if (state.length === 0) {
            errorObj.state = "Please enter a valid state";
        } else {
            delete errorObj.state;
        }

        if (country.length === 0) {
            errorObj.country = "Please enter a valid country";
        } else {
            delete errorObj.country;
        }

        if (zip.trim().length !== 5) {
            errorObj.zip = containsLettersOrSymbols(zip)
                ? "Zip code cannot contain letters"
                : "Please enter a valid zip code";
        } else {
            delete errorObj.zip;
        }
    } else if (carousel === 2) { // Financial section validation.
        if (taxId.trim().length === 0 || taxId.length !== 9) {
            errorObj.taxId = containsLettersOrSymbols(taxId)
                ? "Tax ID cannot contain letters"
                : "Please enter a valid tax ID";
        } else {
            delete errorObj.taxId;
        }

        if (taxIdType.length === 0) {
            errorObj.taxIdType = "Please enter a valid tax ID type";
        } else {
            delete errorObj.taxIdType;
        }

        if (countryOfCitizenship.length === 0) {
            errorObj.countryOfCitizenship = "Please enter a valid country of citizenship";
        } else {
            delete errorObj.countryOfCitizenship;
        }

        if (countryOfBirth.length === 0) {
            errorObj.countryOfBirth = "Please enter a valid country of birth";
        } else {
            delete errorObj.countryOfBirth;
        }

        if (countryOfResidence.length === 0) {
            errorObj.countryOfResidence = "Please enter a valid country of residence";
        } else {
            delete errorObj.countryOfResidence;
        }

        if (fundingSource.trim().length === 0) {
            errorObj.fundingSource = "Please enter a valid funding source";
        } else {
            delete errorObj.fundingSource;
        }
    }

    return errorObj; // Return the error object.
};

export { sectionChecks }; // Export the sectionChecks function for use in other components.
