// ==========================================
// 1. ARREGLOS DE DATOS Y LOCALSTORAGE
// ==========================================

const catalogoBase = [
    { id: 1, codigo: "HE001", categoria: "Herramientas", subcategoria: "Eléctricas", nombre: "Taladro Percutor 850W", marca: "BOSCH", unidad: "Unidad", precioCompra: 75000, precio: 124900, stock: 5, stockMinimo: 2, imagen: "img/prod_2_taladro-percutor.jpg", descripcion: "Taladro percutor ideal para concreto y mampostería." },
    { id: 2, codigo: "HE002", categoria: "Herramientas", subcategoria: "Eléctricas", nombre: 'Sierra Circular 7¼"', marca: "DEWALT", unidad: "Unidad", precioCompra: 150000, precio: 235000, stock: 5, stockMinimo: 2, imagen: "img/prod_1_sierra-circular.jpg", descripcion: "Sierra circular de alta potencia para cortes precisos en madera." },
    { id: 3, codigo: "HE003", categoria: "Herramientas", subcategoria: "Eléctricas", nombre: 'Esmeril Angular 4.5"', marca: "MAKITA", unidad: "Unidad", precioCompra: 55000, precio: 89990, stock: 5, stockMinimo: 2, imagen: "img/prod_3_esmeril-angular.jpg", descripcion: "Esmeril compacto y ligero, ideal para cortes en metal y desbaste." },
    { id: 4, codigo: "HM001", categoria: "Herramientas", subcategoria: "Manuales", nombre: "Set de Herramientas", marca: "STANLEY", unidad: "Set", precioCompra: 28000, precio: 45000, stock: 5, stockMinimo: 3, imagen: "img/prod_4_caja-herramientas.jpg", descripcion: "Maletín completo con dados, llaves, destornilladores y alicates." },
    { id: 5, codigo: "HM002", categoria: "Herramientas", subcategoria: "Manuales", nombre: "Huincha de medir 8m", marca: "BAHCO", unidad: "Unidad", precioCompra: 6500, precio: 12500, stock: 5, stockMinimo: 5, imagen: "img/prod_5_huincha.jpg", descripcion: "Cinta métrica resistente a impactos con recubrimiento de nylon." },
    { id: 6, codigo: "HM003", categoria: "Herramientas", subcategoria: "Manuales", nombre: "Martillo Galponero", marca: "TRUPER", unidad: "Unidad", precioCompra: 4500, precio: 9500, stock: 5, stockMinimo: 5, imagen: "img/prod_6_martillo.jpg", descripcion: "Martillo de acero forjado con mango ergonómico." },
    { id: 7, codigo: "HE004", categoria: "Herramientas", subcategoria: "Eléctricas", nombre: "Nivel Láser Cruzado", marca: "BOSCH", unidad: "Unidad", precioCompra: 70000, precio: 115000, stock: 5, stockMinimo: 2, imagen: "img/prod_7_laser.jpg", descripcion: "Nivel láser autonivelante para alineación perfecta en interiores." },
    { id: 8, codigo: "MC001", categoria: "Materiales", subcategoria: "Fijaciones", nombre: 'Caja de Clavos Acero 2"', marca: "INCHALAM", unidad: "Caja 1kg", precioCompra: 2200, precio: 4500, stock: 5, stockMinimo: 10, imagen: "img/prod_8_clavos.jpg", descripcion: "Caja de 1kg de clavos de acero para concreto." },
    { id: 9, codigo: "HE005", categoria: "Herramientas", subcategoria: "Eléctricas", nombre: "Soldadora Inverter 120A", marca: "INDURA", unidad: "Unidad", precioCompra: 105000, precio: 165000, stock: 5, stockMinimo: 2, imagen: "img/prod_9_soldadora.jpg", descripcion: "Máquina de soldar compacta, tecnología IGBT." },
    { id: 10, codigo: "HM004", categoria: "Herramientas", subcategoria: "Manuales", nombre: 'Alicate Universal 8"', marca: "STANLEY", unidad: "Unidad", precioCompra: 4200, precio: 8900, stock: 5, stockMinimo: 5, imagen: "img/prod_10_alicate.jpg", descripcion: "Alicate de acero al carbono con mango antideslizante." },
];

