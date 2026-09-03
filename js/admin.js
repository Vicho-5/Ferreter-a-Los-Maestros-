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
    { id: 10, codigo: "HM004", categoria: "Herramientas", subcategoria: "Manuales", nombre: 'Alicate Universal 8"', marca: "STANLEY", unidad: "Unidad", precioCompra: 4200, precio: 8900, stock: 5, stockMinimo: 5, imagen: "img/prod_10_alicate.jpg", descripcion: "Alicate de acero al carbono con mango antideslizante." }
];

let productosAdmin = [];
let inventarioGuardado = localStorage.getItem("inventarioFerreteria");

if (inventarioGuardado) {
    productosAdmin = JSON.parse(inventarioGuardado);
    // Validador estricto: Si falta la propiedad 'codigo', borra el caché corrupto y carga el catálogo nuevo
    if (productosAdmin.length === 0 || productosAdmin[0].codigo === undefined) {
        productosAdmin = JSON.parse(JSON.stringify(catalogoBase));
        localStorage.setItem("inventarioFerreteria", JSON.stringify(productosAdmin));
    }
} else {
    productosAdmin = JSON.parse(JSON.stringify(catalogoBase));
    localStorage.setItem("inventarioFerreteria", JSON.stringify(productosAdmin));
}

let colaboradoresAdmin = [];
let colaboradoresGuardados = localStorage.getItem("colaboradoresAdmin");

if (colaboradoresGuardados) {
    colaboradoresAdmin = JSON.parse(colaboradoresGuardados);
} else {
    colaboradoresAdmin = [
        { rut: "182345678", nombre: "Carlos Muñoz", correo: "carlos@ferreteria.cl", rol: "Administrador", region: "Coquimbo", comuna: "La Serena", direccion: "Avenida del Mar 123" },
        { rut: "15432987K", nombre: "Constructora Coquimbo", correo: "obras@coquimbo.cl", rol: "Contratista", region: "Coquimbo", comuna: "Coquimbo", direccion: "Ruta 5 Norte 456" }
    ];
    localStorage.setItem("colaboradoresAdmin", JSON.stringify(colaboradoresAdmin));
}

