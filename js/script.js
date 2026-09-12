/* ============================================================
   script.js — Hoja de vida de Jorge Emanuel Soliz Luque
   ------------------------------------------------------------
   Funcionalidades implementadas con JavaScript nativo (sin
   frameworks ni librerías externas):

   1. Modo claro / oscuro persistente (localStorage).
   2. Validación del formulario de contacto en el cliente.

   Nomenclatura: snake_case en variables y funciones.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
    /* Cada inicializador va en su propio try/catch: si uno falla,
       el otro debe seguir funcionando (por ejemplo, que un error
       en el selector de tema no deje sin validación al formulario). */
    try {
        inicializar_selector_de_tema();
    } catch (error) {
        console.error("Error al inicializar el selector de tema:", error);
    }

    try {
        inicializar_validacion_de_formulario();
    } catch (error) {
        console.error("Error al inicializar la validación del formulario:", error);
    }
});

/* ------------------------------------------------------------
   1. Modo claro / oscuro
   ------------------------------------------------------------ */
function inicializar_selector_de_tema() {
    var boton_tema = document.getElementById("theme_toggle");
    var etiqueta_tema = document.getElementById("theme_toggle_label");
    var icono_tema = boton_tema ? boton_tema.querySelector(".theme_toggle_icon") : null;

    if (!boton_tema) {
        return;
    }

    actualizar_boton_de_tema(obtener_tema_actual());

    boton_tema.addEventListener("click", function () {
        var tema_actual = obtener_tema_actual();
        var tema_nuevo = tema_actual === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", tema_nuevo);
        localStorage.setItem("tema_preferido", tema_nuevo);
        actualizar_boton_de_tema(tema_nuevo);
    });

    function obtener_tema_actual() {
        return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    }

    function actualizar_boton_de_tema(tema) {
        var es_oscuro = tema === "dark";
        boton_tema.setAttribute("aria-pressed", String(es_oscuro));
        if (etiqueta_tema) {
            etiqueta_tema.textContent = es_oscuro ? "Modo claro" : "Modo oscuro";
        }
        if (icono_tema) {
            icono_tema.textContent = es_oscuro ? "☀" : "☾";
        }
    }
}

/* ------------------------------------------------------------
   2. Validación del formulario de contacto
   ------------------------------------------------------------ */
function inicializar_validacion_de_formulario() {
    var formulario = document.querySelector("#contacto form");

    if (!formulario) {
        return;
    }

    var mensaje_estado = document.getElementById("form_status");

    /* Reglas de validación por campo. Cada función recibe el
       elemento del campo y devuelve un mensaje de error (string)
       o una cadena vacía si el campo es válido. */
    var reglas_de_validacion = {
        nombre_remitente: function (campo) {
            var valor = campo.value.trim();
            if (valor.length === 0) {
                return "Por favor, escribe tu nombre completo.";
            }
            if (valor.length < 3) {
                return "El nombre debe tener al menos 3 caracteres.";
            }
            return "";
        },
        correo_remitente: function (campo) {
            var valor = campo.value.trim();
            var patron_correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (valor.length === 0) {
                return "Por favor, escribe tu correo electrónico.";
            }
            if (!patron_correo.test(valor)) {
                return "Escribe un correo electrónico válido, ej: nombre@dominio.com";
            }
            return "";
        },
        telefono_remitente: function (campo) {
            var valor = campo.value.trim();
            var patron_telefono = /^[67][0-9]{7}$/;
            if (valor.length === 0) {
                return "Por favor, escribe tu número de teléfono.";
            }
            if (!patron_telefono.test(valor)) {
                return "Debe ser un número boliviano de 8 dígitos, comenzando en 6 o 7.";
            }
            return "";
        },
        edad_remitente: function (campo) {
            var valor = campo.value.trim();
            var edad = Number(valor);
            if (valor.length === 0) {
                return "Por favor, indica tu edad.";
            }
            if (Number.isNaN(edad) || edad < 18 || edad > 99) {
                return "La edad debe estar entre 18 y 99 años.";
            }
            return "";
        },
        motivo_mensaje: function (campo) {
            if (campo.value === "") {
                return "Selecciona el motivo de tu mensaje.";
            }
            return "";
        },
        asunto_mensaje: function (campo) {
            var valor = campo.value.trim();
            if (valor.length === 0) {
                return "Por favor, escribe un asunto.";
            }
            return "";
        },
        mensaje_texto: function (campo) {
            var valor = campo.value.trim();
            if (valor.length === 0) {
                return "Por favor, escribe tu mensaje.";
            }
            if (valor.length < 10) {
                return "El mensaje debe tener al menos 10 caracteres.";
            }
            return "";
        }
    };

    /* Valida un único campo y refleja el resultado en su
       contenedor .form_field y en el span de error asociado. */
    function validar_campo(campo) {
        var regla = reglas_de_validacion[campo.name];
        if (!regla) {
            return true;
        }

        var mensaje_error = regla(campo);
        var contenedor_campo = campo.closest(".form_field");
        var span_error = document.getElementById("error_" + campo.name);

        if (span_error) {
            span_error.textContent = mensaje_error;
        }

        if (contenedor_campo) {
            contenedor_campo.classList.toggle("is_invalid", mensaje_error !== "");
            contenedor_campo.classList.toggle("is_valid", mensaje_error === "" && campo.value.trim() !== "");
        }

        return mensaje_error === "";
    }

    /* Validación en tiempo real: cada vez que el usuario sale de
       un campo (blur) o escribe (input), se vuelve a validar. */
    Object.keys(reglas_de_validacion).forEach(function (nombre_campo) {
        var campo = formulario.elements.namedItem(nombre_campo);
        if (!campo) {
            return;
        }
        campo.addEventListener("blur", function () { validar_campo(campo); });
        campo.addEventListener("input", function () { validar_campo(campo); });
        campo.addEventListener("change", function () { validar_campo(campo); });
    });

    /* Validación completa al enviar el formulario. */
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        var formulario_valido = true;

        Object.keys(reglas_de_validacion).forEach(function (nombre_campo) {
            var campo = formulario.elements.namedItem(nombre_campo);
            if (!campo) {
                return;
            }
            var campo_valido = validar_campo(campo);
            if (!campo_valido) {
                formulario_valido = false;
            }
        });

        if (!mensaje_estado) {
            return;
        }

        mensaje_estado.classList.remove("success", "error");
        mensaje_estado.classList.add("is_visible");

        if (formulario_valido) {
            mensaje_estado.classList.add("success");
            mensaje_estado.textContent =
                "Mensaje validado correctamente. Este sitio es una demostración " +
                "estática, así que aún no envía el mensaje a un servidor; " +
                "escribe directamente a jorge.500.soliz@gmail.com.";
            formulario.reset();
            Object.keys(reglas_de_validacion).forEach(function (nombre_campo) {
                var campo = formulario.elements.namedItem(nombre_campo);
                var contenedor_campo = campo ? campo.closest(".form_field") : null;
                var span_error = document.getElementById("error_" + nombre_campo);
                if (contenedor_campo) {
                    contenedor_campo.classList.remove("is_valid", "is_invalid");
                }
                if (span_error) {
                    span_error.textContent = "";
                }
            });
        } else {
            mensaje_estado.classList.add("error");
            mensaje_estado.textContent = "Revisa los campos marcados antes de enviar el formulario.";
            var primer_campo_invalido = formulario.querySelector(".form_field.is_invalid input, .form_field.is_invalid select, .form_field.is_invalid textarea");
            if (primer_campo_invalido) {
                primer_campo_invalido.focus();
            }
        }
    });
}
