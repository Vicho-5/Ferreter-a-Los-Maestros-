// ELEMENTOS DEL FORMULARIO

const formulario = document.querySelector("#form-registro");

const inputRun = document.querySelector("#run");
const inputNombre = document.querySelector("#nombre");
const inputApellidos = document.querySelector("#apellidos");
const inputCorreo = document.querySelector("#correo-registro");
const inputFechaNacimiento = document.querySelector("#fecha-nacimiento");

const inputContrasena = document.querySelector("#contrasena-registro");
const inputConfirmarContrasena = document.querySelector("#confirmar-contrasena");

const selectTipoUsuario = document.querySelector("#tipo-usuario");
const selectRegion = document.querySelector("#region");
const selectComuna = document.querySelector("#comuna");

const inputDireccion = document.querySelector("#direccion");
const contadorDireccion = document.querySelector("#contador-direccion");

// MENSAJES DE ERROR

const errorRun = document.querySelector("#error-run");
const errorNombre = document.querySelector("#error-nombre");
const errorApellidos = document.querySelector("#error-apellidos");
const errorCorreo = document.querySelector("#error-correo-registro");

const errorContrasena = document.querySelector("#error-contrasena-registro");
const errorConfirmarContrasena = document.querySelector("#error-confirmar-contrasena");

const errorTipoUsuario = document.querySelector("#error-tipo-usuario");
const errorRegion = document.querySelector("#error-region");
const errorComuna = document.querySelector("#error-comuna");
const errorDireccion = document.querySelector("#error-direccion");

// BOTONES MOSTRAR CONTRASEÑA

const btnMostrarContrasena = document.querySelector("#btn-mostrar-contrasena-registro");

const btnMostrarConfirmacion = document.querySelector("#btn-mostrar-confirmacion");

const btnIrLogin = document.querySelector("#btn-ir-login");

// REGIONES Y COMUNAS

