import { fetchProducts } from "./fetchProduct.js";
import { addToCart } from "./cart.js";
import { showLoader, hideLoader } from "./loader.js";

// Get ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function renderProductDetail() {
  try {
    showLoader();

    const products = await fetchProducts();
    const product = products.find((p) => p.id === productId);

    if (!product) {
      document.getElementById("product-detail").textContent =
        "Product not found.";
      hideLoader();
      return;
    }

    const productDetailContainer = document.getElementById("product-detail");

    const productImage = document.createElement("img");
    productImage.src = product.image.url;
    productImage.alt = product.title;

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productTitle = document.createElement("h2");
    productTitle.textContent = product.title;

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;

    const sizesContainer = document.createElement("div");
    sizesContainer.classList.add("sizes-container");

    const sizesLabel = document.createElement("label");
    sizesLabel.textContent = "Size:";
    sizesLabel.setAttribute("for", "size-select");

    const sizeSelect = document.createElement("select");
    sizeSelect.id = "size-select";

    product.sizes.forEach((size) => {
      const sizeOption = document.createElement("option");
      sizeOption.value = size;
      sizeOption.textContent = size;
      sizeSelect.appendChild(sizeOption);
    });

    sizesContainer.appendChild(sizesLabel);
    sizesContainer.appendChild(sizeSelect);

    const priceButtonContainer = document.createElement("div");
    priceButtonContainer.classList.add("price-button-container");

    const productPrice = document.createElement("p");
    productPrice.classList.add("price");
    productPrice.textContent = `$${product.price}`;

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.addEventListener("click", () => {
      const selectedSize = sizeSelect.value;
      if (!selectedSize) {
        alert("Please select a size before adding to cart.");
        return;
      }
      addToCart({ ...product, selectedSize });
      alert("Product added to cart!");
    });

    priceButtonContainer.appendChild(productPrice);
    priceButtonContainer.appendChild(addToCartButton);

    productInfo.appendChild(productTitle);
    productInfo.appendChild(productDescription);
    productInfo.appendChild(sizesContainer);
    productInfo.appendChild(priceButtonContainer);

    productDetailContainer.appendChild(productImage);
    productDetailContainer.appendChild(productInfo);
  } catch (error) {
    document.getElementById("product-detail").textContent =
      "Error loading product details. Please try again later.";
  } finally {
    hideLoader();
  }
}

document.getElementById("cart-icon").addEventListener("click", () => {
  window.location.href = "../checkout/index.html";
});

renderProductDetail();
