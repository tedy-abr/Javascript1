import { fetchProducts } from "./fetchProduct.js";
import { productFilter } from "./filterProducts.js";
import { showLoader, hideLoader } from "./loader.js";

let products = null;
export async function renderProducts(filterGender = "all") {
  try {
    showLoader();
    if (!products) {
      products = await fetchProducts();
    }
    if (!products || products.length === 0) {
      document.getElementById("product-grid").textContent =
        "No products found.";
      hideLoader();
      return;
    }

    const filteredProducts = productFilter(products, filterGender);

    const productsContainer = document.getElementById("product-grid");
    productsContainer.textContent = "";

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      const productImage = document.createElement("img");
      productImage.src = product.image.url;
      productImage.alt = product.title;
      const productTitle = document.createElement("h2");
      productTitle.textContent = product.title;
      const productPrice = document.createElement("p");
      productPrice.classList.add("price");
      productPrice.textContent = `$${product.price}`;
      const viewMoreBtn = document.createElement("button");
      viewMoreBtn.textContent = "View More";

      //Redirect to product detail page
      viewMoreBtn.addEventListener("click", () => {
        window.location.href = `product/index.html?id=${product.id}`;
      });

      productCard.appendChild(productImage);
      productCard.appendChild(productTitle);

      productCard.appendChild(productPrice);
      productCard.appendChild(viewMoreBtn);

      productsContainer.appendChild(productCard);
    });
  } catch (error) {
    document.getElementById("product-grid").textContent =
      "Error fetching products. Please try again later.";
    console.error("Error fetching products:", error);
  } finally {
    hideLoader();
  }
}

document.getElementById("gender-filter").addEventListener("change", (event) => {
  const selectedGender = event.target.value;
  renderProducts(selectedGender);
});

renderProducts();