const regiones = [

    {
        nombre: "Región de Arica y Parinacota",
        comunas: ["Arica", "Camarones","Putre", "General Lagos"]
    },

    {
        nombre: "Región de Tarapacá",
        comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte",
                "Camiña", "Colchane", "Huara", "Pica"]
    },

    {
        nombre: "Región de Antofagasta",
        comunas: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", 
                "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
    },

    {
        nombre: "Región de Atacama",
        comunas: ["Copiapó","Caldera","Tierra Amarilla","Chañaral","Diego de Almagro",
                "Vallenar","Alto del Carmen","Freirina","Huasco"]
    },

    {
        nombre: "Región de Coquimbo",
        comunas: ["La Serena","Coquimbo","Andacollo","La Higuera","Paihuano","Vicuña",
                "Illapel","Canela","Los Vilos","Salamanca","Ovalle","Combarbalá",
                "Monte Patria","Punitaqui","Río Hurtado"]
    },

    {
        nombre: "Región de Valparaíso",
        comunas: ["Valparaíso","Casablanca","Concón","Juan Fernández","Puchuncaví","Quintero",
                "Viña del Mar","Isla de Pascua","Los Andes","Calle Larga","Rinconada","San Esteban",
                "La Ligua","Cabildo","Papudo","Petorca","Zapallar","Quillota","La Calera","Hijuelas",
                "La Cruz","Nogales","San Antonio","Algarrobo","Cartagena","El Quisco","El Tabo",
                "Santo Domingo","San Felipe","Catemu","Llay-Llay","Panquehue","Putaendo",
                "Santa María","Limache","Quilpué","Villa Alemana","Olmué"]
    },

    {
        nombre: "Región Metropolitana de Santiago",
        comunas: ["Santiago","Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central",
                "Huechuraba","Independencia","La Cisterna","La Florida","La Granja","La Pintana",
                "La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú",
                "Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura",
                "Quinta Normal","Recoleta","Renca","San Joaquín","San Miguel","San Ramón","Vitacura",
                "Puente Alto","Pirque","San José de Maipo","Colina","Lampa","Tiltil","San Bernardo",
                "Buin","Calera de Tango","Paine","Melipilla","Alhué","Curacaví","María Pinto","San Pedro",
                "Talagante","El Monte","Isla de Maipo","Padre Hurtado","Peñaflor"]
    },

    {
        nombre: "Región del Libertador General Bernardo O'Higgins",
        comunas: ["Rancagua","Codegua","Coinco","Coltauco","Doñihue","Graneros","Las Cabras","Machalí",
                "Malloa","Mostazal","Olivar","Peumo","Pichidegua","Quinta de Tilcoco","Rengo","Requínoa",
                "San Vicente","Pichilemu","La Estrella","Litueche","Marchihue","Navidad","Paredones",
                "San Fernando","Chépica","Chimbarongo","Lolol","Nancagua","Palmilla","Peralillo",
                "Placilla","Pumanque","Santa Cruz"]
    },

    {
        nombre: "Región del Maule",
        comunas: ["Talca","Constitución","Curepto","Empedrado","Maule","Pelarco","Pencahue","Río Claro",
                "San Clemente","San Rafael","Cauquenes","Chanco","Pelluhue","Curicó","Hualañé","Licantén",
                "Molina","Rauco","Romeral","Sagrada Familia","Teno","Vichuquén","Linares","Colbún","Longaví",
                "Parral","Retiro","San Javier","Villa Alegre","Yerbas Buenas"]
    },

    {
        nombre: "Región de Ñuble",
        comunas: ["Chillán","Bulnes","Chillán Viejo","El Carmen","Pemuco","Pinto","Quillón","San Ignacio",
                "Yungay","Quirihue","Cobquecura","Coelemu", "Ninhue","Portezuelo","Ránquil","Treguaco", "San Carlos",
                "Coihueco","Ñiquén","San Fabián","San Nicolás"]
    },

    {
        nombre: "Región del Biobío",
        comunas: ["Concepción","Coronel","Chiguayante","Florida","Hualqui","Lota","Penco","San Pedro de la Paz",
                "Santa Juana","Talcahuano","Tomé","Hualpén","Lebu","Arauco","Cañete","Contulmo","Curanilahue",
                "Los Álamos","Tirúa","Los Ángeles","Antuco","Cabrero","Laja","Mulchén","Nacimiento","Negrete","Quilaco",
                "Quilleco","San Rosendo","Santa Bárbara","Tucapel","Yumbel","Alto Biobío"]
    },

    {
        nombre: "Región de La Araucanía",
        comunas: ["Temuco","Carahue","Cunco","Curarrehue","Freire","Galvarino","Gorbea","Lautaro","Loncoche","Melipeuco",
                "Nueva Imperial","Padre Las Casas","Perquenco","Pitrufquén","Pucón","Saavedra","Teodoro Schmidt",
                "Toltén","Vilcún","Villarrica","Cholchol","Angol","Collipulli","Curacautín","Ercilla","Lonquimay",
                "Los Sauces","Lumaco","Purén","Renaico","Traiguén","Victoria"]
    },

    {
        nombre: "Región de Los Ríos",
        comunas: [ "Valdivia","Corral","Lanco","Los Lagos","Máfil","Mariquina","Paillaco","Panguipulli",
                "La Unión","Futrono","Lago Ranco","Río Bueno"]
    },

    {
        nombre: "Región de Los Lagos",
        comunas: ["Puerto Montt","Calbuco","Cochamó","Fresia","Frutillar","Los Muermos","Llanquihue","Maullín","Puerto Varas",
                "Castro","Ancud","Chonchi","Curaco de Vélez","Dalcahue","Puqueldón","Queilén","Quellón","Quemchi","Quinchao",
                "Osorno","Puerto Octay","Purranque","Puyehue","Río Negro","San Juan de la Costa","San Pablo","Chaitén",
                "Futaleufú","Hualaihué","Palena"]
    },

    {
        nombre: "Región de Aysén del General Carlos Ibáñez del Campo",
        comunas: ["Coyhaique","Lago Verde","Aysén","Cisnes","Guaitecas","Cochrane","O'Higgins","Tortel","Chile Chico","Río Ibáñez"]
    },

    {
        nombre: "Región de Magallanes y de la Antártica Chilena",
        comunas: ["Punta Arenas","Laguna Blanca","Río Verde","San Gregorio","Cabo de Hornos","Antártica","Porvenir",
                "Primavera","Timaukel","Natales","Torres del Paine"]
    }

];

// USUARIOS INICIALES

const usuariosIniciales = [

    {
        correo: "admin@ejemplo.cl",
        contrasena: "1234",
        rol: "admin"
    },

    {
        correo: "cliente@ejemplo.cl",
        contrasena: "4321",
        rol: "cliente"
    }

];

