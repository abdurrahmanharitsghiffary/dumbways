const addProjectForm = document.getElementById("project-form");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

const CLEAR_AFTER_SUBMIT = true;

const fieldIds = [
  "title",
  "endDate",
  "startDate",
  "description",
  "projectThumbnail",
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

async function onSubmit(e) {
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

  const file = document.getElementById("projectThumbnail")?.files?.[0];
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
    addProjectForm.querySelector("form input").focus();
    return;
  }

  addProjectForm.submit();

  if (CLEAR_AFTER_SUBMIT) {
    fieldIds.forEach((field) => {
      clearInputValue("#" + field);
    });
    checkboxIds.forEach((field) => {
      document.getElementById(field).checked = false;
    });
  }
}

addProjectForm.addEventListener("submit", onSubmit);

const clearDateError = () => {
  clearFieldError("#startDate");
  clearFieldError("#endDate");
  clearErrorMessage("#startDate + .text-danger");
  clearErrorMessage("#endDate + .text-danger");
};
