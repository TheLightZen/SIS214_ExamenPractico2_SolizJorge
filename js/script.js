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
    inicializar_selector_de_tema();
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
