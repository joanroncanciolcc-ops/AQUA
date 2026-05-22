const API_URL = "https://api-production-97df3.up.railway.app";
let correoGlobal = "";

function obtenerPregunta() {
  correoGlobal = document.getElementById("correo").value.trim();

  if (correoGlobal === "") {
    alert("Ingresa tu correo");
    return;
  }

  fetch(`${API_URL}/recuperar/pregunta`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo: correoGlobal })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
      return;
    }

    document.getElementById("paso2").innerHTML = `
      <p><strong>Pregunta de seguridad:</strong></p>
      <p>${data.pregunta}</p>

      <input id="respuesta" placeholder="Respuesta de seguridad">
      <input id="nueva" type="password" placeholder="Nueva contraseña">

      <button onclick="resetear()">Cambiar contraseña</button>
    `;
  });
}

function resetear() {
  const respuesta = document.getElementById("respuesta").value.trim();
  const nueva = document.getElementById("nueva").value.trim();

  if (!respuesta || !nueva) {
    alert("Completa todos los campos");
    return;
  }

  fetch(`${API_URL}/recuperar/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      correo: correoGlobal,
      respuesta,
      nuevaContrasena: nueva
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } else {
      alert("Contraseña actualizada correctamente");
      window.location.href = "index.html";
    }
  });
}