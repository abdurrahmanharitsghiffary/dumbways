const form = document.getElementById("registerForm");

document
  .getElementById("password")
  .addEventListener("input", onInputPasswordChange("password"));

document
  .getElementById("email")
  .addEventListener("input", onInputEmailChange("email"));

document.getElementById("username").addEventListener("input", (e) => {
  if (e.target.value) clearError("username");
});

const onSubmit = async (e) => {
  e.preventDefault();
  let isInvalid = false;

  const username = getInputValue("#username");
  const email = getInputValue("#email");
  const password = getInputValue("#password");

  Object.entries({ username, email, password }).forEach(([key, v]) => {
    if (v) return;

    console.log([key, v]);
    isInvalid = true;
    showError(key, `${toUpperFirst(key)} must not be empty`);
  });

  if (email) {
    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      isInvalid = true;
      showError("email", invalidEmailMessage);
    }
  }

  if (password) {
    const isPasswordValid = validatePassword(password);

    if (!isPasswordValid) {
      isInvalid = true;
      showError("password", passwordErrorMessage);
    }
  }
  console.log(isInvalid);
  if (isInvalid) return;

  e.target.submit();
};

form.addEventListener("submit", onSubmit);
