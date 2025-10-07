export async function getProducts() {
  try {
    const res = await fetch(
      'https://taranga-e-com.onrender.com/api/v3/product/getProduct',
      {
        method: 'GET',
        cache: 'no-store',
      }
    );
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
