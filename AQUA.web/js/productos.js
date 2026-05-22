
let productosDisponibles = [];
function menuProductos() {
  document.getElementById("contenido").innerHTML = `
    <div class="home-card">
      <h1>Productos de Plomería</h1>

      <p class="subtitle">
        Contamos con una amplia variedad de productos de plomería de alta
        calidad, ideales para instalaciones, reparaciones y mantenimiento
        profesional.
      </p>

      <ul class="lista-productos">
        <li>Tuberías y conexiones</li>
        <li>Grifería y llaves</li>
        <li>Accesorios y selladores</li>
        <li>Productos de proveedores confiables</li>
      </ul>

      <div class="acciones-productos">
        <button class="home-btn" onclick="mostrarProductos()">
          Ver catálogo
        </button>

        <button class="home-btn" onclick="mostrarInicio()">
          Volver al inicio
        </button>
      </div>
    </div>
  `;
}

function mostrarProductos() {
  fetch(`${API_URL}/productos`)
    .then(res => res.json())
    .then(productos => {
      productosDisponibles = productos;
      document.getElementById("contenido").innerHTML = `
        <div class="home-card">
          <h1>Productos de Plomería</h1>

          <div class="productos-grid"></div>

          <div class="acciones-productos">
            <button class="secondary-btn" onclick="verCarrito()">
              🛒 Ver carrito
            </button>

            <button class="back-btn" onclick="menuProductos()">
              Volver
            </button>
          </div>
        </div>
      `;

      const grid = document.querySelector(".productos-grid");

      productos.forEach(p => {
        grid.innerHTML += `
          <div class="producto-card">
            <img src="${API_URL}${p.imagen}" alt="${p.nombre}">

            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <p><strong>Proveedor:</strong> ${p.proveedor}</p>

            <div class="producto-footer">
              <span class="producto-precio">
                $${Number(p.precio).toLocaleString()}
              </span>

              <button class="add-cart-btn"
                 onclick="agregarAlCarrito(${p.id_producto})">
                ➕ Agregar
              </button>
            </div>
          </div>
        `;
      });
    })
    .catch(() => {
      alert("Error al cargar productos");
    });
}


function agregarAlCarrito(idProducto) {
  const producto = productosDisponibles.find(
    p => p.id_producto === idProducto
  );

  if (!producto) {
    alert("❌ Producto no encontrado");
    return;
  }

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existente = carrito.find(p => p.id_producto === idProducto);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id_producto: producto.id_producto, // ✅ MISMA CLAVE
      nombre: producto.nombre,
      precio: Number(producto.precio),
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert(`✅ ${producto.nombre} agregado al carrito`);
}


function verCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let contenidoHTML = `
    <div class="home-card">
      <h1>Carrito de compras</h1>

      <div class="carrito-lista">
  `;

  if (carrito.length === 0) {
    contenidoHTML += `<p>No hay productos en el carrito.</p>`;
  } else {
    let total = 0;

    carrito.forEach(p => {
      const precio = Number(p.precio) || 0;
      const subtotal = p.precio * p.cantidad;
      total += subtotal;

      contenidoHTML += `
        <div class="carrito-item">
          <strong>${p.nombre}</strong><br>
          Cantidad: ${p.cantidad}<br>
          Precio unidad: $${Number(p.precio).toLocaleString()}<br>
          <strong>Subtotal: $${subtotal.toLocaleString()}</strong>
          
        </div>
        <hr>
      `;
    });

    contenidoHTML += `
      <h3>Total: $${total.toLocaleString()}</h3>
         <div class="acciones-carrito">
           <button class="home-btn" onclick="pedirDomicilio()">
               🏠 Pedir a domicilio
             </button>

             <button class="home-btn" onclick="procederPago()">
              💳 Proceder al pago
           </button>
         </div>
      <button class="secondary-btn" onclick="vaciarCarrito()">
        Vaciar carrito
      </button>
    `;
  }

  contenidoHTML += `
      </div>

      <button class="back-btn" onclick="mostrarProductos()">Volver a productos</button>
    </div>
  `;

  document.getElementById("contenido").innerHTML = contenidoHTML;

 

 
}

function vaciarCarrito() {
  if (!confirm("¿Seguro que deseas vaciar el carrito?")) return;

  localStorage.removeItem("carrito");
  verCarrito();
}

