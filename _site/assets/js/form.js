// Real-time validation
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form'); // Changed from '.contact-form' to '.form'
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const enquiryTypeInput = document.getElementById('enquiry-type');
    const messageInput = document.getElementById('message');

    // Check if form exists before adding event listeners
    if (!form) {
        console.warn('Contact form not found');
        return;
    }

    // Name validation on input
    if (nameInput) {
        nameInput.addEventListener('input', function () {
            validateName(this.value);
        });
    }

    // Email validation on input
    if (emailInput) {
        emailInput.addEventListener('input', function () {
            validateEmail(this.value);
        });
    }

    // Phone validation on input
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            validatePhone(this.value);
        });
    }

    // Enquiry type validation on change
    if (enquiryTypeInput) {
        enquiryTypeInput.addEventListener('change', function () {
            validateEnquiryType(this.value);
        });
    }

    // Message character count and validation
    if (messageInput) {
        messageInput.addEventListener('input', function () {
            updateCharacterCount(this.value);
            validateMessage(this.value);
        });
    }

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

function validateName(name) {
    const nameError = document.getElementById('name-error');
    const nameInput = document.getElementById('name');

    if (!nameError || !nameInput) return true;

    if (!name.trim()) {
        showError(nameError, nameInput, 'Please enter your name');
        return false;
    }

    clearError(nameError, nameInput);
    return true;
}

function validateEmail(email) {
    const emailError = document.getElementById('email-error');
    const emailInput = document.getElementById('email');

    if (!emailError || !emailInput) return true;

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

    if (!phoneError || !phoneInput) return true;

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

function validateEnquiryType(enquiryType) {
    const enquiryTypeError = document.getElementById('enquiry-type-error');
    const enquiryTypeInput = document.getElementById('enquiry-type');

    if (!enquiryTypeError || !enquiryTypeInput) return true;

    if (!enquiryType) {
        showError(enquiryTypeError, enquiryTypeInput, 'Please select an enquiry type');
        return false;
    }

    clearError(enquiryTypeError, enquiryTypeInput);
    return true;
}

function showError(errorElement, inputElement, message) {
    if (!errorElement || !inputElement) return;
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputElement.classList.add('error');
    inputElement.classList.remove('valid');
}

function clearError(errorElement, inputElement) {
    if (!errorElement || !inputElement) return;
    
    errorElement.style.display = 'none';
    inputElement.classList.remove('error');
    inputElement.classList.add('valid');
}

function validateForm() {
    let isValid = true;

    // Get form values
    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const enquiryType = document.getElementById('enquiry-type')?.value || '';
    const message = document.getElementById('message')?.value.trim() || '';

    // Validate name
    if (!validateName(name)) {
        isValid = false;
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
        isValid = false;
    }

    // Validate phone if provided
    if (phone && !validatePhone(phone)) {
        isValid = false;
    }

    // Validate enquiry type
    if (!validateEnquiryType(enquiryType)) {
        isValid = false;
    }

    // Validate message
    if (!message) {
        const messageError = document.getElementById('message-error');
        const messageInput = document.getElementById('message');
        showError(messageError, messageInput, 'Please enter a message');
        isValid = false;
    } else if (message.length >= 2000) {
        const messageError = document.getElementById('message-error');
        const messageInput = document.getElementById('message');
        showError(messageError, messageInput, 'Message cannot exceed 2000 characters');
        isValid = false;
    } else {
        const messageError = document.getElementById('message-error');
        const messageInput = document.getElementById('message');
        clearError(messageError, messageInput);
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

function validateMessage(message) {
    const messageError = document.getElementById('message-error');
    const messageInput = document.getElementById('message');

    if (!messageError || !messageInput) return true;

    if (!message.trim()) {
        showError(messageError, messageInput, 'Please enter a message');
        return false;
    }

    if (message.length >= 2000) {
        showError(messageError, messageInput, 'Message cannot exceed 2000 characters');
        return false;
    }

    clearError(messageError, messageInput);
    return true;
}

function updateCharacterCount(text) {
    const characterCount = document.getElementById('message-character-count');
    if (!characterCount) return;

    const currentLength = text.length;
    const maxLength = 2000;

    characterCount.textContent = `${currentLength} / ${maxLength} characters`;

    // Change color when approaching or reaching limit
    if (currentLength >= maxLength) {
        characterCount.style.color = '#dc3545'; // Red when at limit
    } else if (currentLength >= maxLength * 0.9) {
        characterCount.style.color = '#ffc107'; // Yellow when at 90%
    } else {
        characterCount.style.color = '#666'; // Default gray
    }
}