class Car {
  name = "";
  manufactureYear = 0;
  rentPerDay = 0;
  constructor(name, manufactureYear, rentPerDay) {
    this.name = name;
    this.manufactureYear = manufactureYear;
    this.rentPerDay = rentPerDay;
  }
}

const car1 = new Car("Toyota Suzuki Alphard", 2001, 20000);

console.log(car1);
