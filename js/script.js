var temaGuardado = localStorage.getItem("tema_preferido");
if (temaGuardado) {
    document.documentElement.setAttribute("data-theme", temaGuardado);
}

var botonTema = document.getElementById("theme_toggle");
var etiquetaTema = document.getElementById("theme_toggle_label");
var iconoTema = document.querySelector(".theme_toggle_icon");

if (temaGuardado === "dark") {
    etiquetaTema.textContent = "Modo claro";
    iconoTema.textContent = "☀";
}

botonTema.addEventListener("click", function () {
    var temaActual = document.documentElement.getAttribute("data-theme");

    if (temaActual === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        etiquetaTema.textContent = "Modo oscuro";
        iconoTema.textContent = "☾";
        localStorage.setItem("tema_preferido", "light");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        etiquetaTema.textContent = "Modo claro";
        iconoTema.textContent = "☀";
        localStorage.setItem("tema_preferido", "dark");
    }
});

var formulario = document.getElementById("formulario_contacto");

function mostrarError(idCampo, mensaje) {
    var campo = document.getElementById(idCampo);
    var span = document.getElementById("error_" + idCampo);
    span.textContent = mensaje;
    campo.parentElement.classList.add("is_invalid");
}

function limpiarError(idCampo) {
    var campo = document.getElementById(idCampo);
    var span = document.getElementById("error_" + idCampo);
    span.textContent = "";
    campo.parentElement.classList.remove("is_invalid");
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var esValido = true;

    var nombre = document.getElementById("nombre_remitente").value.trim();
    if (nombre.length < 3) {
        mostrarError("nombre_remitente", "Escribe tu nombre completo.");
        esValido = false;
    } else {
        limpiarError("nombre_remitente");
    }

    var correo = document.getElementById("correo_remitente").value.trim();
    if (correo.indexOf("@") === -1 || correo.indexOf(".") === -1) {
        mostrarError("correo_remitente", "Escribe un correo electronico valido.");
        esValido = false;
    } else {
        limpiarError("correo_remitente");
    }

    var telefono = document.getElementById("telefono_remitente").value.trim();
    var primerDigito = telefono.charAt(0);
    if (telefono.length !== 8 || (primerDigito !== "6" && primerDigito !== "7")) {
        mostrarError("telefono_remitente", "Debe tener 8 digitos y empezar con 6 o 7.");
        esValido = false;
    } else {
        limpiarError("telefono_remitente");
    }

    var edad = document.getElementById("edad_remitente").value;
    if (edad === "" || edad < 18 || edad > 99) {
        mostrarError("edad_remitente", "La edad debe estar entre 18 y 99.");
        esValido = false;
    } else {
        limpiarError("edad_remitente");
    }

    var motivo = document.getElementById("motivo_mensaje").value;
    if (motivo === "") {
        mostrarError("motivo_mensaje", "Selecciona un motivo.");
        esValido = false;
    } else {
        limpiarError("motivo_mensaje");
    }

    var asunto = document.getElementById("asunto_mensaje").value.trim();
    if (asunto === "") {
        mostrarError("asunto_mensaje", "Escribe un asunto.");
        esValido = false;
    } else {
        limpiarError("asunto_mensaje");
    }

    var mensajeTexto = document.getElementById("mensaje_texto").value.trim();
    if (mensajeTexto.length < 10) {
        mostrarError("mensaje_texto", "El mensaje debe tener al menos 10 caracteres.");
        esValido = false;
    } else {
        limpiarError("mensaje_texto");
    }

    var estado = document.getElementById("form_status");

    if (esValido) {
        estado.textContent = "Formulario valido. Escribe directamente a jorge.500.soliz@gmail.com.";
        estado.className = "form_status is_visible success";
        formulario.reset();
    } else {
        estado.textContent = "Revisa los campos marcados en rojo.";
        estado.className = "form_status is_visible error";
    }
});