let productosAdmin = [];
let inventarioGuardado = localStorage.getItem("inventarioFerreteria");

if (inventarioGuardado) {
    productosAdmin = JSON.parse(inventarioGuardado);
    if (
        productosAdmin.length === 0 ||
        !productosAdmin[0].codigo ||
        productosAdmin[0].codigo === "undefined"
    ) {
        productosAdmin = JSON.parse(JSON.stringify(catalogoBase));
        localStorage.setItem(
            "inventarioFerreteria",
            JSON.stringify(productosAdmin),
        );
    }
} else {
    productosAdmin = JSON.parse(JSON.stringify(catalogoBase));
    localStorage.setItem(
        "inventarioFerreteria",
        JSON.stringify(productosAdmin),
    );
}

let colaboradoresAdmin = [];
let colaboradoresGuardados = localStorage.getItem("usuarios");

if (colaboradoresGuardados) {
    colaboradoresAdmin = JSON.parse(colaboradoresGuardados);
} else {
    colaboradoresAdmin = [
        {
            correo: "admin@ejemplo.cl",
            contrasena: "1234",
            rol: "admin",
            nombre: "Admin Sistema",
            rut: "112223334",
            comuna: "Santiago",
        },
        {
            correo: "cliente@ejemplo.cl",
            contrasena: "4321",
            rol: "cliente",
            nombre: "Cliente Base",
            rut: "998887776",
            comuna: "Providencia",
        },
    ];
    localStorage.setItem("usuarios", JSON.stringify(colaboradoresAdmin));
}

// Normalizador unificado de usuarios
function obtenerUsuariosNormalizados() {
    let rawUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    return rawUsuarios.map((u, index) => {
        let identificador = u.rut || u.run || `USER-${index}`;
        let nombreCompleto = u.nombre || "";
        if (u.apellidos) {
            nombreCompleto = nombreCompleto + " " + u.apellidos;
        }
        if (!nombreCompleto.trim()) {
            nombreCompleto = "Sin Nombre";
        }
        return {
            idUnico: identificador,
            rut: identificador,
            nombre: nombreCompleto.trim(),
            correo: u.correo || "Sin correo",
            rol: u.rol || "cliente",
            region: u.region || "N/A",
            comuna: u.comuna || "N/A",
            direccion: u.direccion || "",
            contrasena: u.contrasena || "1234"
        };
    });
}

// ==========================================
// 2. FUNCIONES DE PRODUCTOS
// ==========================================

