// ===== PRODUCTS.JS =====

// FakeStore API endpoint
const apiURL = "https://fakestoreapi.com/products";
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

// Fetch products from API
async function loadProducts() {
  try {
    const res = await fetch(apiURL);
    const products = await res.json();
    displayProducts(products);

    // Search filter
    searchInput.addEventListener("input", (e) => {
      const searchText = e.target.value.toLowerCase();
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(searchText)
      );
      displayProducts(filtered);
    });
  } catch (error) {
    console.error("Error loading products:", error);
    productList.innerHTML = `<p class="text-danger text-center">Failed to load products. Try again later.</p>`;
  }
}

// Display products
function displayProducts(products) {
  productList.innerHTML = "";
  if (products.length === 0) {
    productList.innerHTML = `<p class="text-center text-muted">No products found.</p>`;
    return;
  }

  products.forEach((p) => {
    const col = document.createElement("div");
    col.classList.add("col-md-3");

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.image}" class="card-img-top p-3" alt="${p.title}" height="250">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title">${p.title.slice(0, 40)}...</h6>
          <p class="text-success fw-bold mb-1">$${p.price}</p>
          <p class="text-muted small flex-grow-1">${p.category}</p>
          <button class="btn btn-warning mt-auto add-to-cart" data-id="${p.id}">Add to Cart</button>
        </div>
      </div>
    `;
    productList.appendChild(col);
  });

  // Add to Cart functionality
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const product = products.find((p) => p.id == id);
      addToCart(product);
    });
  });
}

// Add to cart (save in localStorage)
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    alert("This product is already in your cart.");
  } else {
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title.slice(0, 20)} added to cart!`);
  }
}

// Run
document.addEventListener("DOMContentLoaded", loadProducts);
