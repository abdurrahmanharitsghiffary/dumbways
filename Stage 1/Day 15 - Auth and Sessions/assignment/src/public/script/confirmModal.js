const confirmModal = new bootstrap.Modal("#confirmModal", {});
const modal = document.getElementById("confirmModal");

const bsConfirm = async (options) => {
  const opts = {
    title: "Confirm title",
    body: "Confirm body goes here",
    cancelColor: "btn-secondary",
    cancelLabel: "Cancel",
    confirmColor: "btn-primary",
    confirmLabel: "Confirm",
    ...options,
  };

  modal.querySelector(".modal-title").innerHTML = opts.title;
  modal.querySelector(".modal-body p").innerHTML = opts.body;

  const openButton = modal.querySelector("button[data-action=open]");
  openButton.classList.add(opts.confirmColor);
  openButton.innerHTML = opts.confirmLabel;

  const closeButton = modal.querySelector("button[data-action=close]");
  closeButton.classList.add(opts.cancelColor);
  closeButton.innerHTML = opts.cancelLabel;

  return new Promise((resolve, reject) => {
    confirmModal.show();
    openButton.addEventListener("click", (e) => {
      resolve(true);
    });

    modal.addEventListener("hide.bs.modal", (e) => {
      resolve(false);
    });
  }).then((res) => {
    if (res) confirmModal.hide();
    return res;
  });
};
