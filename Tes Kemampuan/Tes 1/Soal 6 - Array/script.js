const books = [
  { title: "Harry Potter I", price: 300000, author: "J.K. Rowling" },
  { title: "Harry Potter II", price: 420000, author: "J.K. Rowling" },
  {
    title: "Harry Potter - Goblet of Fire",
    price: 350000,
    author: "J.K. Rowling",
  },
  {
    title: "Harry Potter - Prisoner of Azkaban",
    price: 120000,
    author: "J.K. Rowling",
  },
  { title: "Hafalan Sholat Delisa", price: 250000, author: "Tere Liye" },
  {
    title: "Rembulan tenggelam di wajahmu",
    price: 220000,
    author: "Tere Liye",
  },
  { title: "Jujutsu Kaisen Vol. 1", price: 200000, author: "Gege Akuntansi" },
  { title: "Jujutsu Kaisen Vol. 2", price: 230000, author: "Gege Akuntansi" },
  { title: "Jujutsu Kaisen Vol. 3", price: 260000, author: "Gege Akuntansi" },
  {
    title: "86 - Eighty Six Vol. 1",
    price: 99999999999999999999999,
    author: "Asato Asato",
  },
];

const getHighestBookPrice = (books) => {
  let bookWithHighestPrice = null;

  books.forEach((book) => {
    if ((bookWithHighestPrice?.price ?? 0) < book.price) {
      bookWithHighestPrice = book;
    }
  });

  return bookWithHighestPrice;
};

const bookWithHighestPrice = getHighestBookPrice(books);

console.log(bookWithHighestPrice);
