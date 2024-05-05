const passwordErrorMessage = "Password must be at least 8 characters or more.";
const invalidEmailMessage = "Invalid email address.";

const clearError = (id) => {
  clearErrorMessage(`#${id} + .text-danger, #${id}-input + .text-danger`);
  clearFieldError(`#${id}`);
};

const showError = (id, message) => {
  showFieldError(`#${id}`);
  showErrorMessage(
    `#${id} + .text-danger, #${id}-input + .text-danger`,
    message
  );
};

const onInputEmailChange = (inputId) => (e) => {
  if (e.target.value) {
    const isValidEmail = validateEmail(e.target.value);
    if (!isValidEmail) {
      // showError("email", invalidEmailMessage);
      return;
    }
    clearError(inputId);
  }
};

const onInputPasswordChange = (inputId) => (e) => {
  if (e.target.value) {
    const isValidPassword = validatePassword(e.target.value);
    if (!isValidPassword) {
      // showError("password", passwordErrorMessage);
      return;
    }
    clearError(inputId);
  }
};
