const cows = [
  { name: "Sapi", weightInKg: 566 },
  { name: "Sepi", weightInKg: 547 },
  { name: "Sopi", weightInKg: 553 },
  { name: "Sipi", weightInKg: 594 },
  { name: "Supi", weightInKg: 573 },
];
const totalDays = 7;

const copiedCows = cows.slice();

const getAverageCowsWeight = (totalWeight, totalCows) => {
  return totalWeight / totalCows;
};

const sumTotalCowsWeight = (cows) => {
  let n = 0;
  for (let i = 0; i < cows.length; i++) {
    n += cows[i].weightInKg;
  }
  return n;
};

// mendapatkan rumput yg dimakan sapi perhari berdasar kg
const getConsumedGrassPerDay = (w) => {
  return (w * 10) / 100;
};

console.log(
  getAverageCowsWeight(
    sumTotalCowsWeight(JSON.parse(JSON.stringify(cows))),
    cows.length
  )
);

for (let di = 1; di <= totalDays; di++) {
  for (let i = 0; i < cows.length; i++) {
    // rumput yg akan dimakan perhari berdasarkan 10% bb sapi
    const consumedGrassPerDay = getConsumedGrassPerDay(cows[i].weightInKg);
    // Berat badan yg akan naik berdasarkan 2% rumput yg dimakan.
    const increasedWeight = (consumedGrassPerDay * 2) / 100;
    cows[i].weightInKg += increasedWeight;
  }
}

const totalWeightInDay7 = sumTotalCowsWeight(cows);

console.log(cows);

const averageCowsWeightInDay7 = getAverageCowsWeight(
  totalWeightInDay7,
  cows.length
);

console.log(averageCowsWeightInDay7);