function cargarProductos() {
    let cuerpoTabla = document.getElementById("tabla-productos-cuerpo");
    if (!cuerpoTabla) return;
    cuerpoTabla.innerHTML = "";
    let alertasCriticas = 0;

    for (let i = 0; i < productosAdmin.length; i++) {
        let producto = productosAdmin[i];
        let claseEtiqueta = "bg-success";
        let textoStock = "Normal";

        if (producto.stock <= 0) {
            claseEtiqueta = "bg-secondary";
            textoStock = "Sin Stock";
            alertasCriticas++;
        } else if (producto.stock <= producto.stockMinimo) {
            claseEtiqueta = "bg-danger";
            textoStock = "Crítico";
            alertasCriticas++;
        } else if (producto.stock <= producto.stockMinimo + 5) {
            claseEtiqueta = "bg-warning text-dark";
            textoStock = "Bajo";
        }

        cuerpoTabla.innerHTML += `
            <tr>
                <td class="fw-bold text-muted">${producto.codigo || "-"}</td>
                <td class="fw-bold">${producto.nombre || "-"}</td>
                <td>${producto.categoria || "-"}<br><small class="text-muted">${producto.subcategoria || "-"}</small></td>
                <td>${producto.marca || "-"}</td>
                <td class="text-brand-orange fw-bold">$${(producto.precio || 0).toLocaleString("es-CL")}</td>
                <td><span class="badge ${claseEtiqueta}">${producto.stock || 0} uni. (${textoStock})</span></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editarProducto(${producto.id})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${producto.id})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    }

    let elTotal = document.getElementById("metrica-total-productos");
    let elCritico = document.getElementById("metrica-stock-critico");
    if (elTotal) elTotal.textContent = productosAdmin.length;
    if (elCritico) elCritico.textContent = alertasCriticas + " alertas";
}

function mostrarFormularioProducto() {
    document.getElementById("formulario-productos").style.display = "block";
    document.getElementById("producto-id").value = "";
    document.getElementById("producto-codigo").value = "";
    document.getElementById("producto-nombre").value = "";
    document.getElementById("producto-marca").value = "";
    document.getElementById("producto-categoria").value = "";
    document.getElementById("producto-subcategoria").value = "";
    document.getElementById("producto-unidad").value = "Unidad";
    document.getElementById("producto-pcompra").value = "";
    document.getElementById("producto-precio").value = "";
    document.getElementById("producto-stock").value = "";
    document.getElementById("producto-stockmin").value = "";
    document.getElementById("producto-imagen").value = "";
    let descInput = document.getElementById("producto-descripcion");
    if (descInput) descInput.value = "";
}

function ocultarFormularioProducto() {
    document.getElementById("formulario-productos").style.display = "none";
}

function guardarProducto() {
    let idTexto = document.getElementById("producto-id").value;
    let codigo = document.getElementById("producto-codigo").value.trim();
    let nombre = document.getElementById("producto-nombre").value.trim();
    let marca = document.getElementById("producto-marca").value.trim();
    let categoria = document.getElementById("producto-categoria").value.trim();
    let subcategoria = document.getElementById("producto-subcategoria").value.trim();
    let unidad = document.getElementById("producto-unidad").value.trim();
    let pcompra = document.getElementById("producto-pcompra").value;
    let precio = document.getElementById("producto-precio").value;
    let stock = document.getElementById("producto-stock").value;
    let stockmin = document.getElementById("producto-stockmin").value;

    let imagenInput = document.getElementById("producto-imagen").value.trim();
    let imagenFinal = imagenInput !== "" ? imagenInput : "img/favicon-ferreteria.png";

    let descInput = document.getElementById("producto-descripcion");
    let descripcionFinal = descInput && descInput.value.trim() !== "" ? descInput.value.trim() : "Sin descripción detallada.";

    if (codigo === "" || nombre === "" || marca === "" || categoria === "" || precio === "" || stock === "") {
        alert("Debe completar los campos principales del producto.");
        return;
    }

    if (Number(pcompra) < 0 || Number(precio) < 0 || Number(stock) < 0 || Number(stockmin) < 0) {
        alert("Los precios y el stock no pueden ser negativos.");
        return;
    }

    if (idTexto === "") {
        let nuevoId = productosAdmin.length > 0 ? productosAdmin[productosAdmin.length - 1].id + 1 : 1;
        productosAdmin.push({
            id: nuevoId,
            codigo: codigo,
            categoria: categoria,
            subcategoria: subcategoria,
            nombre: nombre,
            marca: marca,
            unidad: unidad,
            precioCompra: Number(pcompra),
            precio: Number(precio),
            stock: Number(stock),
            stockMinimo: Number(stockmin),
            imagen: imagenFinal,
            descripcion: descripcionFinal,
        });
    } else {
        let idBuscado = Number(idTexto);
        let indice = productosAdmin.findIndex((p) => p.id === idBuscado);
        if (indice !== -1) {
            productosAdmin[indice].codigo = codigo;
            productosAdmin[indice].nombre = nombre;
            productosAdmin[indice].marca = marca;
            productosAdmin[indice].categoria = categoria;
            productosAdmin[indice].subcategoria = subcategoria;
            productosAdmin[indice].unidad = unidad;
            productosAdmin[indice].precioCompra = Number(pcompra);
            productosAdmin[indice].precio = Number(precio);
            productosAdmin[indice].stock = Number(stock);
            productosAdmin[indice].stockMinimo = Number(stockmin);
            productosAdmin[indice].imagen = imagenFinal;
            productosAdmin[indice].descripcion = descripcionFinal;
        }
    }

    localStorage.setItem("inventarioFerreteria", JSON.stringify(productosAdmin));
    ocultarFormularioProducto();
    cargarProductos();
}

function editarProducto(id) {
    let indice = productosAdmin.findIndex((p) => p.id === id);
    if (indice !== -1) {
        document.getElementById("producto-id").value = productosAdmin[indice].id;
        document.getElementById("producto-codigo").value = productosAdmin[indice].codigo || "";
        document.getElementById("producto-nombre").value = productosAdmin[indice].nombre || "";
        document.getElementById("producto-marca").value = productosAdmin[indice].marca || "";
        document.getElementById("producto-categoria").value = productosAdmin[indice].categoria || "";
        document.getElementById("producto-subcategoria").value = productosAdmin[indice].subcategoria || "";
        document.getElementById("producto-unidad").value = productosAdmin[indice].unidad || "Unidad";
        document.getElementById("producto-pcompra").value = productosAdmin[indice].precioCompra || 0;
        document.getElementById("producto-precio").value = productosAdmin[indice].precio || 0;
        document.getElementById("producto-stock").value = productosAdmin[indice].stock || 0;
        document.getElementById("producto-stockmin").value = productosAdmin[indice].stockMinimo || 0;
        document.getElementById("producto-imagen").value = productosAdmin[indice].imagen || "";
        
        let descInput = document.getElementById("producto-descripcion");
        if (descInput) {
            descInput.value = productosAdmin[indice].descripcion || "";
        }

        document.getElementById("formulario-productos").style.display = "block";
    }
}

function eliminarProducto(id) {
    productosAdmin = productosAdmin.filter((p) => p.id !== id);
    localStorage.setItem("inventarioFerreteria", JSON.stringify(productosAdmin));
    cargarProductos();
}

// ==========================================
// 3. FUNCIONES DE COLABORADORES / USUARIOS
// ==========================================

function cargarColaboradores() {
    let cuerpoTabla = document.getElementById("tabla-colaboradores-cuerpo");
    if (!cuerpoTabla) return;
    cuerpoTabla.innerHTML = "";

    let listaUsuarios = obtenerUsuariosNormalizados();

    for (let i = 0; i < listaUsuarios.length; i++) {
        let colab = listaUsuarios[i];
        let claseRol =
            colab.rol === "admin"
                ? "badge bg-primary"
                : colab.rol === "cliente"
                  ? "badge bg-info text-dark"
                  : "badge etiqueta-vendedor";

        cuerpoTabla.innerHTML += `
            <tr>
                <td class="fw-bold">${colab.rut}</td>
                <td class="fw-bold">${colab.nombre}</td>
                <td>${colab.correo}</td>
                <td><span class="${claseRol}">${colab.rol}</span></td>
                <td>${colab.comuna}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editarColaborador('${colab.idUnico}')"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarColaborador('${colab.idUnico}')"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    }
    let elTotalColab = document.getElementById("metrica-total-colaboradores");
    if (elTotalColab) elTotalColab.textContent = listaUsuarios.length;
}

