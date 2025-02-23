export function productFilter(products, gender) {
  if (gender === "all") {
    return products;
  }
  return products.filter((product) => product.gender === gender);
}