// INICIALIZAR USUARIOS

function inicializarUsuarios() {

    const usuariosGuardados = localStorage.getItem("usuarios");

    if (!usuariosGuardados) {

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuariosIniciales)
        );

    }

}


inicializarUsuarios();

// OBTENER USUARIOS

function obtenerUsuarios() {

    const usuariosGuardados = localStorage.getItem("usuarios");

    if (!usuariosGuardados) {
        return [];
    }

    return JSON.parse(usuariosGuardados);

}

// MOSTRAR ERROR

function mostrarError(input, elementoError, mensaje) {

    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    elementoError.textContent = mensaje;

}

// LIMPIAR ERROR

function limpiarError(input, elementoError) {

    input.classList.remove("is-invalid");
    input.classList.add("is-valid");

    elementoError.textContent = "";

}

// LIMPIAR ESTADO

function limpiarEstado(input, elementoError) {

    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");

    elementoError.textContent = "";

}

// CONFIGURAR FECHA DE NACIMIENTO

function formatearFecha(fecha) {

    const anio = fecha.getFullYear();

    const mes = String(
        fecha.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        fecha.getDate()
    ).padStart(2, "0");


    return `${anio}-${mes}-${dia}`;

}


function configurarFechaNacimiento() {

    const hoy = new Date();


    const fechaMinima = new Date(
        hoy.getFullYear() - 120,
        hoy.getMonth(),
        hoy.getDate()
    );


    inputFechaNacimiento.max =
        formatearFecha(hoy);


    inputFechaNacimiento.min =
        formatearFecha(fechaMinima);

}


configurarFechaNacimiento();

// VALIDAR RUN

function validarRun() {

    const run = inputRun.value
        .trim()
        .toUpperCase();


    if (run === "") {

        mostrarError(
            inputRun,
            errorRun,
            "El RUN es obligatorio."
        );

        return false;

    }


    if (run.includes(".") || run.includes("-")) {

        mostrarError(
            inputRun,
            errorRun,
            "Ingresa el RUN sin puntos ni guion."
        );

        return false;

    }


    const formatoRun = /^\d+[0-9K]$/;


    if (!formatoRun.test(run)) {

        mostrarError(
            inputRun,
            errorRun,
            "Ingresa un RUN válido."
        );

        return false;

    }


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


    if (digitoIngresado !== digitoCalculado) {

        mostrarError(
            inputRun,
            errorRun,
            "El dígito verificador del RUN no es válido."
        );

        return false;

    }


    inputRun.value = run;

    limpiarError(
        inputRun,
        errorRun
    );

    return true;

}

// VALIDAR NOMBRE

function validarNombre() {

    const nombre = inputNombre.value.trim();


    if (nombre === "") {

        mostrarError(
            inputNombre,
            errorNombre,
            "El nombre es obligatorio."
        );

        return false;

    }


    if (nombre.length > 50) {

        mostrarError(
            inputNombre,
            errorNombre,
            "El nombre no puede superar los 50 caracteres."
        );

        return false;

    }


    limpiarError(
        inputNombre,
        errorNombre
    );

    return true;

}

// VALIDAR APELLIDOS

function validarApellidos() {

    const apellidos = inputApellidos.value.trim();


    if (apellidos === "") {

        mostrarError(
            inputApellidos,
            errorApellidos,
            "Los apellidos son obligatorios."
        );

        return false;

    }


    if (apellidos.length > 100) {

        mostrarError(
            inputApellidos,
            errorApellidos,
            "Los apellidos no pueden superar los 100 caracteres."
        );

        return false;

    }


    limpiarError(
        inputApellidos,
        errorApellidos
    );

    return true;

}

// VALIDAR CORREO

function validarCorreo() {

    const correo = inputCorreo.value
        .trim()
        .toLowerCase();


    const formatoCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (correo === "") {

        mostrarError(
            inputCorreo,
            errorCorreo,
            "El correo electrónico es obligatorio."
        );

        return false;

    }


    if (correo.length > 100) {

        mostrarError(
            inputCorreo,
            errorCorreo,
            "El correo no puede superar los 100 caracteres."
        );

        return false;

    }


    if (!formatoCorreo.test(correo)) {

        mostrarError(
            inputCorreo,
            errorCorreo,
            "Ingresa un correo electrónico válido."
        );

        return false;

    }


    limpiarError(
        inputCorreo,
        errorCorreo
    );

    return true;

}

