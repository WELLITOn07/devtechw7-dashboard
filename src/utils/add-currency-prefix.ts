export function addCurrencyPrefix(price: string) {
  if (price) {
    price = "R$ " + price.replace("R$ ", "").trim();
  }
  return price;
}