const datosZonas = {
    "Metropolitana": ["Santiago", "Conchalí", "Providencia", "Ñuñoa", "Maipú"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel"]
};

// ==========================================
// 2. FUNCIONES DE PRODUCTOS
// ==========================================

function cargarProductos() {
    let cuerpoTabla = document.getElementById("tabla-productos-cuerpo");
    cuerpoTabla.innerHTML = ""; 
    let alertasCriticas = 0;

    for (let i = 0; i < productosAdmin.length; i++) {
        let producto = productosAdmin[i];
        let claseEtiqueta = "bg-success";
        let textoStock = "Normal";

        if (producto.stock <= producto.stockMinimo) {
            claseEtiqueta = "bg-danger";
            textoStock = "Crítico";
            alertasCriticas++; 
        } else if (producto.stock <= (producto.stockMinimo + 5)) {
            claseEtiqueta = "bg-warning text-dark";
            textoStock = "Bajo";
        }

        cuerpoTabla.innerHTML += `
            <tr>
                <td class="fw-bold text-muted">${producto.codigo}</td>
                <td class="fw-bold">${producto.nombre}</td>
                <td>${producto.categoria}<br><small class="text-muted">${producto.subcategoria}</small></td>
                <td>${producto.marca}</td>
                <td class="text-brand-orange fw-bold">$${producto.precio.toLocaleString("es-CL")}</td>
                <td><span class="badge ${claseEtiqueta}">${producto.stock} uni. (${textoStock})</span></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editarProducto(${producto.id})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${producto.id})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    }

    document.getElementById("metrica-total-productos").textContent = productosAdmin.length;
    document.getElementById("metrica-stock-critico").textContent = alertasCriticas + " productos en riesgo";
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
}

function ocultarFormularioProducto() {
    document.getElementById("formulario-productos").style.display = "none";
}

function guardarProducto() {
    let idTexto = document.getElementById("producto-id").value;
    let codigo = document.getElementById("producto-codigo").value;
    let nombre = document.getElementById("producto-nombre").value;
    let marca = document.getElementById("producto-marca").value;
    let categoria = document.getElementById("producto-categoria").value;
    let subcategoria = document.getElementById("producto-subcategoria").value;
    let unidad = document.getElementById("producto-unidad").value;
    let pcompra = document.getElementById("producto-pcompra").value;
    let precio = document.getElementById("producto-precio").value;
    let stock = document.getElementById("producto-stock").value;
    let stockmin = document.getElementById("producto-stockmin").value;

    if (codigo === "" || nombre === "" || marca === "" || categoria === "" || precio === "" || stock === "" || stockmin === "") {
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
            imagen: "img/favicon-ferreteria.png", 
            descripcion: "Añadido desde administración."
        });
        alert("Producto creado con éxito.");
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
        }
        alert("Producto modificado con éxito.");
    }

    localStorage.setItem("inventarioFerreteria", JSON.stringify(productosAdmin));
    ocultarFormularioProducto();
    cargarProductos();
}

function editarProducto(id) {
    let indice = productosAdmin.findIndex((p) => p.id === id);
    if (indice !== -1) {
        document.getElementById("producto-id").value = productosAdmin[indice].id;
        document.getElementById("producto-codigo").value = productosAdmin[indice].codigo;
        document.getElementById("producto-nombre").value = productosAdmin[indice].nombre;
        document.getElementById("producto-marca").value = productosAdmin[indice].marca;
        document.getElementById("producto-categoria").value = productosAdmin[indice].categoria;
        document.getElementById("producto-subcategoria").value = productosAdmin[indice].subcategoria;
        document.getElementById("producto-unidad").value = productosAdmin[indice].unidad;
        document.getElementById("producto-pcompra").value = productosAdmin[indice].precioCompra;
        document.getElementById("producto-precio").value = productosAdmin[indice].precio;
        document.getElementById("producto-stock").value = productosAdmin[indice].stock;
        document.getElementById("producto-stockmin").value = productosAdmin[indice].stockMinimo;
        
        document.getElementById("formulario-productos").style.display = "block";
    }
}

function eliminarProducto(id) {
    productosAdmin = productosAdmin.filter((p) => p.id !== id);
    localStorage.setItem("inventarioFerreteria", JSON.stringify(productosAdmin));
    alert("Producto eliminado.");
    cargarProductos();
}

// ==========================================
// 3. FUNCIONES DE COLABORADORES
// ==========================================

function cargarColaboradores() {
    let cuerpoTabla = document.getElementById("tabla-colaboradores-cuerpo");
    cuerpoTabla.innerHTML = ""; 
    
    for (let i = 0; i < colaboradoresAdmin.length; i++) {
        let colab = colaboradoresAdmin[i];
        let claseRol = colab.rol === "Administrador" ? "badge bg-primary" : 
                       colab.rol === "Contratista" ? "badge bg-warning text-dark" : "badge etiqueta-vendedor";

        cuerpoTabla.innerHTML += `
            <tr>
                <td class="fw-bold">${colab.rut}</td>
                <td class="fw-bold">${colab.nombre}</td>
                <td>${colab.correo}</td>
                <td><span class="${claseRol}">${colab.rol}</span></td>
                <td>${colab.comuna}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editarColaborador('${colab.rut}')"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarColaborador('${colab.rut}')"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    }
    document.getElementById("metrica-total-colaboradores").textContent = colaboradoresAdmin.length;
}

function iniciarSelectRegiones() {
    let selectRegion = document.getElementById("colab-region");
    selectRegion.innerHTML = '<option value="">Seleccione Región...</option>';
    let regiones = Object.keys(datosZonas);
    for (let i = 0; i < regiones.length; i++) {
        selectRegion.innerHTML += `<option value="${regiones[i]}">${regiones[i]}</option>`;
    }
}

function cargarComunasMenu() {
    let regionSeleccionada = document.getElementById("colab-region").value;
    let selectComuna = document.getElementById("colab-comuna");
    selectComuna.innerHTML = '<option value="">Seleccione Comuna...</option>';

    if (regionSeleccionada !== "") {
        let comunas = datosZonas[regionSeleccionada];
        for (let i = 0; i < comunas.length; i++) {
            selectComuna.innerHTML += `<option value="${comunas[i]}">${comunas[i]}</option>`;
        }
    }
}

function esRutValido(rut) {
    if (!/^[0-9]+[0-9kK]$/.test(rut)) return false;
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    let suma = 0;
    let multiplo = 2;
    
    for (let i = 1; i <= cuerpo.length; i++) {
        suma += multiplo * rut.charAt(cuerpo.length - i);
        if (multiplo < 7) multiplo += 1; else multiplo = 2;
    }
    
    let dvEsperado = 11 - (suma % 11);
    dvEsperado = (dvEsperado === 11) ? "0" : ((dvEsperado === 10) ? "K" : dvEsperado.toString());
    
    return dv === dvEsperado;
}

function mostrarFormularioColaborador() {
    document.getElementById("formulario-colaboradores").style.display = "block";
    document.getElementById("colab-rut-original").value = "";
    document.getElementById("colab-rut").value = "";
    document.getElementById("colab-nombre").value = "";
    document.getElementById("colab-correo").value = "";
    document.getElementById("colab-rol").value = "Vendedor";
    document.getElementById("colab-region").value = "";
    cargarComunasMenu(); 
    document.getElementById("colab-direccion").value = "";
}

function ocultarFormularioColaborador() {
    document.getElementById("formulario-colaboradores").style.display = "none";
}

function guardarColaborador() {
    let rutOriginal = document.getElementById("colab-rut-original").value;
    let rut = document.getElementById("colab-rut").value;
    let nombre = document.getElementById("colab-nombre").value;
    let correo = document.getElementById("colab-correo").value;
    let rol = document.getElementById("colab-rol").value;
    let region = document.getElementById("colab-region").value;
    let comuna = document.getElementById("colab-comuna").value;
    let direccion = document.getElementById("colab-direccion").value;

    if (rut === "" || nombre === "" || correo === "" || region === "" || comuna === "" || direccion === "") {
        alert("Por favor complete todos los campos requeridos.");
        return;
    }

    if (!esRutValido(rut)) {
        alert("El RUT ingresado no es válido o tiene puntos/guion. Escríbalo seguido (Ej: 11222333K).");
        return;
    }

    if (nombre.length > 50) {
        alert("El nombre no puede superar los 50 caracteres.");
        return;
    }
    if (direccion.length > 300) {
        alert("La dirección no puede superar los 300 caracteres.");
        return;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo) || correo.length > 100) {
        alert("Debe ingresar un correo electrónico válido de máximo 100 caracteres.");
        return;
    }

    if (rutOriginal === "") {
        colaboradoresAdmin.push({ rut: rut, nombre: nombre, correo: correo, rol: rol, region: region, comuna: comuna, direccion: direccion });
        alert("Colaborador creado con éxito.");
    } else {
        let indice = colaboradoresAdmin.findIndex((c) => c.rut === rutOriginal);
        if (indice !== -1) {
            colaboradoresAdmin[indice].rut = rut;
            colaboradoresAdmin[indice].nombre = nombre;
            colaboradoresAdmin[indice].correo = correo;
            colaboradoresAdmin[indice].rol = rol;
            colaboradoresAdmin[indice].region = region;
            colaboradoresAdmin[indice].comuna = comuna;
            colaboradoresAdmin[indice].direccion = direccion;
        }
        alert("Colaborador modificado con éxito.");
    }

    localStorage.setItem("colaboradoresAdmin", JSON.stringify(colaboradoresAdmin));
    ocultarFormularioColaborador();
    cargarColaboradores();
}

