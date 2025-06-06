import {
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../js/cart.js";
import { showLoader, hideLoader } from "../js/loader.js";

function renderCartItems() {
  const errorBox = document.getElementById("error-message");
  errorBox.style.display = "none";
  errorBox.textContent = "";

  showLoader();

  try {
    const cart = getCart();
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    const checkoutButton = document.getElementById("checkout-button");

    if (cart.length === 0) {
      cartItemsContainer.textContent = "Your cart is empty.";
      checkoutButton.style.display = "none";
      hideLoader();
      return;
    }

    let totalPrice = 0;

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      const itemImage = document.createElement("img");
      itemImage.src = item.image.url;
      itemImage.alt = item.title;

      const itemTitle = document.createElement("h3");
      itemTitle.textContent = item.title;

      const itemPrice = document.createElement("p");
      itemPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

      const quantityControl = document.createElement("div");
      quantityControl.classList.add("quantity-control");

      const decreaseButton = document.createElement("button");
      decreaseButton.textContent = "-";
      decreaseButton.addEventListener("click", () => {
        updateQuantity(item.id, item.quantity - 1);
        renderCartItems();
      });

      const quantityDisplay = document.createElement("span");
      quantityDisplay.textContent = item.quantity;

      const increaseButton = document.createElement("button");
      increaseButton.textContent = "+";
      increaseButton.addEventListener("click", () => {
        updateQuantity(item.id, item.quantity + 1);
        renderCartItems();
      });

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        removeFromCart(item.id);
        renderCartItems();
      });

      quantityControl.appendChild(decreaseButton);
      quantityControl.appendChild(quantityDisplay);
      quantityControl.appendChild(increaseButton);

      cartItem.appendChild(itemImage);
      cartItem.appendChild(itemTitle);
      cartItem.appendChild(itemPrice);
      cartItem.appendChild(quantityControl);
      cartItem.appendChild(removeButton);

      cartItemsContainer.appendChild(cartItem);

      totalPrice += item.price * item.quantity;
    });

    const totalPriceElement = document.createElement("div");
    totalPriceElement.classList.add("total-price");
    totalPriceElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(
      2
    )}</strong>`;
    cartItemsContainer.appendChild(totalPriceElement);

    checkoutButton.textContent = "Pay";
    checkoutButton.style.display = "block";
    checkoutButton.onclick = () => {
      clearCart();
      window.location.href = "confirmation/index.html";
    };
  } catch (error) {
    errorBox.textContent = "An error occurred while loading your cart.";
    errorBox.style.display = "block";
    console.error("Checkout error:", error);
  } finally {
    hideLoader();
  }
}

renderCartItems();