// VALIDAR CONTRASEÑA

function validarContrasena() {

    const contrasena = inputContrasena.value;


    if (contrasena === "") {

        mostrarError(
            inputContrasena,
            errorContrasena,
            "La contraseña es obligatoria."
        );

        return false;

    }


    if (contrasena.length < 4) {

        mostrarError(
            inputContrasena,
            errorContrasena,
            "La contraseña debe tener al menos 4 caracteres."
        );

        return false;

    }


    if (contrasena.length > 10) {

        mostrarError(
            inputContrasena,
            errorContrasena,
            "La contraseña no puede superar los 10 caracteres."
        );

        return false;

    }


    limpiarError(
        inputContrasena,
        errorContrasena
    );

    return true;

}

// VALIDAR CONFIRMACIÓN DE CONTRASEÑA

function validarConfirmarContrasena() {

    const contrasena = inputContrasena.value;

    const confirmacion =
        inputConfirmarContrasena.value;


    if (confirmacion === "") {

        mostrarError(
            inputConfirmarContrasena,
            errorConfirmarContrasena,
            "Debes confirmar la contraseña."
        );

        return false;

    }


    if (confirmacion !== contrasena) {

        mostrarError(
            inputConfirmarContrasena,
            errorConfirmarContrasena,
            "Las contraseñas no coinciden."
        );

        return false;

    }


    limpiarError(
        inputConfirmarContrasena,
        errorConfirmarContrasena
    );

    return true;

}

// VALIDAR TIPO DE USUARIO

function validarTipoUsuario() {

    const tipoUsuario = selectTipoUsuario.value;


    if (tipoUsuario === "") {

        mostrarError(
            selectTipoUsuario,
            errorTipoUsuario,
            "Selecciona un tipo de usuario."
        );

        return false;

    }


    if (tipoUsuario !== "cliente") {

        mostrarError(
            selectTipoUsuario,
            errorTipoUsuario,
            "El registro público permite crear cuentas de cliente."
        );

        return false;

    }


    limpiarError(
        selectTipoUsuario,
        errorTipoUsuario
    );

    return true;

}

// VALIDAR REGIÓN

function validarRegion() {

    if (selectRegion.value === "") {

        mostrarError(
            selectRegion,
            errorRegion,
            "Selecciona una región."
        );

        return false;

    }


    limpiarError(
        selectRegion,
        errorRegion
    );

    return true;

}

// VALIDAR COMUNA

function validarComuna() {

    if (selectComuna.value === "") {

        mostrarError(
            selectComuna,
            errorComuna,
            "Selecciona una comuna."
        );

        return false;

    }


    limpiarError(
        selectComuna,
        errorComuna
    );

    return true;

}

// VALIDAR DIRECCIÓN

function validarDireccion() {

    const direccion = inputDireccion.value.trim();


    if (direccion === "") {

        mostrarError(
            inputDireccion,
            errorDireccion,
            "La dirección es obligatoria."
        );

        return false;

    }


    if (direccion.length > 300) {

        mostrarError(
            inputDireccion,
            errorDireccion,
            "La dirección no puede superar los 300 caracteres."
        );

        return false;

    }


    limpiarError(
        inputDireccion,
        errorDireccion
    );

    return true;

}

// CARGAR REGIONES

function cargarRegiones() {

    regiones.forEach(function (region, indice) {

        const opcion =
            document.createElement("option");

        opcion.value = indice;

        opcion.textContent = region.nombre;

        selectRegion.appendChild(opcion);

    });

}


cargarRegiones();

// ACTUALIZAR COMUNAS

selectRegion.addEventListener(
    "change",
    function () {

        const indiceRegion =
            Number(selectRegion.value);

        const regionSeleccionada =
            regiones[indiceRegion];


        selectComuna.innerHTML = "";


        const opcionInicial =
            document.createElement("option");

        opcionInicial.value = "";

        opcionInicial.textContent =
            "Selecciona una comuna";

        opcionInicial.selected = true;

        opcionInicial.disabled = true;


        selectComuna.appendChild(opcionInicial);


        regionSeleccionada.comunas.forEach(
            function (comuna) {

                const opcion =
                    document.createElement("option");

                opcion.value = comuna;

                opcion.textContent = comuna;

                selectComuna.appendChild(opcion);

            }
        );


        selectComuna.disabled = false;


        limpiarError(
            selectRegion,
            errorRegion
        );


        limpiarEstado(
            selectComuna,
            errorComuna
        );

    }
);

