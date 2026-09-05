// Elementos del HTML

const formulario = document.querySelector("#form-login");

const inputCorreo = document.querySelector("#correo");
const inputContrasena = document.querySelector("#contrasena");

const errorCorreo = document.querySelector("#error-correo");
const errorContrasena = document.querySelector("#error-contrasena");

const btnMostrarContrasena = document.querySelector("#btn-mostrar-contrasena");

const inputMantenerSesion = document.querySelector("#mantener-sesion");

const inputCorreoRecuperacion = document.querySelector("#correo-recuperacion");

const errorRecuperacion = document.querySelector("#error-recuperacion");

const mensajeRecuperacion = document.querySelector("#mensaje-recuperacion");

const btnRecuperar = document.querySelector("#btn-recuperar");

//Usuarios iniciales del sistema
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

//Guardados en el localStorage
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

//Recuperar los usuarios
function obtenerUsuarios() {

    const usuariosGuardados = localStorage.getItem("usuarios");

    if (!usuariosGuardados) {

        return [];
    }

    return JSON.parse(usuariosGuardados);
}

// Guardar sesión del usuario
function guardarSesion(usuario) {

    const sesionUsuario = {
        correo: usuario.correo,
        rol: usuario.rol
    };

    // limpiar cualquier sesión anterior
    localStorage.removeItem("sesionUsuario");
    sessionStorage.removeItem("sesionUsuario");

    // si marcó "Mantener sesión iniciada"
    if (inputMantenerSesion.checked) {

        localStorage.setItem(
            "sesionUsuario",
            JSON.stringify(sesionUsuario)
        );

    }else{
        sessionStorage.setItem(
            "sesionUsuario",
            JSON.stringify(sesionUsuario)
        );
    }
}

//Mostrar mensaje de error
function mostrarError(input, elementoError, mensaje){
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    elementoError.textContent = mensaje;
}

//Limpiar mensajes de error
function limpiarError(input, elementoError) {

    input.classList.remove("is-invalid");
    input.classList.add("is-valid");

    elementoError.textContent = "";
}

function limpiarEstado(input, elementoError) {

    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");

    elementoError.textContent = "";
}

//Validar Correo
function validarCorreo(){
    const correo = inputCorreo.value.trim();
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //campo vacío
    if (correo === ""){
        mostrarError(
            inputCorreo,
            errorCorreo,
            "El correo electrónico es obligatorio."
        );
        return false;
    }

    //máximo 100 caracteres
    if(correo.length > 100){
        mostrarError(
            inputCorreo,
            errorCorreo,
            "El correo no puede superar los 100 caracteres."
        );
        return false;
    }

    //formato de correo
    if(!formatoCorreo.test(correo)){
        mostrarError(
            inputCorreo,
            errorCorreo,
            "Ingresar un correo electrónico válido."
        );
        return false;
    }

    limpiarError(inputCorreo, errorCorreo);
    return true;

}

//Validar contraseña
function validarContrasena(){
    const contrasena = inputContrasena.value;
    //campo vacío
    if(contrasena === ""){
        mostrarError(
            inputContrasena,
            errorContrasena,
            "La contraseña es obligatoria."
        );
        return false;
    }

    //mínimo 4 caracteres
    if(contrasena.length < 4){
        mostrarError(
            inputContrasena,
            errorContrasena, 
            "La contraseña debe tener al menos 4 caracteres."
        );
        return false;
    }

    //maximo 10 caracteres
    if(contrasena.length > 10){
        mostrarError(
            inputContrasena,
            errorContrasena,
            "La contraseña no puede superar los 10 caracteres."
        );
        return false;
    }

    limpiarError(inputContrasena, errorContrasena);
    return true;
}

// Validar correo mientras el usuario escribe
inputCorreo.addEventListener("input", function () {

    const correo = inputCorreo.value.trim();

    if (correo === "") {

        limpiarEstado(
            inputCorreo,
            errorCorreo
        );

        return;
    }

    validarCorreo();

});

