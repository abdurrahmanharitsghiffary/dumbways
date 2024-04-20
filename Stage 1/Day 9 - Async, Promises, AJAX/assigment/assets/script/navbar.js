const header = document.getElementById("navbar-container");

const links = [
  { src: "./index.html", label: "Home" },
  { src: "./myProject.html", label: "My Project" },
  { src: "./testimonial.html", label: "Testimonials" },
];

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
    ${links.map(
      (link) => `<li>
        <a href="${link.src}" class="nav-link">${link.label}</a>
    </li>`
    )}
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
  ${[...links, { src: "./contactForm.html", label: "Contact Me" }].map(
    (link) => `<li>
      <a href="${link.src}" class="nav-link">${link.label}</a>
  </li>`
  )}
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
