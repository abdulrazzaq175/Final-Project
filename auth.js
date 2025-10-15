// ===== AUTH.JS =====
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Toggle forms
  loginBtn.addEventListener("click", () => {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    loginBtn.classList.add("btn-primary");
    signupBtn.classList.remove("btn-primary");
  });

  signupBtn.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    signupBtn.classList.add("btn-primary");
    loginBtn.classList.remove("btn-primary");
  });

  // Signup
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) {
      alert("Email already exists!");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please login now.");
    signupForm.reset();
    loginBtn.click();
  });

  // Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
      alert(`Welcome ${user.name}!`);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "../index.html";
    } else {
      alert("Invalid credentials!");
    }
  });
});
