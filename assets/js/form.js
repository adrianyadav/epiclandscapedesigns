// Real-time validation
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Email validation on input
    emailInput.addEventListener('input', function () {
        validateEmail(this.value);
    });

    // Phone validation on input
    phoneInput.addEventListener('input', function () {
        validatePhone(this.value);
    });

    // Form submission handler
    form.addEventListener('submit', function (e) {
        if (!validateForm()) {
            e.preventDefault();
            return false;
        }
        // If validation passes, let Netlify handle the submission
        return true;
    });
});

function validateEmail(email) {
    const emailError = document.getElementById('email-error');
    const emailInput = document.getElementById('email');

    if (!email) {
        clearError(emailError, emailInput);
        return true;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        showError(emailError, emailInput, 'Please enter a valid email address');
        return false;
    }

    clearError(emailError, emailInput);
    return true;
}

function validatePhone(phone) {
    const phoneError = document.getElementById('phone-error');
    const phoneInput = document.getElementById('phone');

    if (!phone) {
        clearError(phoneError, phoneInput);
        return true;
    }

    // Allow numbers, spaces, hyphens, parentheses, and plus sign
    const phoneRegex = /^[0-9+\-\s()]+$/;

    if (!phoneRegex.test(phone)) {
        showError(phoneError, phoneInput, 'Please enter only numbers, spaces, hyphens, parentheses, and plus sign');
        return false;
    }

    // Check if there's at least one digit
    if (!/\d/.test(phone)) {
        showError(phoneError, phoneInput, 'Please enter at least one number');
        return false;
    }

    clearError(phoneError, phoneInput);
    return true;
}

function showError(errorElement, inputElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputElement.classList.add('error');
    inputElement.classList.remove('valid');
}

function clearError(errorElement, inputElement) {
    errorElement.style.display = 'none';
    inputElement.classList.remove('error');
    inputElement.classList.add('valid');
}

function validateForm() {
    let isValid = true;

    // Get form values
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Validate email if provided
    if (email && !validateEmail(email)) {
        isValid = false;
    }

    // Validate phone if provided
    if (phone && !validatePhone(phone)) {
        isValid = false;
    }

    // Check if at least one contact method is provided
    if (!email && !phone) {
        const emailError = document.getElementById('email-error');
        const phoneError = document.getElementById('phone-error');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        showError(emailError, emailInput, 'Please provide either an email address or phone number');
        showError(phoneError, phoneInput, 'Please provide either an email address or phone number');
        isValid = false;
    }

    return isValid;
}