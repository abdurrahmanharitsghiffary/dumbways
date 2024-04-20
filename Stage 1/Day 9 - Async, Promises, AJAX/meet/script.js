console.log("H1");

setTimeout(() => {
  console.log("H3");
}, 0);

console.log("H2");

const promise = new Promise((resolve, reject) => {
  const isSudahPinjamSeratus = false;

  if (isSudahPinjamSeratus) return resolve("Terimaksih bang!");
  return reject("Bro pinjam seratus!");
});

console.log(promise);

promise.then((value) => console.log(value)).catch((err) => console.log(err));

const getPromiseResult = async () => {
  try {
    const result = await promise;
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

getPromiseResult();
