const contactForm = document.getElementById("add-project-form");

const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

const projects = [];

const CLEAR_AFTER_SUBMIT = false;
const sampleProjects = [
  {
    projectName: "Project 1",
    image:
      "https://plus.unsplash.com/premium_photo-1685082778205-8665f65e8c2c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    startDate: "2024-12-03T03:24:00",
    endDate: "2024-12-04T03:25:00",
    description:
      "Project pertama sayakpkpkpkpkpkpkpkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
    technologies: ["ts"],
  },
  {
    projectName: "Project 1",
    image:
      "https://plus.unsplash.com/premium_photo-1685082778205-8665f65e8c2c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    startDate: "2023-12-03T03:24:00",
    endDate: "2024-12-04T03:25:00",
    description: "Project pertama saya",
    technologies: ["ts", "nodejs"],
  },
  {
    projectName: "Project 1",
    image:
      "https://plus.unsplash.com/premium_photo-1685082778205-8665f65e8c2c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    startDate: "2024-12-03T03:24:10",
    endDate: "2024-12-04T03:25:50",
    description: "Project pertama saya",
    technologies: ["ts"],
  },
  {
    projectName: "Project 1",
    image:
      "https://plus.unsplash.com/premium_photo-1685082778205-8665f65e8c2c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    startDate: "2024-12-03",
    endDate: "2024-12-04",
    description: "Project pertama saya",
    technologies: ["ts"],
  },
];

const fieldIds = [
  "projectName",
  "endDate",
  "startDate",
  "description",
  "image",
];
const checkboxIds = ["nodejs", "nextjs", "react", "ts"];

const errorMessage = {
  empty: (key) => `${key} must not be empty.`,
  startDateHigherThanEndDate:
    "Start date must not be higher or equal than end date.",
  techCheckbox: "Must be at least checked one box.",
  endDateLowerThanStartDate:
    "End date must not be lower or equal than start date.",
};

[...fieldIds, ...checkboxIds].forEach((field) => {
  const el = document.getElementById(field);
  const isCheckbox = el.getAttribute("type") === "checkbox";
  const isStartDateOrEndDate = ["startDate", "endDate"].some(
    (v) => el.id === v
  );

  const onChange = (e) => {
    e.preventDefault();
    if (isCheckbox && el.checked && !isStartDateOrEndDate) {
      clearErrorMessage("#technologies + .error-message");
    }
    if (el.value && !isCheckbox) {
      clearFieldError("#" + field);
      clearErrorMessage(`#${field} + .error-message`);
    }
  };

  if (isStartDateOrEndDate) return;

  el.addEventListener("change", onChange);
});

const onSubmit = (e) => {
  e.preventDefault();

  const data = { technologies: [] };
  let isInvalid = false;

  fieldIds.forEach((field) => {
    data[field] = getInputValue("#" + field);
  });

  checkboxIds.forEach((field) => {
    const isChecked = getIsChecked("#" + field);
    if (isChecked) data.technologies.push(field);
  });

  Object.entries(data).forEach(([key, value]) => {
    const isValueEmpty = value === "" || !value || value === undefined;

    if (isValueEmpty) {
      isInvalid = true;

      showErrorMessage(`#${key} + .error-message`, errorMessage.empty(key));
      showFieldError("#" + key);
    }
  });

  if (data.startDate >= data.endDate) {
    isInvalid = true;
    showErrorMessage(
      "#startDate + p.error-message",
      errorMessage.startDateHigherThanEndDate
    );
    showErrorMessage(
      "#endDate + p.error-message",
      errorMessage.endDateLowerThanStartDate
    );
    showFieldError("#startDate");
    showFieldError("#endDate");
  }

  if (data.technologies.length < 1) {
    isInvalid = true;
    showErrorMessage(
      "#technologies + .error-message",
      errorMessage.techCheckbox
    );
  }

  if (isInvalid) {
    contactForm.querySelector(".input-wrapper .error").focus();
    return;
  }

  projects.unshift(data);
  renderProjects();

  if (CLEAR_AFTER_SUBMIT) {
    fieldIds.forEach((field) => {
      clearInputValue("#" + field);
    });
    checkboxIds.forEach((field) => {
      document.getElementById(field).checked = false;
    });
  }
};

const clearDateError = () => {
  clearFieldError("#startDate");
  clearFieldError("#endDate");
  clearErrorMessage("#startDate + .error-message");
  clearErrorMessage("#endDate + .error-message");
};

const onDateChange = (e) => {
  const isStartDateLowerThanEndDate = startDateInput.value < endDateInput.value;
  if (isStartDateLowerThanEndDate) {
    clearDateError();
  }
};

startDateInput.addEventListener("change", onDateChange);
endDateInput.addEventListener("change", onDateChange);
contactForm.addEventListener("submit", onSubmit);

