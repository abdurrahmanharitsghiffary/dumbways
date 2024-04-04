const contactForm = document.getElementById("contact-form");

const baseErrorMessageClass = ".error-message";
const fields = ["name", "email", "phone", "subject", "message"];
const myEmail = "abdmanharits@gmail.com";

fields.forEach((field) => {
  const el = document.getElementById(field);

  const onChange = (e) => {
    el.value = e.target.value;
    console.log(el.value, "Value");
    if (el.value) {
      clearFieldError("#" + field);
      clearErrorMessage(".error-message." + field);
    }
  };

  el.addEventListener("change", onChange);
});

const onSubmit = (e) => {
  e.preventDefault();

  const data = {};
  let isInvalid = false;

  fields.forEach((field) => {
    data[field] = getInputValue("#" + field);
  });

  Object.entries(data).forEach(([key, value]) => {
    if (value === "" || !value || value === undefined) {
      isInvalid = true;

      showErrorMessage(
        ".error-message." + key,
        `${key} field must not be empty.`
      );
      showFieldError("#" + key);
    }
  });

  if (isInvalid) {
    contactForm.querySelector(".input-wrapper .error").focus();
    return;
  }

  const a = document.createElement("a");
  a.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${data.subject}&body=${data.message}`;

  a.click();

  console.log(data, "Data");

  fields.forEach((field) => {
    clearInputValue("#" + field);
  });
};

const getInputValue = (selector) => document.querySelector(selector).value;

const showFieldError = (selector) =>
  document.querySelector(selector).classList.add("error");

const clearFieldError = (selector) =>
  document.querySelector(selector).classList.remove("error");

const showErrorMessage = (selector, errorMessage) =>
  (document.querySelector(selector).innerHTML = errorMessage);

const clearInputValue = (selector) =>
  (document.querySelector(selector).value = "");

const clearErrorMessage = (selector) =>
  (document.querySelector(selector).innerHTML = "");

contactForm.addEventListener("submit", onSubmit);

("https://mail.google.com/mail/?view=cm&fs=1&to=someone@example.com&su=SUBJECT&body=BODY&bcc=someone.else@example.com");
