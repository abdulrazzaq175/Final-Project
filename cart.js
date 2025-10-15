// ===== CART.JS =====
const cartContainer = document.getElementById("cartContainer");
const totalPriceEl = document.getElementById("totalPrice");

// Load cart from localStorage
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  displayCart(cart);
}

// Display cart items
function displayCart(cart) {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-center text-muted">Your cart is empty.</p>`;
    totalPriceEl.textContent = "Total: $0";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const row = document.createElement("div");
    row.classList.add("row", "align-items-center", "border-bottom", "py-3");

    row.innerHTML = `
      <div class="col-md-2 text-center">
        <img src="${item.image}" width="80" alt="${item.title}">
      </div>
      <div class="col-md-4">
        <h6>${item.title.slice(0, 50)}...</h6>
        <p class="text-success fw-bold mb-0">$${item.price}</p>
      </div>
      <div class="col-md-3 d-flex align-items-center">
        <button class="btn btn-sm btn-outline-secondary me-2 decrease" data-index="${index}">-</button>
        <span>${item.quantity}</span>
        <button class="btn btn-sm btn-outline-secondary ms-2 increase" data-index="${index}">+</button>
      </div>
      <div class="col-md-2 text-center">
        <p class="fw-bold mb-0">$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div class="col-md-1 text-center">
        <button class="btn btn-sm btn-danger delete" data-index="${index}">x</button>
      </div>
    `;
    cartContainer.appendChild(row);
  });

  totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
  addEventListeners();
}

// Update cart quantity and delete
function addEventListeners() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      cart[i].quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    });
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      if (cart[i].quantity > 1) {
        cart[i].quantity--;
      } else {
        cart.splice(i, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    });
  });

  document.querySelectorAll(".delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    });
  });
}

// Checkout
document.getElementById("checkoutBtn").addEventListener("click", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("🛒 Thank you for your purchase!");
  localStorage.removeItem("cart");
  loadCart();
});

// Run
document.addEventListener("DOMContentLoaded", loadCart);