// MOSTRAR / OCULTAR CONTRASEÑA

function cambiarVisibilidadContrasena(
    input,
    boton
) {

    const icono =
        boton.querySelector("i");


    if (input.type === "password") {

        input.type = "text";

        icono.classList.remove("bi-eye");

        icono.classList.add("bi-eye-slash");

        boton.setAttribute(
            "aria-label",
            "Ocultar contraseña"
        );

    } else {

        input.type = "password";

        icono.classList.remove("bi-eye-slash");

        icono.classList.add("bi-eye");

        boton.setAttribute(
            "aria-label",
            "Mostrar contraseña"
        );

    }

}


btnMostrarContrasena.addEventListener(
    "click",
    function () {

        cambiarVisibilidadContrasena(
            inputContrasena,
            btnMostrarContrasena
        );

    }
);


btnMostrarConfirmacion.addEventListener(
    "click",
    function () {

        cambiarVisibilidadContrasena(
            inputConfirmarContrasena,
            btnMostrarConfirmacion
        );

    }
);

// VALIDACIONES MIENTRAS SE ESCRIBE

inputRun.addEventListener(
    "input",
    function () {

        if (inputRun.value.trim() === "") {

            limpiarEstado(
                inputRun,
                errorRun
            );

            return;

        }

        validarRun();

    }
);


inputNombre.addEventListener(
    "input",
    function () {

        if (inputNombre.value.trim() === "") {

            limpiarEstado(
                inputNombre,
                errorNombre
            );

            return;

        }

        validarNombre();

    }
);


inputApellidos.addEventListener(
    "input",
    function () {

        if (inputApellidos.value.trim() === "") {

            limpiarEstado(
                inputApellidos,
                errorApellidos
            );

            return;

        }

        validarApellidos();

    }
);


inputCorreo.addEventListener(
    "input",
    function () {

        if (inputCorreo.value.trim() === "") {

            limpiarEstado(
                inputCorreo,
                errorCorreo
            );

            return;

        }

        validarCorreo();

    }
);


inputContrasena.addEventListener(
    "input",
    function () {

        if (inputContrasena.value === "") {

            limpiarEstado(
                inputContrasena,
                errorContrasena
            );

            return;

        }


        validarContrasena();


        if (
            inputConfirmarContrasena.value !== ""
        ) {

            validarConfirmarContrasena();

        }

    }
);


inputConfirmarContrasena.addEventListener(
    "input",
    function () {

        if (
            inputConfirmarContrasena.value === ""
        ) {

            limpiarEstado(
                inputConfirmarContrasena,
                errorConfirmarContrasena
            );

            return;

        }


        validarConfirmarContrasena();

    }
);


selectTipoUsuario.addEventListener(
    "change",
    validarTipoUsuario
);


selectComuna.addEventListener(
    "change",
    validarComuna
);


inputDireccion.addEventListener(
    "input",
    function () {

        const cantidadCaracteres =
            inputDireccion.value.length;


        contadorDireccion.textContent =
            `${cantidadCaracteres} / 300 caracteres`;


        if (inputDireccion.value.trim() === "") {

            limpiarEstado(
                inputDireccion,
                errorDireccion
            );

            return;

        }


        validarDireccion();

    }
);

// DETECTAR AUTOCOMPLETADO DEL NAVEGADOR

inputNombre.addEventListener(
    "animationstart",
    function (evento) {

        if (
            evento.animationName ===
            "autofillDetectadoRegistro"
        ) {

            setTimeout(
                function () {

                    validarNombre();

                },
                50
            );

        }

    }
);


inputApellidos.addEventListener(
    "animationstart",
    function (evento) {

        if (
            evento.animationName ===
            "autofillDetectadoRegistro"
        ) {

            setTimeout(
                function () {

                    validarApellidos();

                },
                50
            );

        }

    }
);

