// const controlledForm = document.querySelector("form[data-control=controlled]");

// const inputs = controlledForm.querySelectorAll(
//   "input:not(input[type=checkbox]), textarea"
// );
// console.log(inputs, "INPUTS");
// inputs.forEach((input, i) => {
//   input.addEventListener("keydown", (e) => {
//     if (e.key === "Enter" && i !== inputs.length - 1) {
//       e.preventDefault();
//       console.log(i);
//       console.log(inputs.length, "Len");
//       const nextInput = inputs[i + 1];
//       nextInput.focus();
//       switch (nextInput.type) {
//         case "file": {
//           nextInput.click();
//           break;
//         }
//         case "datetime-local": {
//           nextInput.showPicker();
//           break;
//         }
//       }
//     } else if (e.key === "Enter" && i === inputs.length - 1) {
//       controlledForm.submit();
//     }
//   });
// });
// experimental
