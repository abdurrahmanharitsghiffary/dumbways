async function deleteProject(e) {
  e.preventDefault();
  const isConfirmed = await bsConfirm({
    title: "Delete Project",
    body: "Are you sure delete this project?",
    confirmLabel: "Delete",
    confirmColor: "btn-danger",
  });
  console.log(isConfirmed, "ISCONFIRMED");
  if (!isConfirmed) return;
  console.log(e.target, "Target");
  e.target.submit();
}
