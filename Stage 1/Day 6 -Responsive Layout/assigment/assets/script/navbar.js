const burgerButton = document.querySelector(".burger-button");
const navDropdown = document.querySelector(".nav-dropdown");
const span1 = burgerButton.querySelector("span:first-child");
const span2 = burgerButton.querySelector("span:nth-child(2)");
const span3 = burgerButton.querySelector("span:last-child");

burgerButton.addEventListener("click", (e) => {
  navDropdown.classList.toggle("active");
  burgerButton.classList.toggle("active");
});
