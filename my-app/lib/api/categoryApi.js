export async function GetCategory() {
  try {
    const res = await fetch(
      'https://taranga-e-com.onrender.com/api/v3/category/getCategory',
      {
        method: 'GET',
        cache: 'no-store',
      }
    );
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
