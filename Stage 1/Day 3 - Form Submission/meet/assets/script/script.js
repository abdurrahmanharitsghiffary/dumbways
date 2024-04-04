const contactForm = document.getElementById("contact-form");
const name = document.getElementById("name");
["name", "email", "subject", "phone", "message"].forEach((id) => {
  const el = document.querySelector("#" + id);
  el.addEventListener("change", (e) => {
    name.value = e.target.value;
    if (e.target.value) {
      clearErrorMessage(".error-message." + id);
    }
  });
});

const getFormValue = (selector) => {
  return document.querySelector(selector).value;
};

const submitHandler = (e) => {
  isFirstSubmitted = true;
  e.preventDefault();

  const name = getFormValue("#name");
  const email = getFormValue("#email");
  const phone = getFormValue("#phone");
  const subject = getFormValue("#subject");
  const message = getFormValue("#message");

  const data = { name, email, phone, subject, message };

  let isError = false;

  Object.entries(data).forEach(([key, value]) => {
    if (!value || value === "") {
      showErrorMessage(`.error-message.${key}`, `please enter your ${key}!`);
      isError = true;
    }
  });

  if (isError) return;

  const myEmail = "abdmanharits@gmail.com";

  let a = document.createElement("a");
  a.href = `https://mail.google.com/mail?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${message}`;
  a.click();

  console.log(data);
};

const showErrorMessage = (selector, errorMessage) => {
  const paragraph = document.querySelector(selector);

  paragraph.innerHTML = errorMessage;
};

const clearErrorMessage = (selector) => {
  const p = document.querySelector(selector);
  p.innerHTML = "";
};

contactForm.addEventListener("submit", submitHandler);
