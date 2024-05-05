document.querySelectorAll("button[data-toggler=password]").forEach((item) => {
  item.addEventListener("click", (e) => {
    const input = item.previousElementSibling;
    console.log(input);
    if (input) {
      if (input.type === "password") {
        input.type = "text";
        item.lastElementChild.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        input.type = "password";
        item.lastElementChild.classList.replace("fa-eye-slash", "fa-eye");
      }
    }
  });
});
