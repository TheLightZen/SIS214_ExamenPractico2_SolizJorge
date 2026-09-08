# Hoja de Vida Interactiva — Jorge Emanuel Soliz Luque

Proyecto de la Primera Evaluación Práctica de **Tecnologías Web I (SIS-214)**.
CV interactivo construido con **HTML5 semántico**, **CSS3** (variables en
`:root`, Flexbox y CSS Grid, diseño responsivo) y **JavaScript nativo**
(sin frameworks ni librerías externas).

## Estructura del proyecto

```
hoja-vida/
├── index.html
├── README.md
├── link.txt                 ← URL del repositorio de GitHub
├── css/
│   ├── reset.css             ← Normalización base
│   └── styles.css            ← Variables :root, layout y tema claro/oscuro
├── js/
│   └── script.js              ← Modo claro/oscuro + validación de formulario
└── assets/
    ├── images/jorge-soliz-foto.png
    ├── documents/cv-jorge-soliz.pdf
    ├── audio/presentacion-jorge.mp3
    └── video/
        ├── demo-sistema-gimnasio.mp4
        └── demo-sistema-gimnasio-es.vtt
```

Nomenclatura: clases e identificadores en **snake_case** en todo el
proyecto (HTML, CSS y JS).

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

## Requisitos de la rúbrica cubiertos

- **HTML semántico (30 pts):** `header`, `nav`, `main`, `section`,
  `article`, `footer`, jerarquía de encabezados `h1`→`h3`, nomenclatura
  snake_case consistente.
- **CSS y maquetación (30 pts):** variables en `:root` (incluye un set
  completo para el tema oscuro), Flexbox (encabezado, índice,
  certificaciones, multimedia, enlaces, pie de página) y CSS Grid
  (educación, proyectos, habilidades, formulario), responsive con media
  queries en 860px y 640px.
- **JavaScript e interactividad (20 pts):** modo claro/oscuro persistente
  y validación de formulario, ambos con JavaScript nativo y comentado.
- **Accesibilidad y validación (10 pts):** enlace "saltar al contenido",
  `alt` en imágenes, `label` asociado a cada campo, `fieldset`/`legend`,
  `aria-describedby` + `role="alert"` en los errores de formulario,
  `aria-live` en el mensaje de estado, contraste de color verificado,
  foco visible con `:focus-visible`.
- **Git y entrega (10 pts):** historial de commits descriptivos y
  progresivos (ver `git log`).

## Publicación en GitHub y GitHub Pages — pasos que debes hacer tú

Este proyecto ya tiene el repositorio Git local con todos los commits
hechos y el remoto configurado a:

`https://github.com/TheLightZen/hoja-vida`

**No fue posible hacer `git push` ni activar GitHub Pages desde aquí**,
porque eso requiere tus credenciales de GitHub. Para completarlo:

1. Desde tu computadora (o subiendo esta misma carpeta con `.git`
   incluido), ejecuta:
   ```bash
   git push origin main
   ```
2. Entra a tu repositorio en GitHub → **Settings** → **Pages**.
3. En "Build and deployment", selecciona **Deploy from a branch**,
   branch `main`, carpeta `/ (root)`, y guarda.
4. Espera uno o dos minutos: GitHub te dará una URL pública del tipo
   `https://thelightzen.github.io/hoja-vida/`. Esa es la URL que debes
   registrar como "enlace al sitio desplegado" en Moodle.

## Entrega en Moodle

1. Comprime la carpeta **sin la subcarpeta `.git`** como
   `soliz-jorge-hoja-vida.zip` (o usa el .zip que se generó junto con
   esta entrega).
2. Sube el .zip a la actividad de Moodle.
3. Pega el enlace al repositorio: `https://github.com/TheLightZen/hoja-vida`
4. Pega el enlace al sitio publicado en GitHub Pages (una vez activado,
   paso anterior).
5. (Opcional) Valida `index.html` en https://validator.w3.org/#validate_by_upload
   y adjunta la captura de "0 errores".
6. Agrega un comentario breve en Moodle mencionando: modo claro/oscuro,
   validación de formulario en JavaScript, Flexbox + Grid, y diseño
   responsivo.

## Pendiente de tu parte (opcional)

- El proyecto no incluye un enlace a LinkedIn porque no se contaba con
  esa URL. Si tienes uno, agrégalo en la sección "Enlaces profesionales"
  de `index.html` junto a los enlaces de GitHub.
