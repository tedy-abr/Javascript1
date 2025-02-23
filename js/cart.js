let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

export function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCartToLocalStorage();
  updateCartUI();
}

// remove from cart
export function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCartToLocalStorage();
  updateCartUI();
}

export function updateQuantity(productId, newQuantity) {
  const product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity = newQuantity;
    if (product.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCartToLocalStorage();
      updateCartUI();
    }
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

export function getCart() {
  return cart;
}

updateCartUI();
