const header = document.getElementById("navbar-container");
const links = [
  { src: "./index.html", label: "Home" },
  { src: "./myProject.html", label: "Add Project" },
  { src: "./testimonial.html", label: "Testimonials" },
];

const navInit = () => {
  header.innerHTML = `
  <nav class="navbar sticky-top navbar-expand-lg bg-light shadow-sm">
  <div class="container-fluid">
    <img src="./assets/img/du.png" width="50px" alt="Dumbways icon" class="navbar-brand" />
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        ${links
          .map(
            (link) => `<li class="nav-item">
        <a href="${link.src}" class="nav-link text-dark">${link.label}</a>
    </li>`
          )
          .join("")}
      </ul>
      <a href="./contactForm.html" class="btn btn-dark">
        Contact Me
      </a>
    </div>
  </div>
</nav>
`;
};

navInit();

// const burgerButton = header.querySelector(".burger-button");
// const navDropdown = header.querySelector(".nav-dropdown");
// const span1 = burgerButton.querySelector("span:first-child");
// const span2 = burgerButton.querySelector("span:nth-child(2)");
// const span3 = burgerButton.querySelector("span:last-child");

// burgerButton.addEventListener("click", (e) => {
//   navDropdown.classList.toggle("active");
//   burgerButton.classList.toggle("active");
// });
