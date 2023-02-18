export async function getProducts() {
  const res = await fetch('http://localhost:5000/api/products', { mode: "cors" });
  const products = await res.json();

  return JSON.parse(JSON.stringify(products));
}