function pedirDomicilio() {
  document.getElementById("contenido").innerHTML = `
    <div class="home-card">
      <h1>Datos de envío</h1>

      <p class="subtitle">
        Ingresa la dirección donde deseas recibir tu pedido.
      </p>

      <form onsubmit="guardarDireccion(event)" class="form-domicilio">

        <label>Dirección</label>
        <input 
          type="text" 
          id="direccion" 
          placeholder="Ej: KR 45 # 45 - 24"
          required
        >

        <label>Barrio</label>
        <input 
          type="text" 
          id="barrio" 
          placeholder="Ej: Chapinero"
          required
        >

        <label>Ciudad</label>
        <select id="ciudad" required>
          <option value="" disabled selected>Seleccione ciudad</option>

          <!-- Principales -->
          <option value="Bogotá">Bogotá</option>
          <option value="Medellín">Medellín</option>
          <option value="Cali">Cali</option>
          <option value="Barranquilla">Barranquilla</option>
          <option value="Cartagena">Cartagena</option>

          <!-- Otras -->
          <option value="Bucaramanga">Bucaramanga</option>
          <option value="Cúcuta">Cúcuta</option>
          <option value="Pereira">Pereira</option>
          <option value="Manizales">Manizales</option>
          <option value="Armenia">Armenia</option>
          <option value="Santa Marta">Santa Marta</option>
          <option value="Ibagué">Ibagué</option>
          <option value="Villavicencio">Villavicencio</option>
          <option value="Neiva">Neiva</option>
          <option value="Pasto">Pasto</option>
          <option value="Tunja">Tunja</option>
          <option value="Sincelejo">Sincelejo</option>
          <option value="Montería">Montería</option>
          <option value="Riohacha">Riohacha</option>

          <option value="Otra">Otra</option>
        </select>

        <label>Referencia</label>
        <textarea 
          id="referencia" 
          placeholder="Ej: Casa de dos pisos, portón azul"
        ></textarea>

        <div class="acciones-carrito">
          <button type="submit" class="home-btn">
            Continuar al pago
          </button>

          <button 
            type="button" 
            class="back-btn" 
            onclick="verCarrito()"
          >
            Volver al carrito
          </button>
        </div>
      </form>
    </div>
  `;
}


function guardarDireccion(event) {
  event.preventDefault();

  const direccion = {
    direccion: document.getElementById("direccion").value,
    barrio: document.getElementById("barrio").value,
    ciudad: document.getElementById("ciudad").value,
    referencia: document.getElementById("referencia").value
  };

  localStorage.setItem("direccionEnvio", JSON.stringify(direccion));

  procederPago();
}


function procederPago() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const direccion = JSON.parse(localStorage.getItem("direccionEnvio"));

  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  if (!direccion) {
    alert("Primero debes ingresar la dirección de envío.");
    pedirDomicilio();
    return;
  }

  document.getElementById("contenido").innerHTML = `
    <div class="home-card">
      <h1>Método de pago</h1>

      <p class="subtitle">
        Selecciona cómo deseas pagar tu pedido.
      </p>

      <div class="acciones-carrito">
        <button class="home-btn" onclick="pagoEntrega()">
          💵 Pago en efectivo
        </button>

        <button class="home-btn" onclick="pagoOnline()">
          💳 Pago con tarjeta
        </button>
      </div>

      <button class="back-btn" onclick="verCarrito()">
        Volver
      </button>
    </div>
  `;
}


function pagoOnline() {
  alert("✅ Pago online realizado con éxito.\nTu pedido será enviado a domicilio.");
  finalizarPedido();
}

function pagoEntrega() {
  alert("✅ Pedido confirmado.\nPagarás contra entrega en tu domicilio.");
  finalizarPedido();
}

function guardarPedido() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  const direccion = JSON.parse(localStorage.getItem("direccionEnvio"));

  const nuevoPedido = {
    id: Date.now(), // id simple
    fecha: new Date().toLocaleString(),
    productos: carrito,
    direccion: direccion,
    total: carrito.reduce((s, p) => s + p.precio * p.cantidad, 0),
    estado: "Pendiente"
  };

  pedidos.push(nuevoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

function verMisPedidos() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  let html = `
    <div class="home-card">
      <h1>Mis pedidos</h1>
  `;

  if (pedidos.length === 0) {
    html += `<p>No tienes pedidos realizados.</p>`;
  } else {
    pedidos.forEach(p => {
      html += `
        <div class="pedido-card">
          <strong>Pedido #${p.id}</strong><br>
          Fecha: ${p.fecha}<br>
          Total: $${p.total.toLocaleString()}<br>
          Estado: ${p.estado}<br><br>

          <button class="secondary-btn"
            onclick="verDetallePedido(${p.id})">
            Ver detalle
          </button>
        </div>
        <hr>
      `;
    });
  }

  html += `
      <button class="back-btn" onclick="mostrarInicio()">
        Volver
      </button>
    </div>
  `;

  document.getElementById("contenido").innerHTML = html;
}

function verDetallePedido(idPedido) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos"));
  const pedido = pedidos.find(p => p.id === idPedido);

  let html = `
    <div class="home-card">
      <h1>Detalle del pedido</h1>
      <p><strong>Fecha:</strong> ${pedido.fecha}</p>
      <p><strong>Estado:</strong> ${pedido.estado}</p>
      <hr>
  `;

  pedido.productos.forEach(p => {
    html += `
      ${p.nombre} x ${p.cantidad}
      ($${p.precio.toLocaleString()})
      <br>
    `;
  });

  html += `
      <hr>
      <strong>Total: $${pedido.total.toLocaleString()}</strong>

      <button class="back-btn" onclick="verMisPedidos()">
        Volver
      </button>
    </div>
  `;

  document.getElementById("contenido").innerHTML = html;
}

function finalizarPedido() {
  guardarPedido();
  localStorage.removeItem("carrito");
  localStorage.removeItem("direccionEnvio");
  mostrarInicio();
}