function iniciarSelectRegiones() {
    let selectRegion = document.getElementById("colab-region");
    if (!selectRegion) return;
    selectRegion.innerHTML = '<option value="">Seleccione Región...</option>';
    if (typeof regiones !== "undefined") {
        regiones.forEach((region, indice) => {
            selectRegion.innerHTML += `<option value="${indice}">${region.nombre}</option>`;
        });
    }
}

function cargarComunasMenu() {
    let regionSeleccionada = document.getElementById("colab-region").value;
    let selectComuna = document.getElementById("colab-comuna");
    if (!selectComuna) return;
    selectComuna.innerHTML = '<option value="">Seleccione Comuna...</option>';

    if (regionSeleccionada !== "" && typeof regiones !== "undefined") {
        let indiceRegion = Number(regionSeleccionada);
        let comunas = regiones[indiceRegion].comunas;
        comunas.forEach((comuna) => {
            selectComuna.innerHTML += `<option value="${comuna}">${comuna}</option>`;
        });
    }
}

// VALIDACIÓN DE RUT ESTRICTA Y FUNCIONAL (Módulo 11 real)
function esRutValido(rutOriginal) {
    const run = rutOriginal.trim().toUpperCase();
    if (run === "") return false;
    
    if (run.includes(".") || run.includes("-")) return false;
    
    const formatoRun = /^\d+[0-9K]$/;
    if (!formatoRun.test(run)) return false;

    const cuerpo = run.slice(0, -1);
    const digitoIngresado = run.slice(-1);
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;
        multiplicador++;
        if (multiplicador === 8) {
            multiplicador = 2;
        }
    }

    const resultado = 11 - (suma % 11);
    let digitoCalculado;

    if (resultado === 11) {
        digitoCalculado = "0";
    } else if (resultado === 10) {
        digitoCalculado = "K";
    } else {
        digitoCalculado = String(resultado);
    }

    return digitoIngresado === digitoCalculado;
}

