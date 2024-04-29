const header = document.getElementById("navbar-container");

const navInit = () => {
  header.innerHTML = `
<nav class="navbar">
  <ul class="nav-list">
    <li>
      <img
        src="./assets/img/du.png"
        alt="Dumbways icon"
        class="nav-brand"
      />
    </li>
    <li>
      <a href="./index.html" class="nav-link">Home</a>
    </li>
    <li>
      <a href="./myProject.html" class="nav-link">My Project</a>
    </li>
    <li>
     <a href="./testimonial.html" class="nav-link">Testimonials</a>
    </li>
  </ul>
  <a href="./contactForm.html" class="contact-button">Contact Me</a>
  <button class="burger-button">
    <span> </span>
    <span> </span>
    <span> </span>
  </button>
</nav>
<div class="nav-dropdown">
  <ul class="dropdown-list">
    <li>
      <a href="./index.html" class="nav-link">Home</a>
    </li>
    <li>
      <a href="./myProject.html" class="nav-link">My Project</a>
    </li>
    <li>
      <a href="./contactForm.html" class="nav-link">Contact Me</a>
    </li>
    <li>
      <a href="./testimonial.html" class="nav-link">Testimonials</a>
    </li>
  </ul>
</div>
`;
};

navInit();

const burgerButton = header.querySelector(".burger-button");
const navDropdown = header.querySelector(".nav-dropdown");
const span1 = burgerButton.querySelector("span:first-child");
const span2 = burgerButton.querySelector("span:nth-child(2)");
const span3 = burgerButton.querySelector("span:last-child");

burgerButton.addEventListener("click", (e) => {
  navDropdown.classList.toggle("active");
  burgerButton.classList.toggle("active");
});
