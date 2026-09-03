// Elementos del HTML

const formulario = document.querySelector("#form-login");

const inputCorreo = document.querySelector("#correo");
const inputContrasena = document.querySelector("#contrasena");

const errorCorreo = document.querySelector("#error-correo");
const errorContrasena = document.querySelector("#error-contrasena");

const btnMostrarContrasena = document.querySelector("#btn-mostrar-contrasena");

//Mostrar mensaje de error
function mostrarError(input, elementoError, mensaje){
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    elementoError.textContent = mensaje;
}

//Limpiar mensajes de error
function limpiarError(input, elementoError){
    input.classList.remove("is-invalid");

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

//Validar formulario al enviar
formulario.addEventListener("submit", function(evento){
    //evita que la pagina se recargue
    evento.preventDefault();

    const correoValido = validarCorreo();
    const contrasenaValida = validarContrasena();

    //solamente se continua si ambos cambpos cumplen las validaciones
    if(correoValido && contrasenaValida){
        alert("Datos ingresados correctamente")
    }
});