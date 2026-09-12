# Hoja de Vida Interactiva — Jorge Emanuel Soliz Luque

## Estructura del proyecto

```
hoja-vida/
├── index.html
├── README.md
├── link.txt                
├── css/
│   ├── reset.css             
│   └── styles.css             
├── js/
│   └── script.js              
└── assets/
    ├── images/jorge-soliz-foto.png
    ├── documents/cv-jorge-soliz.pdf
    ├── audio/presentacion-jorge.mp3
    └── video/
        ├── demo-sistema-mercado.mp4
        └── demo-sistema-mercado-es.vtt
```


## Cómo verlo localmente

Abre `index.html` con doble clic. No requiere servidor. Las tipografías
(Google Fonts) se cargan si hay conexión a internet; si no, se usan
tipografías del sistema como respaldo.

## Funcionalidades de JavaScript

1. **Modo claro/oscuro** (`js/script.js`): botón en el encabezado que
   alterna el atributo `data-theme` en `<html>`, guarda la preferencia en
   `localStorage` y respeta `prefers-color-scheme` en la primera visita.
2. **Validación de formulario de contacto**: valida cada campo en tiempo
   real (al escribir y al salir del campo) y al enviar, con mensajes de
   error específicos, foco automático en el primer campo inválido y un
   mensaje de estado accesible (`aria-live`). Como el formulario no tiene
   backend (`action="#"`), al validarse correctamente se muestra un aviso
   indicando que se debe escribir directamente al correo de contacto.

## Requisitos de la rúbrica

- **HTML semántico:** `header`, `nav`, `main`, `section`,
  `article`, `footer`, jerarquía de encabezados `h1`→`h3`, nomenclatura
  snake_case consistente.
- **CSS y maquetación:** variables en `:root` (incluye un set
  completo para el tema oscuro), Flexbox (encabezado, índice,
  certificaciones, multimedia, enlaces, pie de página) y CSS Grid
  (educación, proyectos, habilidades, formulario), responsive con media
  queries en 860px y 640px.
- **JavaScript e interactividad:** modo claro/oscuro persistente
  y validación de formulario, ambos con JavaScript nativo y comentado.
- **Accesibilidad y validación:** enlace "saltar al contenido",
  `alt` en imágenes, `label` asociado a cada campo, `fieldset`/`legend`,
  `aria-describedby` + `role="alert"` en los errores de formulario,
  `aria-live` en el mensaje de estado, contraste de color verificado,
  foco visible con `:focus-visible`.
- **Git y entrega:** historial de commits descriptivos y
  progresivos (ver `git log`).