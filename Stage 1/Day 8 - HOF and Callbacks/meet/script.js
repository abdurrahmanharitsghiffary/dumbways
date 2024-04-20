const numbers = [1, 2, 3, 4, 5];

// numbers.forEach((n, i) => {
//   numbers[i] = n * 2;
// });

// console.log(numbers);

const newNumbers = numbers.map((n) => n * 2);

console.log(newNumbers);

console.log(4 % 2 === 1);

const oddNumbers = numbers.filter((n) => n % 2 === 1);

console.log(oddNumbers);

const projects = [
  "<li>JAJAJAKOJA</li>",
  "<li>JAJAJAKOJA</li>",
  "<li>JAJAJAKOJA</li>",
];

const lists = projects.reduce((previousProject, currentProject) => {
  return previousProject + currentProject;
}, "");

console.log(lists);

// Custom HOF
const readDocument = (func) => {
  func(document);
};

readDocument((document) => {
  console.log(document.getElementById("pe").textContent);
});

const init = () => {
  const form = document.getElementById("formik");

  const onSubmit = (cb) => (e) => {
    e.preventDefault();
    cb(e);
  };

  return (cb) => {
    cb(form, onSubmit);
  };
};

const formInit = init();

formInit((form, submitHandler) => {
  form.addEventListener(
    "submit",
    submitHandler((e) => {
      console.log("Its Works!");
    })
  );
  console.log(form, submitHandler);
});

class SuperClass {}