const getInputValue = (selector) => {
  const el = document.querySelector(selector);

  if (el.type === "file" && el?.files?.[0]) {
    return URL.createObjectURL(el.files?.[0]);
  } else {
    return el.value;
  }
};
const getIsChecked = (selector) =>
  document.querySelector(selector).checked ? true : false;

const showFieldError = (selector) =>
  document.querySelector(selector).classList.add("error");

const clearFieldError = (selector) =>
  document.querySelector(selector).classList.remove("error");

const showErrorMessage = (selector, errorMessage) =>
  (document.querySelector(selector).innerHTML = errorMessage);

const clearInputValue = (selector) =>
  (document.querySelector(selector).value = "");

const clearErrorMessage = (selector) =>
  (document.querySelector(selector).innerHTML = "");

const renderProjects = () => {
  const el = document.getElementById("project-lists");
  el.innerHTML = "";

  if (projects.length > 0 || sampleProjects.length > 0) {
    el.innerHTML = [...projects, ...sampleProjects]
      .map((project) =>
        ProjectCard({
          src: project.image,
          title: project.projectName,
          description: project.description,
          technologies: project.technologies,
          endDate: project.endDate,
          startDate: project.startDate,
        })
      )
      .join("");
  }
};

const techIcons = {
  nodejs: `<i class="fa-brands fa-node-js" style="color: #3c873a;"></i>`,
  react: `<i class="fa-brands fa-react" style="color: #61dbfb;"></i>`,
  nextjs: `<img src="./assets/img/nextjs.svg"s />`,
  ts: `<img src="./assets/img/typescript.svg" />`,
};

const ProjectCard = ({
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

  currentUrl.searchParams.set("title", title);
  currentUrl.searchParams.set("desc", description);
  currentUrl.searchParams.set("d", duration);
  currentUrl.searchParams.set("tech", technologies.join(","));
  currentUrl.searchParams.set("img", src);
  currentUrl.searchParams.set("es-date", startDate + "," + endDate);

  return `<div class="card-project">
  <header class="card-header">
    <img
      src="${src}"
      alt="${title}"
    />
  </header>
  <div class="card-body">
  <div class="title">
  <h2>${title}</h2>
  <p>Duration: ${duration}</p>
  </div>
    <p>
      ${description}
    </p>
    <h3>Technologies</h3>
    <ul class="icon-list">
      ${technologies.map((tech) => `<li>${techIcons[tech]}</li>`).join("")}
    </ul>
    <a class="detail-link" href="${currentUrl.href}"></a>
  </div>
  <footer class="card-footer">
  <button class="button button-dark fw-bold r-sm icon">
  <i class="fa-solid fa-pen-to-square"></i>
  </button>
  <button class="button button-dark fw-bold r-sm icon">
  <i class="fa-solid fa-trash"></i>
  </button>
  <button class="button button-dark fw-bold r-sm fullwidth">
      Edit
    </button>
    <button class="button button-dark fw-bold r-sm fullwidth">
      Delete
    </button>
  </footer>
  </div>`;
};
const getDuration = (stDate, endDate) => {
  const start = new Date(stDate);
  const end = new Date(endDate);
  const t = end.getTime() - start.getTime();

  const durrInY = t / (1000 * 60 * 60 * 24 * 30.44 * 12);

  const diffY = durrInY - Math.floor(durrInY);
  const month = diffY * 12;

  const diffM = month - Math.floor(month);
  const day = diffM * 30.44;

  const diffD = day - Math.floor(day);
  const hour = diffD * 24;

  const diffH = hour - Math.floor(hour);
  const minute = diffH * 60;

  const diffMin = minute - Math.floor(minute);

  const second = diffMin * 60;

  return {
    year: Math.floor(durrInY),
    month: Math.floor(month),
    day: Math.floor(day),
    hour: Math.floor(hour),
    minute: Math.floor(minute),
    second: Math.floor(second),
  };
};

const getFormattedDuration = (durr) => {
  let count = 0;
  let durrStr = [];

  Object.entries(durr).forEach(([key, value]) => {
    if (value > 0 && count <= 2) {
      durrStr.push(`${value} ${value > 1 ? key + "s" : key}`);
      count++;
    }
  });

  return durrStr.join(", ");
};

renderProjects();

let db;
const request = window.indexedDB.open("MyProjects", 1);

request.onupgradeneeded = (e) => {
  console.log("lol");
};

request.onerror = (e) => {
  console.error(e.target.errorCode);
};

request.onsuccess = (e) => {
  db = e.target.result;
  console.log(e.target.result);
};
console.log(db);
if (db)
  db.onerror = (e) => {
    console.error(e.target.errorCode);
  };
