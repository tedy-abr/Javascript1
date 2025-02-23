import { renderProducts } from "./renderProducts.js";
import { updateCartUI } from "./cart.js";

document.getElementById("cart-icon").addEventListener("click", () => {
  window.location.href = "checkout/index.html";
});

updateCartUI();
renderProducts();
