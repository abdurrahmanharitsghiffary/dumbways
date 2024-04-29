const character = {
  name: "Abdurrahman Harits",
  defense: 20,
  hp: 100,
};

const enemy = {
  hp: 100,
  power: 50,
  defense: 20,
};

const calculatedDamage = enemy.power - character.defense;

const remainingCharacterHp = character.hp - calculatedDamage;

console.log("Character:", JSON.stringify(character));

character.hp = remainingCharacterHp;

console.log("Damage received:", calculatedDamage);
console.log("Remaining hp:", character.hp);
