export function priceAfterDiscount(price: number, discountPercentage: number) {
  return price * (1 - discountPercentage / 100);
}
