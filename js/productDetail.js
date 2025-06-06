import { fetchProducts } from "./fetchProduct.js";
import { addToCart } from "./cart.js";
import { showLoader, hideLoader } from "./loader.js";

// Get ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function renderProductDetail() {
  const errorBox = document.getElementById("error-message");
  if (errorBox) {
    errorBox.style.display = "none";
    errorBox.textContent = "";
  }

  try {
    showLoader();

    const products = await fetchProducts();
    const product = products.find((p) => p.id === productId);

    if (!product) {
      document.getElementById("product-detail").textContent =
        "Product not found.";
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
        errorBox.textContent = "Please select a size before adding to cart.";
        errorBox.style.display = "block";
        return;
      }

      addToCart({ ...product, selectedSize });
      errorBox.textContent = " Product added to cart!";
      errorBox.style.display = "block";
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
    errorBox.textContent =
      "Error loading product details. Please try again later.";
    errorBox.style.display = "block";
  } finally {
    hideLoader();
  }
}

document.getElementById("cart-icon").addEventListener("click", () => {
  window.location.href = "../checkout/index.html";
});

renderProductDetail();
