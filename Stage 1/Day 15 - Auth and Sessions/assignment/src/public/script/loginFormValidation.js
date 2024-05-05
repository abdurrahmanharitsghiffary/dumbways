const form = document.getElementById("loginForm");
console.log(form);
document.getElementById("password").addEventListener("input", (e) => {
  if (e.target.value) {
    clearError("password");
  }
});

document
  .getElementById("email")
  .addEventListener("input", onInputEmailChange("email"));

const onSubmit = async (e) => {
  e.preventDefault();
  let isInvalid = false;

  const email = getInputValue("#email");
  const password = getInputValue("#password");

  if (!email) {
    isInvalid = true;
    showError("email", "Email must not be empty.");
  }
  if (!password) {
    isInvalid = true;
    showError("password", "Password must not be empty.");
  }

  const isValidEmail = validateEmail(email);
  //   const isValidPassword = validatePassword(password);

  if (email && !isValidEmail) {
    isInvalid = true;
    showError("email", "Invalid email address");
  }

  //   if (password && !isValidPassword) {
  //     isInvalid = true;
  //     showError("password", "Invalid password");
  //   }

  if (isInvalid) return;

  form.submit();
};

form.addEventListener("submit", onSubmit);
