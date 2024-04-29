const url = new URL(window.location.href);

const techIcons = {
  nodejs: {
    label: "Node JS",
    icon: `<i class="fa-brands fa-node-js" style="color: #3c873a;"></i>`,
  },
  react: {
    label: "React JS",
    icon: `<i class="fa-brands fa-react" style="color: #61dbfb;"></i>`,
  },
  nextjs: { label: "Next JS", icon: `<img src="./assets/img/nextjs.svg" />` },
  ts: {
    label: "Typescript",
    icon: `<img src="./assets/img/typescript.svg" />`,
  },
};

const redirectToMyProjectForm = () => {
  url.pathname = "/myProject.html";
  window.location.href = url.href;
  return;
};

const detailInit = async () => {
  const id = Number(url.searchParams.get("id"));
  if (!id) return redirectToMyProjectForm();

  const { read } = await openDbConnection();
  const { data } = await read(id);

  console.log(data);

  if (data?.length === 0) {
    return redirectToMyProjectForm();
  }

  renderDetails(data?.[0]);
};

// detailInit();

const renderDetails = (data) => {
  const { projectName, description, technologies, image, endDate, startDate } =
    data;

  const stDate = new Date(startDate);
  const enDate = new Date(endDate);

  const duration = getFormattedDuration(getDuration(startDate, endDate));

  const h1 = document.querySelector(".container h1");
  const p = document.querySelector(".content p");
  const techList = document.querySelector(".tech-lists");
  const durationSection = document.querySelector("#duration");
  const projectImage = document.querySelector(".header img");

  h1.innerHTML = projectName;
  p.innerHTML = description;
  durationSection.children.item(
    1
  ).innerHTML = `<i class="fa-regular fa-calendar"></i>
  <p>${stDate.toDateString()} - ${enDate.toDateString()}</p>`;
  durationSection.children.item(
    2
  ).innerHTML = `<i class="fa-regular fa-clock"></i>
  <p>Duration: ${duration}</p>`;
  projectImage.setAttribute("src", image);
  projectImage.setAttribute("alt", projectName);
  techList.innerHTML = technologies
    .map(
      (t) => `<li>
  ${techIcons[t].icon}
  <p>${techIcons[t].label}</p>
  </li>`
    )
    .join("");
};
