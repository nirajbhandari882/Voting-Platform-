// Admin Auth Protection

const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");

if (isAdminLoggedIn !== "true") {
  window.location.href = "admin-login.html";
}

// Admin Logout Function
function adminLogout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}