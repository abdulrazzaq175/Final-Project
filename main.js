// ===== MAIN.JS =====
document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.querySelector(".navbar-nav");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser && navContainer) {
    const loginItem = document.querySelector('a[href="./pages/login.html"], a[href="pages/login.html"]');
    if (loginItem) {
      loginItem.parentElement.innerHTML = `
        <a class="nav-link text-warning" href="#">Welcome, ${loggedInUser.name}</a>
      `;
      const logoutItem = document.createElement("li");
      logoutItem.classList.add("nav-item");
      logoutItem.innerHTML = `<a class="nav-link text-danger" href="#" id="logoutBtn">Logout</a>`;
      navContainer.appendChild(logoutItem);
    }
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      alert("You have been logged out.");
      window.location.href = "../index.html";
    });
  }
});
