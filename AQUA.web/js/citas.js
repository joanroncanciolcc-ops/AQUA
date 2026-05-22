const API_URL = "https://api-production-97df3.up.railway.app";

/* ===================== MENÚ ===================== */
function menuCitas() {
  document.getElementById("contenido").innerHTML = `
    <div class="home-card">
      <h1>Citas</h1>
      <p class="subtitle">Gestiona tus citas</p>

      <div class="acciones-citas">
        <button class="home-btn" onclick="nuevaCita()">Gestionar cita</button>
        <button class="home-btn" onclick="mostrarCitas()">Ver mis citas</button>
        <button class="home-btn" onclick="cancelarCitas()">Cancelar cita</button>
      </div>
    </div>
  `;
}

/* ===================== MOSTRAR CITAS ===================== */
function mostrarCitas() {
  fetch(`${API_URL}/citas/mis-citas`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  })
    .then(res => res.json())
    .then(citas => {
      document.getElementById("contenido").innerHTML = `
        <div class="home-card">
          <h1>Tus citas</h1>
          <div class="citas-lista">
            ${citas.length === 0 ? "<p>No tienes citas registradas.</p>" : ""}
          </div>
          <button class="back-btn" onclick="menuCitas()">Volver</button>
        </div>
      `;

      const lista = document.querySelector(".citas-lista");

      citas.forEach(cita => {
        const fecha = new Date(cita.fecha);

        lista.innerHTML += `
          <div class="cita-item">
            📅 ${fecha.toLocaleDateString()}<br>
            ⏰ ${fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}<br>
            🔧 ${cita.tipo_servicio}<br>
            📌 Estado: ${cita.estado}
          </div>
          <hr>
        `;
      });
    })
    .catch(() => alert("Error al cargar tus citas"));
}



/* ===================== NUEVA CITA ===================== */
function nuevaCita() {
  document.getElementById("contenido").innerHTML = `
    <div class="home-card">
      <h1>Generar nueva cita</h1>

      <form onsubmit="guardarCita(event)">
        <label>Servicio</label>
        <select id="servicio" required></select>

        <label>Fecha</label>
        <input type="date" id="fecha" required>

        <label>Hora</label>
        <input type="time" id="hora" required>

        <label>Descripción</label>
        <textarea id="descripcion" required></textarea>

        <button class="home-btn">Guardar cita</button>
        <button type="button" class="back-btn" onclick="menuCitas()">Volver</button>
      </form>
    </div>
  `;
  cargarServicios();
}
/* ===================== SERVICIOS ===================== */
function cargarServicios() {
  fetch(`${API_URL}/servicios/tipos`)

    .then(res => res.json())
    .then(servicios => {
      const select = document.getElementById("servicio");
      select.innerHTML = '<option value="">Selecciona un servicio</option>';

      servicios.forEach(servicio => {
        const option = document.createElement("option");
        option.value = servicio.id_servicio;
        option.textContent = servicio.tipo_servicio;
        select.appendChild(option);
      });
    })
    .catch(() => alert("Error al cargar los servicios"));
}

/* ===================== GUARDAR CITA ===================== */
function guardarCita(e) {
  e.preventDefault();

  const id_servicio = document.getElementById("servicio").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const descripcion_cliente = document.getElementById("descripcion").value;

  const fechaCompleta = `${fecha} ${hora}:00`;

  fetch(`${API_URL}/citas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ id_servicio, fecha: fechaCompleta, descripcion_cliente })
  })
    .then(res => res.json())
    .then(() => {
      alert("✅ Cita creada correctamente");
      mostrarCitas();
    })
    .catch(() => alert("❌ Error al crear cita"));
}

/* ===================== CANCELAR CITA ===================== */
function cancelarCitas() {
  fetch(`${API_URL}/citas/mis-citas`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  })
    .then(res => res.json())
    .then(citas => {
      const pendientes = citas.filter(c => c.estado === "pendiente");

      let html = `
        <div class="home-card">
          <h1>Cancelar cita</h1>
      `;

      pendientes.forEach(cita => {
        html += `
          <div class="cita-item">
            📅 ${new Date(cita.fecha).toLocaleDateString()}<br>
            🔧 ${cita.tipo_servicio}<br>
            <button onclick="confirmarCancelar(${cita.id_cita})">Cancelar</button>
          </div>
        `;
      });

      html += `<button class="back-btn" onclick="menuCitas()">Volver</button></div>`;
      document.getElementById("contenido").innerHTML = html;
    });
}

function confirmarCancelar(idCita) {
  fetch(`${API_URL}/citas/${idCita}/cancelar`, {
    method: "PUT",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  })
    .then(() => cancelarCitas())
    .catch(() => alert("Error al cancelar cita"));
}
