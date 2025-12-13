import { fetchProducts } from "./api.js";

export async function renderProducts() {
  const grid = document.querySelector(".products-grid");

  // 🔹 LOADING
  grid.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>
  `;

  try {
    // 🔹 Wait for API data
    const products = await fetchProducts();

    // 🔹 Remove loading
    grid.innerHTML = "";

    // 🔹 Render products
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <div class="product-body">
          <h4 class="product-title">${product.title}</h4>
          <p class="product-price">$${product.price}</p>
          <button class="product-btn">Add to cart</button>
        </div>
      `;

      card.querySelector(".product-btn").addEventListener("click", () => {
        window.dispatchEvent(
          new CustomEvent("add-to-cart", { detail: product })
        );
      });

      grid.appendChild(card);
    });

  } catch (error) {
    grid.innerHTML = `
      <div class="loading error">
        <p>Something went wrong 😕</p>
        <button onclick="location.reload()">Reload</button>
      </div>
    `;
  }
}