// Validar contraseña mientras el usuario escribe
inputContrasena.addEventListener("input", function () {

    const contrasena = inputContrasena.value;

    if (contrasena === "") {

        limpiarEstado(
            inputContrasena,
            errorContrasena
        );

        return;
    }

    validarContrasena();

});

// DETECTAR AUTOCOMPLETADO DEL NAVEGADOR

inputCorreo.addEventListener(
    "animationstart",
    function (evento) {

        if (evento.animationName === "autofillDetectado") {

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

        if (evento.animationName === "autofillDetectado") {

            setTimeout(
                function () {

                    validarContrasena();

                },
                50
            );

        }

    }
);

// También validar cuando cambia el contenido
inputCorreo.addEventListener(
    "change",
    validarCorreo
);

inputContrasena.addEventListener(
    "change",
    validarContrasena
);

//Evitar espacios en el correo
inputCorreo.addEventListener("blur", function () {

    inputCorreo.value = inputCorreo.value.trim();

});

//Mostrar u Ocultar contraseña
btnMostrarContrasena.addEventListener("click", function(){
    const icono = btnMostrarContrasena.querySelector("i");
        if(inputContrasena.type === "password"){
            inputContrasena.type = "text";

            icono.classList.remove("bi-eye");
            icono.classList.add("bi-eye-slash");

            btnMostrarContrasena.setAttribute(
                "aria-label",
                "Ocultar contraseña"
            );
        }else{
            inputContrasena.type = "password";

            icono.classList.remove("bi-eye-slash");
            icono.classList.add("bi-eye");

            btnMostrarContrasena.setAttribute(
                "aria-label",
                "Mostrar contraseña"
            );
        }
    
});

// Recuperar contraseña
btnRecuperar.addEventListener("click", function () {
        const correo = inputCorreoRecuperacion.value
            .trim()
            .toLowerCase();

        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Campo vacío
        if (correo === "") {
            errorRecuperacion.textContent = "El correo electrónico es obligatorio.";
            mensajeRecuperacion.classList.add("d-none");
            inputCorreoRecuperacion.focus();
            
            return;
        }

        // Máximo 100 caracteres
        if (correo.length > 100) {

            errorRecuperacion.textContent = "El correo no puede superar los 100 caracteres.";

            mensajeRecuperacion.classList.add("d-none");

            inputCorreoRecuperacion.focus();

            return;
        }

        // Formato incorrecto
        if (!formatoCorreo.test(correo)) {

            errorRecuperacion.textContent = "Ingresa un correo electrónico válido.";

            mensajeRecuperacion.classList.add("d-none");

            inputCorreoRecuperacion.focus();

            return;
        }

        // Limpiar error
    errorRecuperacion.textContent = "";


    // Mostrar mensaje simulado
    mensajeRecuperacion.classList.remove("d-none");
    });



//Validar formulario al enviar
formulario.addEventListener("submit", function(evento){
    //evita que la pagina se recargue
    evento.preventDefault();

    // validar formulario
    const correoValido = validarCorreo();
    const contrasenaValida = validarContrasena();

    // si el correo no es válido
    if (!correoValido) {

        inputCorreo.focus();

        return;
    }

    // Si la contraseña no es válida
    if (!contrasenaValida) {

        inputContrasena.focus();

        return;
    }

    // Obtener los valores ingresados
    const correo = inputCorreo.value.trim().toLowerCase();
    const contrasena = inputContrasena.value;


    // Obtener usuarios guardados
    const usuarios = obtenerUsuarios();

    // Buscar usuario
    const usuarioEncontrado = usuarios.find(function (usuario) {

        return (
            usuario.correo.toLowerCase() === correo &&
            usuario.contrasena === contrasena
        );

    });

    // Si el usuario no existe
    if (!usuarioEncontrado) {

        mostrarError(
            inputContrasena,
            errorContrasena,
            "Correo o contraseña incorrectos."
        );

        inputContrasena.focus();

        return;
    }
    // Guardar la sesión
    guardarSesion(usuarioEncontrado);

    // Comprobar rol
    if (usuarioEncontrado.rol === "admin") {

        window.location.href = "admin.html";

    } else if (usuarioEncontrado.rol === "cliente") {

        window.location.href = "index.html";

    }


});