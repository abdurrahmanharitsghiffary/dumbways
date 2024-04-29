const getProductDiscountedPrice = (productsTotalPrice) => {
  const discount = 10;
  if (productsTotalPrice > 500000) {
    const totalDiscount = (productsTotalPrice * discount) / 100;
    console.log(totalDiscount);
    const discountedPrice = productsTotalPrice - totalDiscount;
    return discountedPrice;
  } else {
    return productsTotalPrice;
  }
};

const totalGroceriesUser1 = 402000;
const totalGroceriesUser2 = 502000;
const totalGroceriesUser3 = 902000;

console.log(getProductDiscountedPrice(totalGroceriesUser1));
console.log(getProductDiscountedPrice(totalGroceriesUser2));
console.log(getProductDiscountedPrice(totalGroceriesUser3));
