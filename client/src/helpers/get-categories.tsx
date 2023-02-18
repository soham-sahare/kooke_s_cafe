export async function getCategories() {
  const res = await fetch('http://localhost:5000/api/categories', { mode: "cors" });
  const categories = await res.json();

  return JSON.parse(JSON.stringify(categories));
}
