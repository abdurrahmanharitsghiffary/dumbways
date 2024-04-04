const dataProject = [];
const blogForm = document.getElementById("blog-form");
const blogPosts = document.getElementById("blog-posts");

const onSubmit = (e) => {
  e.preventDefault();
  let isInvalid = false;
  const title = getInputValue("#title");
  const content = getInputValue("#content");
  const file = getInputValue("#file");

  const data = { title, content, image: file };
  Object.entries(data).forEach(([key, value]) => {
    if (value === "") {
      alert(`${key} must not be empty.`);
      isInvalid = true;
    }
  });

  if (isInvalid) return;

  dataProject.push(data);
  dataProject.forEach((data) => {
    console.log(data, "DATa");
    renderPost(data.title, data.content, data.image);
  });
};

const getInputValue = (selector) => document.querySelector(selector).value;

const renderPost = (title, content, image) => {
  const h1 = document.createElement("h1");
  h1.innerHTML = title;

  const p = document.createElement("p");
  p.innerHTML = content;

  const img = document.createElement("img");
  img.src = image;

  const div = document.createElement("div");

  div.appendChild(h1);
  div.appendChild(p);
  div.appendChild(img);

  blogPosts.appendChild(div);
};

blogForm.addEventListener("submit", onSubmit);