function editarColaborador(rut) {
    let indice = colaboradoresAdmin.findIndex((c) => c.rut === rut);
    if (indice !== -1) {
        document.getElementById("colab-rut-original").value = colaboradoresAdmin[indice].rut;
        document.getElementById("colab-rut").value = colaboradoresAdmin[indice].rut;
        document.getElementById("colab-nombre").value = colaboradoresAdmin[indice].nombre;
        document.getElementById("colab-correo").value = colaboradoresAdmin[indice].correo;
        document.getElementById("colab-rol").value = colaboradoresAdmin[indice].rol;
        
        document.getElementById("colab-region").value = colaboradoresAdmin[indice].region;
        cargarComunasMenu();
        document.getElementById("colab-comuna").value = colaboradoresAdmin[indice].comuna;
        
        document.getElementById("colab-direccion").value = colaboradoresAdmin[indice].direccion;
        
        document.getElementById("formulario-colaboradores").style.display = "block";
    }
}

function eliminarColaborador(rut) {
    colaboradoresAdmin = colaboradoresAdmin.filter((c) => c.rut !== rut);
    localStorage.setItem("colaboradoresAdmin", JSON.stringify(colaboradoresAdmin));
    alert("Colaborador eliminado.");
    cargarColaboradores();
}

// 4. INICIALIZAR AL CARGAR
iniciarSelectRegiones(); 
cargarProductos();
cargarColaboradores();