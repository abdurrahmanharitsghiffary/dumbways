const findFruitsByType = (fruits, func) => {
  return fruits.filter((fruit) => {
    const lowerCasedType = fruit.type.toLowerCase();
    return func(lowerCasedType).toLowerCase() === lowerCasedType;
  });
};

const fruits = [
  { name: "Cherry apple", type: "apple" },
  { name: "Fuji", type: "apple" },
  { name: "Red delicious", type: "apple" },
  { name: "Golden delicious", type: "apple" },
  { name: "Melon cantaloupe", type: "melon" },
  { name: "Melon casaba", type: "melon" },
  { name: "Pisang Raja", type: "banana" },
  { name: "Red Banana", type: "banana" },
  { name: "Cavendish banana", type: "banana" },
  { name: "Chelan Cherry", type: "cherry" },
  { name: "Cabernet Sauvignon", type: "grape" },
  { name: "Grenache", type: "grape" },
];

const appleFruits = findFruitsByType(fruits, (name) => {
  return "apPle";
});

const grapeFruits = findFruitsByType(fruits, (name) => {
  return "baNaNa";
});

const melonFruits = findFruitsByType(fruits, (name) => {
  return "MeLON";
});

console.log(appleFruits);
console.log(grapeFruits);
console.log(melonFruits);
