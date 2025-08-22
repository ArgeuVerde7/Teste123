// passwordValidator.js

/**
 * Validates a password based on several criteria.
 * @param {string} password The password to validate.
 * @returns {object} An object with a 'isValid' boolean and an array of 'errors'.
 */
function validatePassword(password) {
  const errors = [];
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check if the password is a string
  if (typeof password !== 'string') {
    errors.push('Password must be a string.');
    return { isValid: false, errors };
  }
  
  // Check for minimum length
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long.`);
  }

  // Check for character types
  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter.');
  }
  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter.');
  }
  if (!hasNumber) {
    errors.push('Password must contain at least one number.');
  }
  if (!hasSpecialChar) {
    errors.push('Password must contain at least one special character (!@#$%^&*).');
  }

  return { 
    isValid: errors.length === 0, 
    errors 
  };
}

module.exports = validatePassword;
