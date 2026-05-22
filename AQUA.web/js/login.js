
function login(event) {
  event.preventDefault();
  console.log("BOTÓN FUNCIONA");

  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;

  fetch("https://api-production-97df3.up.railway.app/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.token) {
        alert("Credenciales incorrectas");
        return;
      }

      // Guardamos solo el token
      localStorage.setItem("token", data.token);

      // Redirige al cliente
      window.location.href = "principal.html";
    })
    .catch(err => {
      console.error(err);
      alert("Error al conectar con la API");
    });
}