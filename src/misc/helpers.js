export function convertToDollars(price) {
  return `$${(price/100).toFixed(2)}`;
}
