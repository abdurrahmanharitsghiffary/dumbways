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

  return `<div class="card mw-100 overflow-hidden">
    <header class="card-header p-0">
    <img
    src="${src}"
    alt="${title}"
    />
    </header>
    <div class="card-body position-relative">
    <div class="title">
    <h3 class="fw-bold">${title}</h3>
    <p>Duration: ${duration}</p>
    </div>
      <p>
        ${description}
      </p>
      <p class="fw-bold fs-4">Technologies</p>
      <ul class="icon-list">
        ${technologies
          .map(
            (tech) =>
              `<li style="width:28px; height:28px;" class="d-flex justify-content-center align-items-center">${techIcons[tech]}</li>`
          )
          .join("")}
      </ul>
      <a href="${currentUrl.href}" style="position:absolute; inset:0;"></a>
    </div>
    <footer class="card-footer" data-projectid="${id}">
    <button class="btn btn-dark fw-bold icon">
    <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="btn btn-dark fw-bold icon" data-action="delete">
    <i class="fa-solid fa-trash"></i>
    </button>
    <button class="btn btn-dark fw-bold" data-action="edit">
        Edit
      </button>
      <button class="btn btn-dark fw-bold" data-action="delete">
        Delete
      </button>
    </footer>
    </div>`;
};
