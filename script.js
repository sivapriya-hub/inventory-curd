// Simple demo credentials
const validUser = { username: "admin", password: "12345" };

// Handle Login
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");
  const userDisplay = document.getElementById("user");
  const logoutBtn = document.getElementById("logoutBtn");

  // LOGIN PAGE LOGIC
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (username === validUser.username && password === validUser.password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "welcome.html";
      } else {
        errorMsg.textContent = "Invalid username or password!";
      }
    });
  }

  // WELCOME PAGE LOGIC
  if (userDisplay) {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (!loggedUser) {
      window.location.href = "index.html"; // Redirect if not logged in
    } else {
      userDisplay.textContent = loggedUser;
    }
  }

  // LOGOUT
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }
});
