export async function GetCategory() {
  try {
    const res = await fetch(
      'https://taranga-e-com.onrender.com/api/v3/category/getCategory',
      {
        cache: 'no-store',
      }
    );
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
