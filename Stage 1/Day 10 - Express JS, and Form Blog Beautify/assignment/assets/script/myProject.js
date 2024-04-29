const contactForm = document.getElementById("add-project-form");

const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

const CLEAR_AFTER_SUBMIT = true;

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
      clearErrorMessage("#technologies + .text-danger");
    }
    if (el.value && !isCheckbox) {
      clearFieldError("#" + field);
      clearErrorMessage(`#${field} + .text-danger`);
    }
  };

  if (isStartDateOrEndDate) return;

  el.addEventListener("input", onChange);
});

const onDateChange = (e) => {
  const isStartDateLowerThanEndDate = startDateInput.value < endDateInput.value;
  if (isStartDateLowerThanEndDate) {
    clearDateError();
  }
};

startDateInput.addEventListener("change", onDateChange);
endDateInput.addEventListener("change", onDateChange);

const onSubmit = async (e) => {
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

      showErrorMessage(`#${key} + .text-danger`, errorMessage.empty(key));
      showFieldError("#" + key);
    }
  });

  const file = document.getElementById("image")?.files?.[0];
  const base64 = await convertFileToBase64(file);

  if (data.startDate >= data.endDate) {
    isInvalid = true;
    showErrorMessage(
      "#startDate + p.text-danger",
      errorMessage.startDateHigherThanEndDate
    );
    showErrorMessage(
      "#endDate + p.text-danger",
      errorMessage.endDateLowerThanStartDate
    );
    showFieldError("#startDate");
    showFieldError("#endDate");
  }
  if (data.technologies.length < 1) {
    isInvalid = true;
    showErrorMessage(
      "div#technologies + .text-danger",
      errorMessage.techCheckbox
    );
  }

  if (isInvalid) {
    contactForm.querySelector("form input").focus();
    return;
  }

  const { add } = await openDbConnection();
  await add([{ ...data, image: base64 }]);

  await renderProjects();

  if (CLEAR_AFTER_SUBMIT) {
    fieldIds.forEach((field) => {
      clearInputValue("#" + field);
    });
    checkboxIds.forEach((field) => {
      document.getElementById(field).checked = false;
    });
  }
};

contactForm.addEventListener("submit", onSubmit);

const clearDateError = () => {
  clearFieldError("#startDate");
  clearFieldError("#endDate");
  clearErrorMessage("#startDate + .text-danger");
  clearErrorMessage("#endDate + .text-danger");
};

const renderProjects = async () => {
  const { read } = await openDbConnection();
  const { data } = await read();

  if (!data || data?.length === 0) return;

  const reversedData = data.slice().reverse();

  const el = document.getElementById("project-lists");
  el.innerHTML = "";

  el.innerHTML = reversedData
    .map((project) =>
      ProjectCard({
        id: project.id,
        src: project.image,
        title: project.projectName,
        description: project.description,
        technologies: project.technologies,
        endDate: project.endDate,
        startDate: project.startDate,
      })
    )
    .join("");
};

const techIcons = {
  nodejs: `<i class="fa-brands fa-node-js" style="color: #3c873a;"></i>`,
  react: `<i class="fa-brands fa-react" style="color: #61dbfb;"></i>`,
  nextjs: `<img src="./assets/img/nextjs.svg"s />`,
  ts: `<img src="./assets/img/typescript.svg" />`,
};

document.addEventListener("click", async (e) => {
  if (e.target.parentNode.classList.contains("card-footer")) {
    if (e.target.dataset.action === "delete") {
      const { deleteData } = await openDbConnection();
      const id = Number(e.target.parentNode.dataset.projectid);
      if (id) {
        await deleteData([id]);
        await renderProjects();
      }
    }
  }
});

(async () => {
  await renderProjects();
})();

// document.body.addEventListener("click", (e) => {
//   let parent = e.target;
//   while (parent) {
//     if (parent && parent.classList.contains("card-body")) {
//       const data = parent.querySelector(".metadata").dataset;

//       localStorage.setItem("detail", JSON.stringify(data));

//       const currentUrl = new URL(window.location.href);

//       currentUrl.pathname = "/projectDetail.html";

//       window.location.href = currentUrl.href;

//       parent = null;
//     }
//     parent = parent?.parentNode;
//   }
// });

{
  /* <span style="display:none;" class="metadata" data-src="${src}"data-title="${title}"data-duration="${duration}" data-esdate="${
    startDate + "," + endDate
  }"data-description="${description}" data-tech="${technologies.join(
    ","
  )}"></span> */
}
