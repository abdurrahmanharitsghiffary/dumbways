const getInputValue = (selector) => {
  const el = document.querySelector(selector);

  if (el.type === "file" && el?.files?.[0]) {
    return URL.createObjectURL(el.files?.[0]);
  } else {
    return el.value;
  }
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const getIsChecked = (selector) =>
  document.querySelector(selector).checked ? true : false;

const showFieldError = (selector) =>
  document.querySelector(selector).classList.add("is-invalid");

const clearFieldError = (selector) =>
  document.querySelector(selector).classList.remove("is-invalid");

const showErrorMessage = (selector, errorMessage) =>
  (document.querySelector(selector).innerHTML = errorMessage);

const clearInputValue = (selector) =>
  (document.querySelector(selector).value = "");

const clearErrorMessage = (selector) =>
  (document.querySelector(selector).innerHTML = "");

const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => resolve(fileReader.result);
    fileReader.onerror = (e) => reject(fileReader.error);
  })
    .then((val) => val)
    .catch((err) => err);