function mostrarFormularioColaborador() {
    document.getElementById("formulario-colaboradores").style.display = "block";
    document.getElementById("colab-rut-original").value = "";

    let inputRut = document.getElementById("colab-rut");
    inputRut.value = "";
    inputRut.readOnly = false;

    document.getElementById("colab-nombre").value = "";
    document.getElementById("colab-correo").value = "";
    document.getElementById("colab-rol").value = "cliente";
    document.getElementById("colab-region").value = "";
    cargarComunasMenu();
    document.getElementById("colab-direccion").value = "";
}

function ocultarFormularioColaborador() {
    document.getElementById("formulario-colaboradores").style.display = "none";
}

function guardarColaborador() {
    let rutOriginal = document.getElementById("colab-rut-original").value;
    let rut = document.getElementById("colab-rut").value.trim();
    let nombre = document.getElementById("colab-nombre").value.trim();
    let correo = document.getElementById("colab-correo").value.trim().toLowerCase();
    let rol = document.getElementById("colab-rol").value;
    let direccion = document.getElementById("colab-direccion").value.trim();

    let indiceRegion = document.getElementById("colab-region").value;
    let regionTexto = "";
    if (indiceRegion !== "" && typeof regiones !== "undefined") {
        regionTexto = regiones[Number(indiceRegion)].nombre;
    }
    let comuna = document.getElementById("colab-comuna").value;

    if (rut === "" || nombre === "" || correo === "") {
        alert("Rut, nombre y correo son obligatorios.");
        return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo)) {
        alert("Ingrese un correo electrónico válido (ejemplo: usuario@empresa.cl).");
        return;
    }

    if (!esRutValido(rut)) {
        alert("El RUT ingresado no es válido. Ingréselo sin puntos ni guión.");
        return;
    }

    let rawUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let rutDuplicado = rawUsuarios.some(
        (c) => (c.rut === rut || c.run === rut) && (c.rut !== rutOriginal && c.run !== rutOriginal)
    );
    if (rutDuplicado) {
        alert("Este RUT ya se encuentra registrado en el sistema.");
        return;
    }

    let correoDuplicado = rawUsuarios.some(
        (c) => c.correo === correo && (c.rut !== rutOriginal && c.run !== rutOriginal)
    );
    if (correoDuplicado) {
        alert("Este correo electrónico ya está en uso por otro usuario.");
        return;
    }

    let sesionActual = JSON.parse(localStorage.getItem("sesionUsuario") || "{}");

    if (rutOriginal !== "") {
        let usuarioPrevio = rawUsuarios.find(
            (c) => (c.rut === rutOriginal || c.run === rutOriginal)
        );
        if (
            usuarioPrevio &&
            usuarioPrevio.correo === sesionActual.correo &&
            rol !== "admin"
        ) {
            let adminsRestantes = rawUsuarios.filter(
                (c) => c.rol === "admin" && (c.rut !== rutOriginal && c.run !== rutOriginal)
            );
            if (adminsRestantes.length === 0) {
                alert(
                    "Operación denegada. Eres el único Administrador del sistema y no puedes quitarte este rol.",
                );
                return;
            }
        }
    }

    if (rutOriginal === "") {
        rawUsuarios.push({
            rut: rut,
            nombre: nombre,
            correo: correo,
            rol: rol,
            region: regionTexto,
            comuna: comuna,
            direccion: direccion,
            contrasena: "1234",
        });
    } else {
        let indice = rawUsuarios.findIndex(
            (c) => (c.rut === rutOriginal || c.run === rutOriginal)
        );
        if (indice !== -1) {
            if (rawUsuarios[indice].run !== undefined) {
                rawUsuarios[indice].run = rut;
            } else {
                rawUsuarios[indice].rut = rut;
            }
            rawUsuarios[indice].nombre = nombre;
            rawUsuarios[indice].correo = correo;
            rawUsuarios[indice].rol = rol;
            rawUsuarios[indice].region = regionTexto;
            rawUsuarios[indice].comuna = comuna;
            rawUsuarios[indice].direccion = direccion;
        }
    }

    localStorage.setItem("usuarios", JSON.stringify(rawUsuarios));
    ocultarFormularioColaborador();
    cargarColaboradores();
}

