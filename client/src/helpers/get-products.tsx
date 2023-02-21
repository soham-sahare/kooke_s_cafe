export async function getProducts() {
  const res = await fetch('https://kookes-cafe-backend.vercel.app/api/products', { mode: "cors" });
  const products = await res.json();

  return JSON.parse(JSON.stringify(products));
}