inputCorreo.addEventListener(
    "animationstart",
    function (evento) {

        if (
            evento.animationName ===
            "autofillDetectadoRegistro"
        ) {

            setTimeout(
                function () {

                    validarCorreo();

                },
                50
            );

        }

    }
);


inputContrasena.addEventListener(
    "animationstart",
    function (evento) {

        if (
            evento.animationName ===
            "autofillDetectadoRegistro"
        ) {

            setTimeout(
                function () {

                    validarContrasena();

                },
                50
            );

        }

    }
);


inputConfirmarContrasena.addEventListener(
    "animationstart",
    function (evento) {

        if (
            evento.animationName ===
            "autofillDetectadoRegistro"
        ) {

            setTimeout(
                function () {

                    validarConfirmarContrasena();

                },
                50
            );

        }

    }
);

// QUITAR ESPACIOS AL SALIR DEL CAMPO

inputNombre.addEventListener(
    "blur",
    function () {

        inputNombre.value =
            inputNombre.value.trim();

    }
);


inputApellidos.addEventListener(
    "blur",
    function () {

        inputApellidos.value =
            inputApellidos.value.trim();

    }
);


inputCorreo.addEventListener(
    "blur",
    function () {

        inputCorreo.value =
            inputCorreo.value
                .trim()
                .toLowerCase();

    }
);


inputDireccion.addEventListener(
    "blur",
    function () {

        inputDireccion.value =
            inputDireccion.value.trim();

    }
);

// IR AL LOGIN

btnIrLogin.addEventListener(
    "click",
    function () {

        window.location.href =
            "login.html";

    }
);

// ENVIAR FORMULARIO

formulario.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const runValido =
            validarRun();

        const nombreValido =
            validarNombre();

        const apellidosValidos =
            validarApellidos();

        const correoValido =
            validarCorreo();

        const contrasenaValida =
            validarContrasena();

        const confirmacionValida =
            validarConfirmarContrasena();

        const tipoUsuarioValido =
            validarTipoUsuario();

        const regionValida =
            validarRegion();

        const comunaValida =
            validarComuna();

        const direccionValida =
            validarDireccion();


        if (
            !runValido ||
            !nombreValido ||
            !apellidosValidos ||
            !correoValido ||
            !contrasenaValida ||
            !confirmacionValida ||
            !tipoUsuarioValido ||
            !regionValida ||
            !comunaValida ||
            !direccionValida
        ) {

            const primerCampoConError =
                formulario.querySelector(
                    ".is-invalid"
                );


            if (primerCampoConError) {

                primerCampoConError.focus();

            }


            return;

        }


        const usuarios =
            obtenerUsuarios();


        const correo =
            inputCorreo.value
                .trim()
                .toLowerCase();


        const run =
            inputRun.value
                .trim()
                .toUpperCase();


        const correoExiste =
            usuarios.some(
                function (usuario) {

                    return (
                        usuario.correo &&
                        usuario.correo.toLowerCase()
                        === correo
                    );

                }
            );


        if (correoExiste) {

            mostrarError(
                inputCorreo,
                errorCorreo,
                "Este correo electrónico ya se encuentra registrado."
            );

            inputCorreo.focus();

            return;

        }


        const runExiste =
            usuarios.some(
                function (usuario) {

                    return (
                        usuario.run &&
                        usuario.run.toUpperCase()
                        === run
                    );

                }
            );


        if (runExiste) {

            mostrarError(
                inputRun,
                errorRun,
                "Este RUN ya se encuentra registrado."
            );

            inputRun.focus();

            return;

        }


        const indiceRegion =
            Number(selectRegion.value);


        const nuevoUsuario = {

            run: run,

            nombre:
                inputNombre.value.trim(),

            apellidos:
                inputApellidos.value.trim(),

            correo: correo,

            contrasena:
                inputContrasena.value,

            fechaNacimiento:
                document.querySelector(
                    "#fecha-nacimiento"
                ).value,

            rol: "cliente",

            region:
                regiones[indiceRegion].nombre,

            comuna:
                selectComuna.value,

            direccion:
                inputDireccion.value.trim()

        };


        usuarios.push(nuevoUsuario);


        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );


        const modalRegistroExitoso =
            new bootstrap.Modal(
                document.querySelector(
                    "#modal-registro-exitoso"
                ),
                {
                    backdrop: "static",
                    keyboard: false
                }
            );


        modalRegistroExitoso.show();

    }
);
