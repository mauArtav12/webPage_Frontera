// Lista de administradores válidos
const admins = [
  { username: "martavia.dev", password: "frontera123" },
  { username: "admin", password: "adminpass" }
];

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  const isValid = admins.some(admin =>
    admin.username === user && admin.password === pass
  );

  if (isValid) {
    // Simula sesión activa
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin-panel.html";
  } else {
    errorMsg.textContent = "Usuario o contraseña incorrectos.";
  }
});
