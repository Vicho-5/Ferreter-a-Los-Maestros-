const productosBase = [
    {
        id: 1,
        codigo: "HE001",
        categoria: "Herramientas",
        subcategoria: "Eléctricas",
        nombre: "Taladro Percutor 850W",
        marca: "BOSCH",
        unidad: "Unidad",
        precioCompra: 75000,
        precio: 124900, // Este es el Precio Venta
        stock: 5,
        stockMinimo: 2,
        imagen: "img/prod_2_taladro-percutor.jpg",
        descripcion: "Taladro percutor ideal para concreto y mampostería.",
    },
    {
        id: 2,
        codigo: "HE002",
        categoria: "Herramientas",
        subcategoria: "Eléctricas",
        nombre: 'Sierra Circular 7¼"',
        marca: "DEWALT",
        unidad: "Unidad",
        precioCompra: 150000,
        precio: 235000,
        stock: 5,
        stockMinimo: 2,
        imagen: "img/prod_1_sierra-circular.jpg",
        descripcion:
            "Sierra circular de alta potencia para cortes precisos en madera.",
    },
    {
        id: 3,
        codigo: "HE003",
        categoria: "Herramientas",
        subcategoria: "Eléctricas",
        nombre: 'Esmeril Angular 4.5"',
        marca: "MAKITA",
        unidad: "Unidad",
        precioCompra: 55000,
        precio: 89990,
        stock: 5,
        stockMinimo: 2,
        imagen: "img/prod_3_esmeril-angular.jpg",
        descripcion:
            "Esmeril compacto y ligero, ideal para cortes en metal y desbaste.",
    },
    {
        id: 4,
        codigo: "HM001",
        categoria: "Herramientas",
        subcategoria: "Manuales",
        nombre: "Set de Herramientas",
        marca: "STANLEY",
        unidad: "Set",
        precioCompra: 28000,
        precio: 45000,
        stock: 5,
        stockMinimo: 3,
        imagen: "img/prod_4_caja-herramientas.jpg",
        descripcion:
            "Maletín completo con dados, llaves, destornilladores y alicates.",
    },
    {
        id: 5,
        codigo: "HM002",
        categoria: "Herramientas",
        subcategoria: "Manuales",
        nombre: "Huincha de medir 8m",
        marca: "BAHCO",
        unidad: "Unidad",
        precioCompra: 6500,
        precio: 12500,
        stock: 5,
        stockMinimo: 5,
        imagen: "img/prod_5_huincha.jpg",
        descripcion:
            "Cinta métrica resistente a impactos con recubrimiento de nylon.",
    },
    {
        id: 6,
        codigo: "HM003",
        categoria: "Herramientas",
        subcategoria: "Manuales",
        nombre: "Martillo Galponero",
        marca: "TRUPER",
        unidad: "Unidad",
        precioCompra: 4500,
        precio: 9500,
        stock: 5,
        stockMinimo: 5,
        imagen: "img/prod_6_martillo.jpg",
        descripcion: "Martillo de acero forjado con mango ergonómico.",
    },
    {
        id: 7,
        codigo: "HE004",
        categoria: "Herramientas",
        subcategoria: "Eléctricas",
        nombre: "Nivel Láser Cruzado",
        marca: "BOSCH",
        unidad: "Unidad",
        precioCompra: 70000,
        precio: 115000,
        stock: 5,
        stockMinimo: 2,
        imagen: "img/prod_7_laser.jpg",
        descripcion:
            "Nivel láser autonivelante para alineación perfecta en interiores.",
    },
    {
        id: 8,
        codigo: "MC001",
        categoria: "Materiales",
        subcategoria: "Fijaciones",
        nombre: 'Caja de Clavos Acero 2"',
        marca: "INCHALAM",
        unidad: "Caja 1kg",
        precioCompra: 2200,
        precio: 4500,
        stock: 5,
        stockMinimo: 10,
        imagen: "img/prod_8_clavos.jpg",
        descripcion: "Caja de 1kg de clavos de acero para concreto.",
    },
    {
        id: 9,
        codigo: "HE005",
        categoria: "Herramientas",
        subcategoria: "Eléctricas",
        nombre: "Soldadora Inverter 120A",
        marca: "INDURA",
        unidad: "Unidad",
        precioCompra: 105000,
        precio: 165000,
        stock: 5,
        stockMinimo: 2,
        imagen: "img/prod_9_soldadora.jpg",
        descripcion: "Máquina de soldar compacta, tecnología IGBT.",
    },
    {
        id: 10,
        codigo: "HM004",
        categoria: "Herramientas",
        subcategoria: "Manuales",
        nombre: 'Alicate Universal 8"',
        marca: "STANLEY",
        unidad: "Unidad",
        precioCompra: 4200,
        precio: 8900,
        stock: 5,
        stockMinimo: 5,
        imagen: "img/prod_10_alicate.jpg",
        descripcion: "Alicate de acero al carbono con mango antideslizante.",
    },
];

