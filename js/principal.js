


/* =========================
   PROTECCIÓN DE SESIÓN
========================= */
if (!localStorage.getItem("token")) {
  window.location.href = "index.html";
}

/* =========================
   CONTENIDO INICIAL
========================= */
function mostrarInicio() {
  document.getElementById("contenido").innerHTML = `
    <div class="home-card">
      <h1>Bienvenido a AQUA</h1>
      <p>
        En AQUA ofrecemos servicios profesionales de plomería,
        garantizando calidad, seguridad y soluciones eficientes
        para hogares y empresas.
      </p>
      <button class="home-btn" onclick="menuProductos()">
        Ver productos

      </button>

    </div>
  `;
}


/* =========================
  Servicios
========================= */
function mostrarServicios() {
  document.getElementById("contenido").innerHTML = `
    <div class="home-card">
      <h1>Nuestros Servicios</h1>

      <p class="subtitle">
        En AQUA contamos con un equipo especializado que ofrece soluciones
        profesionales en plomería para hogares y empresas.
      </p>

      <div class="services-grid">

        <div class="service-card">
          <h3>🔧 Reparación de fugas</h3>
          <p>Detección y solución de fugas de agua en tuberías.</p>
          <button class="home-btn" onclick="verServicio('fugas')">
            Ver servicio
          </button>
        </div>

        <div class="service-card">
          <h3>🚿 Instalación de grifería</h3>
          <p>Instalación y reemplazo de llaves y grifos.</p>
          <button class="home-btn" onclick="verServicio('griferia')">
            Ver servicio
          </button>
        </div>

        <div class="service-card">
          <h3>💧 Mantenimiento de tuberías</h3>
          <p>Mantenimiento preventivo y correctivo.</p>
          <button class="home-btn" onclick="verServicio('tuberias')">
            Ver servicio
          </button>
        </div>

        <div class="service-card">
          <h3>🚽 Reparación de sanitarios</h3>
          <p>Solución de problemas en inodoros y lavamanos.</p>
          <button class="home-btn" onclick="verServicio('sanitarios')">
            Ver servicio
          </button>
        </div>

        <div class="service-card">
          <h3>🚨 Atención de emergencias</h3>
          <p>Servicio rápido ante emergencias de plomería.</p>
          <button class="home-btn" onclick="verServicio('emergencias')">
            Ver servicio
          </button>
        </div>

        <div class="service-card">
          <h3>🔍 Detección de fugas ocultas</h3>
          <p>Identificación de fugas internas sin romper paredes.</p>
          <button class="home-btn" onclick="verServicio('deteccion')">
            Ver servicio
          </button>
        </div>

      </div>

      <button class="back-btn" onclick="mostrarInicio()">Volver</button>
    </div>
  `;
}


function verServicio(tipo) {
  const servicios = {
    fugas: {
      titulo: "Reparación de fugas",
      desc: "Detectamos y reparamos fugas de agua en tuberías, evitando daños estructurales y desperdicio."
    },
    griferia: {
      titulo: "Instalación de grifería",
      desc: "Instalamos y reemplazamos grifos y llaves con garantía de funcionamiento."
    },
    tuberias: {
      titulo: "Mantenimiento de tuberías",
      desc: "Mantenimiento preventivo para asegurar la durabilidad del sistema hidráulico."
    },
    sanitarios: {
      titulo: "Reparación de sanitarios",
      desc: "Solucionamos problemas en inodoros, lavamanos y más."
    },
    emergencias: {
      titulo: "Atención de emergencias",
      desc: "Servicio de urgencias para casos críticos de plomería."
    },
    deteccion: {
      titulo: "Detección de fugas ocultas",
      desc: "Utilizamos métodos especializados para detectar fugas internas sin causar daños estructurales."
    }

  };

 document.getElementById("contenido").innerHTML = `
  <div class="home-card">
    <h1>${servicios[tipo].titulo}</h1>
    <p>${servicios[tipo].desc}</p>

    <div class="service-actions">
      <button class="home-btn" onclick="mostrarCitas()">
        Agendar cita
      </button>

      <button class="back-btn" onclick="mostrarServicios()">
        ← Volver a servicios
      </button>
    </div>
  </div>
`;
}  


/* =========================
   MENÚ PERFIL
========================= */
function toggleProfileMenu() {
  const menu = document.getElementById("profile-menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

/* =========================
   FOTO DE PERFIL
========================= */

// Cambiar foto de perfil
function cambiarFoto(event) {
  const archivo = event.target.files[0];
  if (!archivo) return;

  const lector = new FileReader();
  lector.onload = function () {
    document.getElementById("profile-img").src = lector.result;
    localStorage.setItem("fotoPerfil", lector.result);
  };
  lector.readAsDataURL(archivo);
}

// Cargar foto guardada o usar la predeterminada
window.addEventListener("DOMContentLoaded", () => {
  const foto = localStorage.getItem("fotoPerfil");
  if (foto) {
    document.getElementById("profile-img").src = foto;
  }
});


/* =========================
   ACCIONES
========================= */
function verCitas() {
  mostrarCitas();
}

function verCarrito() {
  alert("🛒 Carrito en construcción");
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

/* =========================
   CERRAR MENÚ AL HACER CLICK FUERA
========================= */
document.addEventListener("click", function (e) {
  const profile = document.querySelector(".profile");
  const menu = document.getElementById("profile-menu");

  if (!profile.contains(e.target)) {
    menu.style.display = "none";
  }
});

/* =========================
   CARGA INICIAL
========================= */
mostrarInicio();