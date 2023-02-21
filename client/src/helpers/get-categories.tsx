export async function getCategories() {
  const res = await fetch('https://kookes-cafe-backend.vercel.app/api/categories', { mode: "cors" });
  const categories = await res.json();

  return JSON.parse(JSON.stringify(categories));
}