// 2. Le decimos a JavaScript que busque el catálogo en la memoria del navegador
let productos = [];
const catalogoGuardado = localStorage.getItem("inventarioFerreteria");

if (catalogoGuardado) {
    // Si ya existe (porque el admin agregó/modificó algo), usamos ese
    productos = JSON.parse(catalogoGuardado);
} else {
    // Si no existe, usamos el arreglo base y lo guardamos para el admin
    productos = productosBase;
    localStorage.setItem("inventarioFerreteria", JSON.stringify(productos));
}

// 2. Función para pintar los productos destacados en el index
function cargarDestacados() {
    const contenedor = document.getElementById("contenedor-destacados");
    // Verificamos que el contenedor exista en la página actual
    if (!contenedor) return;

    contenedor.innerHTML = "";

    // Tomamos solo los primeros 4 productos para el inicio
    const destacados = productos.slice(0, 4);

    for (let i = 0; i < destacados.length; i++) {
        contenedor.innerHTML += `
            <div class="col-md-3">
                <div class="card h-100 shadow-sm border-0 product-card">
                    <img src="${destacados[i].imagen}" class="card-img-top img-product-destacados" alt="${destacados[i].nombre}">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${destacados[i].nombre}</h5>
                        <p class="card-text text-muted">${destacados[i].marca}</p>
                        <h4 class="fw-bold text-brand-orange">$${destacados[i].precio.toLocaleString("es-CL")}</h4>
                        <button class="btn btn-orange w-100 mt-2" onclick="verDetalle(${destacados[i].id})">Ver detalle</button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Guardar en LocalStorage y cambiar de página (lo que enseñó el profe)
function verDetalle(idProducto) {
    let productoSeleccionado;

    // Buscamos el producto exacto por su ID
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === idProducto) {
            productoSeleccionado = productos[i];
            break;
        }
    }

    // Lo guardamos en el navegador
    localStorage.setItem("producto", JSON.stringify(productoSeleccionado));

    // Redirigimos a la página de detalle
    window.location.href = "detalle.html";
}

cargarDestacados();

// CATALOGO!!

// Función para pintar TODOS los productos en catalogo.html
function cargarCatalogo() {
    const contenedor = document.getElementById("contenedor-catalogo");
    // Si no estamos en catalogo.html, la función se detiene sin dar error
    if (!contenedor) return;

    contenedor.innerHTML = "";

    // Recorremos los 10 productos
    for (let i = 0; i < productos.length; i++) {
        contenedor.innerHTML += `
            <div class="col-md-3">
                <div class="card h-100 shadow-sm border-0 product-card">
                    <img src="${productos[i].imagen}" class="card-img-top img-product-destacados" alt="${productos[i].nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${productos[i].nombre}</h5>
                        <p class="card-text text-muted mb-2">${productos[i].marca}</p>
                        <h4 class="fw-bold text-brand-orange mt-auto mb-3">$${productos[i].precio.toLocaleString("es-CL")}</h4>
                        <button class="btn btn-orange w-100" onclick="verDetalle(${productos[i].id})">Ver detalle</button>
                    </div>
                </div>
            </div>
        `;
    }
}

cargarCatalogo();

// DETALLE!!

function cargarDetalle() {
    // Verificamos si estamos en la página de detalle buscando uno de sus elementos
    const tituloElemento = document.getElementById("detalle-nombre");
    if (!tituloElemento) return; // Si no existe, detenemos la función

    // Recuperamos el producto guardado en LocalStorage
    const productoString = localStorage.getItem("producto");

    // Validamos por si alguien entra directo a detalle.html sin elegir nada
    if (!productoString) {
        window.location.href = "catalogo.html";
        return;
    }

    // Convertimos el texto nuevamente a un objeto JavaScript
    const producto = JSON.parse(productoString);

    // Mostramos los datos en el HTML
    document.getElementById("detalle-imagen").src = producto.imagen;
    document.getElementById("detalle-imagen").alt = producto.nombre;
    tituloElemento.textContent = producto.nombre;
    document.getElementById("detalle-marca").textContent = producto.marca;
    document.getElementById("detalle-precio").textContent =
        "$" + producto.precio.toLocaleString("es-CL");
    document.getElementById("detalle-descripcion").textContent =
        producto.descripcion;
}

// Llamamos a la función al final del archivo
cargarDetalle();

// CARRITO!!

// Función para agregar el producto actual al carrito
function agregarCarrito() {
    const productoString = localStorage.getItem("producto");
    if (!productoString) return;

    const productoActual = JSON.parse(productoString);

    let carrito = [];
    const carritoString = localStorage.getItem("carrito");

    if (carritoString) {
        carrito = JSON.parse(carritoString);
    }

    // Buscamos si el producto ya está en el carrito
    let productoExiste = false;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === productoActual.id) {
            // Nueva validación de stock
            if (carrito[i].cantidad >= productoActual.stock) {
                alert(
                    "No puedes agregar más unidades, límite de stock alcanzado.",
                );
                return; // Detiene la función y no suma nada
            }

            carrito[i].cantidad += 1;
            productoExiste = true;
            break;
        }
    }

    // Si no existía, le asignamos cantidad 1 y lo metemos al arreglo
    if (!productoExiste) {
        productoActual.cantidad = 1;
        carrito.push(productoActual);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("¡Producto agregado a tu carrito!");
    renderizarCarrito();
}

// CARRITO!!

// 1. Mostrar el carrito y calcular el total
function renderizarCarrito() {
    const contenedor = document.getElementById("contenedor-items-carrito");
    const elementoTotal = document.getElementById("total-carrito");
    const contadorNav = document.getElementById("contador-carrito");
    const contadorOffcanvas = document.getElementById("contador-offcanvas");

    if (!contenedor || !elementoTotal) return;

    let carrito = [];
    const carritoString = localStorage.getItem("carrito");
    if (carritoString) {
        carrito = JSON.parse(carritoString);
    }

    // Calculamos cuántos artículos en total hay (sumando las cantidades)
    let cantidadTotalArticulos = 0;
    for (let i = 0; i < carrito.length; i++) {
        // Aseguramos que la propiedad cantidad exista (por si quedaron productos viejos guardados)
        if (!carrito[i].cantidad) carrito[i].cantidad = 1;
        cantidadTotalArticulos += carrito[i].cantidad;
    }

    // Actualizamos AMBOS contadores
    if (contadorNav) contadorNav.textContent = cantidadTotalArticulos;
    if (contadorOffcanvas)
        contadorOffcanvas.textContent = cantidadTotalArticulos;

    if (carrito.length === 0) {
        contenedor.innerHTML =
            '<p class="text-muted text-center mt-4">Tu carrito está vacío.</p>';
        elementoTotal.textContent = "$0";
        return;
    }

    contenedor.innerHTML = "";
    let totalPrecio = 0;

    for (let i = 0; i < carrito.length; i++) {
        // Multiplicamos el precio por la cantidad que lleva el usuario
        let subtotalProducto = carrito[i].precio * carrito[i].cantidad;
        totalPrecio += subtotalProducto;

        contenedor.innerHTML += `
            <div class="card border-0 shadow-sm mb-3">
                <div class="card-body d-flex align-items-center">
                    <img src="${carrito[i].imagen}" alt="${carrito[i].nombre}" class="rounded me-3" style="width: 60px; height: 60px; object-fit: cover;">
                    <div class="flex-grow-1">
                        <h6 class="fw-bold mb-1">
                            ${carrito[i].nombre} 
                            <span class="badge bg-secondary ms-1">x${carrito[i].cantidad}</span>
                        </h6>
                        <p class="text-brand-orange fw-bold mb-0">$${subtotalProducto.toLocaleString("es-CL")}</p>
                    </div>
                    <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito(${carrito[i].id})">X</button>
                </div>
            </div>
        `;
    }

    elementoTotal.textContent = "$" + totalPrecio.toLocaleString("es-CL");
}

// 2. Eliminar un solo producto
function eliminarDelCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Filtramos el arreglo dejando solo los que NO sean el id a eliminar
    carrito = carrito.filter((producto) => producto.id !== idProducto);

    // Guardamos la nueva lista y volvemos a pintar
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

// 3. Vaciar todo el carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    renderizarCarrito();
}

// Ejecutar la renderización al cargar cualquier página
renderizarCarrito();
