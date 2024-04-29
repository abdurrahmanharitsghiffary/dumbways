const contactForm = document.getElementById("contact-form");

const fieldIds = ["name", "email", "phone", "subject", "message"];
const myEmail = "abdmanharits@gmail.com";

fieldIds.forEach((field) => {
  const el = document.getElementById(field);

  const onChange = (e) => {
    el.value = e.target.value;

    if (el.type === "email") {
      if (validateEmail(el.value)) {
        clearFieldError(`#email`);
        clearErrorMessage(`#email + .text-danger`);
      }
      return;
    }

    if (el.value) {
      clearFieldError("#" + field);
      clearErrorMessage(`#${field} + .text-danger`);
    }
  };

  el.addEventListener("input", onChange);
});

const onSubmit = (e) => {
  e.preventDefault();

  const data = {};
  let isInvalid = false;

  fieldIds.forEach((field) => {
    data[field] = getInputValue("#" + field);
  });

  Object.entries(data).forEach(([key, value]) => {
    if (key === "email") {
      if (!validateEmail(value)) {
        isInvalid = true;
        showErrorMessage(
          `#email + .text-danger`,
          `Please enter a valid email address.`
        );
        showFieldError("#email");
        return;
      }
    }

    if (value === "" || !value || value === undefined) {
      isInvalid = true;

      showErrorMessage(
        `#${key} + .text-danger`,
        `${key} field must not be empty.`
      );
      showFieldError("#" + key);
    }
  });

  if (isInvalid) {
    contactForm.querySelector("div input.is-invalid").focus();
    return;
  }

  window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${data.subject}&body=${data.message}`;

  fieldIds.forEach((field) => {
    clearInputValue("#" + field);
  });
};

contactForm.addEventListener("submit", onSubmit);
