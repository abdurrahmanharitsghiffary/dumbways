const ProjectCard = ({
  id,
  src,
  title,
  description,
  technologies,
  startDate,
  endDate,
}) => {
  const currentUrl = new URL(window.location.href);

  const duration = getFormattedDuration(getDuration(startDate, endDate));

  currentUrl.pathname = "/projectDetail.html";

  currentUrl.searchParams.set("id", id);

  return `<div class="card-project">
    <header class="card-header">
    <img
    src="${src}"
    alt="${title}"
    />
    </header>
    <div class="card-body">
    <div class="title">
    <h2 >${title}</h2>
    <p >Duration: ${duration}</p>
    </div>
      <p >
        ${description}
      </p>
      <h3>Technologies</h3>
      <ul class="icon-list">
        ${technologies.map((tech) => `<li>${techIcons[tech]}</li>`).join("")}
      </ul>
      <a href="${currentUrl.href}" style="position:absolute; inset:0;"></a>
    </div>
    <footer class="card-footer" data-projectid="${id}">
    <button class="button button-dark fw-bold r-sm icon">
    <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="button button-dark fw-bold r-sm icon" data-action="delete">
    <i class="fa-solid fa-trash"></i>
    </button>
    <button class="button button-dark fw-bold r-sm fullwidth">
        Edit
      </button>
      <button class="button button-dark fw-bold r-sm fullwidth" data-action="delete">
        Delete
      </button>
    </footer>
    </div>`;
};