function editarColaborador(idUnico) {
    let rawUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let indice = rawUsuarios.findIndex(
        (c) => (c.rut === idUnico || c.run === idUnico || (c.rut || c.run) === idUnico)
    );
    
    if (indice === -1) {
        indice = rawUsuarios.findIndex((c, idx) => `USER-${idx}` === idUnico);
    }

    if (indice !== -1) {
        let usuario = rawUsuarios[indice];
        let valorRut = usuario.rut || usuario.run || "";

        document.getElementById("colab-rut-original").value = valorRut;

        let inputRut = document.getElementById("colab-rut");
        inputRut.value = valorRut;
        inputRut.readOnly = true;

        document.getElementById("colab-nombre").value = usuario.nombre || "";
        document.getElementById("colab-correo").value = usuario.correo || "";
        document.getElementById("colab-rol").value = usuario.rol || "cliente";

        if (typeof regiones !== "undefined") {
            let indexRegion = regiones.findIndex(
                (r) => r.nombre === usuario.region,
            );
            if (indexRegion !== -1) {
                document.getElementById("colab-region").value = indexRegion;
                cargarComunasMenu();
            } else {
                document.getElementById("colab-region").value = "";
            }
        }
        document.getElementById("colab-comuna").value = usuario.comuna || "";
        document.getElementById("colab-direccion").value = usuario.direccion || "";

        document.getElementById("formulario-colaboradores").style.display = "block";
    }
}

function eliminarColaborador(idUnico) {
    let rawUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let sesionActual = JSON.parse(localStorage.getItem("sesionUsuario") || "{}");
    
    let indice = rawUsuarios.findIndex(
        (c) => (c.rut === idUnico || c.run === idUnico || (c.rut || c.run) === idUnico)
    );
    if (indice === -1) {
        indice = rawUsuarios.findIndex((c, idx) => `USER-${idx}` === idUnico);
    }

    if (indice !== -1) {
        let colabAEliminar = rawUsuarios[indice];
        let valRut = colabAEliminar.rut || colabAEliminar.run;

        if (colabAEliminar && colabAEliminar.correo === sesionActual.correo) {
            alert("No puedes eliminar tu propia cuenta mientras tienes la sesión iniciada.");
            return;
        }

        if (colabAEliminar && colabAEliminar.rol === "admin") {
            let adminsRestantes = rawUsuarios.filter(
                (c) => c.rol === "admin" && (c.rut !== valRut && c.run !== valRut)
            );
            if (adminsRestantes.length === 0) {
                alert("Operación denegada. No puedes eliminar al único Administrador del sistema.");
                return;
            }
        }

        rawUsuarios.splice(indice, 1);
        localStorage.setItem("usuarios", JSON.stringify(rawUsuarios));
        cargarColaboradores();
    }
}

// Funciones inicializadoras
iniciarSelectRegiones();
cargarProductos();
cargarColaboradores();

function protegerRutaAdmin() {
    const sesionGuardada =
        localStorage.getItem("sesionUsuario") ||
        sessionStorage.getItem("sesionUsuario");

    if (!sesionGuardada) {
        window.location.href = "login.html";
        return;
    }

    const usuario = JSON.parse(sesionGuardada);
    if (usuario.rol !== "admin") {
        window.location.href = "index.html";
    }
}

protegerRutaAdmin();