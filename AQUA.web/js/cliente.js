

// Protección: solo entrar si hay sesión
if (!localStorage.getItem("token")) {
  window.location.href = "index.html";
}

// Crear cita
function crearCita() {
  fetch(`${API_URL}/citas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({
      fecha: document.getElementById("fecha").value,
      hora: document.getElementById("hora").value,
      descripcion: document.getElementById("descripcion").value
    })
  })
  .then(res => res.json())
  .then(() => alert("✅ Cita creada correctamente"))
  .catch(() => alert("❌ Error al crear la cita"));
}
 