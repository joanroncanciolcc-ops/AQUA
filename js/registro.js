const API_URL = "https://api-production-97df3.up.railway.app";

function registrar(event) {
  event.preventDefault();
  
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();
  const pregunta_seguridad = document.getElementById("pregunta").value;
  const respuesta_seguridad = document.getElementById("respuesta").value.trim();

  if (
    nombre === "" ||
    correo === "" ||
    contrasena === "" ||
    pregunta_seguridad === "" ||
    respuesta_seguridad === ""
  ) {
    alert("Debes completar todos los campos");
    return;
  }

  fetch(`${API_URL}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      correo,
      contrasena,
      rol: "cliente",
      pregunta_seguridad,
      respuesta_seguridad
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert("Cliente registrado correctamente");
        window.location.href = "principal.html";
      }
    })
    .catch(err => {
      console.error(err);
      alert("Error al conectar con la API");
    });
}
