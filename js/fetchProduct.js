export async function fetchProducts() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result.data.length > 0 ? result.data : [];
  } catch (error) {
    alert("Error fetching products:");
    throw error;
  }
}
