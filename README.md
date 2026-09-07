# Hoja de Vida — Jorge Emanuel Soliz Luque

Currículum construido con **HTML5 semántico** y **CSS3** (Flexbox + CSS Grid,
responsive), sin frameworks ni JavaScript.

## Estructura del proyecto

```
hoja-vida/
├── index.html              ← Archivo principal (abrir este en el navegador)
├── README.md
├── css/
│   ├── reset.css            ← Normalización base
│   └── styles.css           ← Sistema de diseño, layout y responsive
└── assets/
    ├── images/jorge-soliz-foto.png
    ├── documents/cv-jorge-soliz.pdf
    ├── audio/presentacion-jorge.mp3
    └── video/
        ├── demo-sistema-gimnasio.mp4
        └── demo-sistema-gimnasio-es.vtt
```

## Cómo verlo

Abre `index.html` con doble clic — no necesita servidor ni conexión a
internet para funcionar (las tipografías de Google Fonts se cargan si hay
conexión; si no, se usan las tipografías del sistema como respaldo).

## Requisitos cubiertos

- Estructura semántica: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Datos personales, formación académica, proyectos, certificaciones,
  habilidades e idiomas (listas y tabla).
- CSS3: colores, tipografía, márgenes/padding, bordes, sombras suaves.
- **Flexbox**: barra de navegación/índice, sección hero, certificaciones,
  multimedia, bloque de pie de página.
- **CSS Grid**: educación (línea de tiempo), proyectos, habilidades,
  formulario de contacto.
- **Responsive**: media queries en 860px y 640px (los formularios, la
  grilla de habilidades y el layout de contacto se adaptan a móvil).
- **Accesibilidad**: enlace "saltar al contenido", `alt` en imágenes,
  `label` asociados a cada campo, `fieldset`/`legend`, landmarks ARIA,
  validación nativa HTML5 en el formulario (`required`, `pattern`,
  `minlength`, `maxlength`, `type`).

## Publicación en GitHub

El repositorio ya está enlazado a:
`https://github.com/TheLightZen/hoja-vida`

Los cambios quedaron confirmados (`git commit`) en este entorno. Para
publicarlos, desde tu propia máquina con tus credenciales de GitHub:

```bash
git pull origin main   # si hiciste cambios desde otro lugar
git push origin main
```

Luego puedes activar **GitHub Pages** (Settings → Pages → Branch: `main`)
para obtener el enlace público en vivo del sitio.

## Entrega en Moodle

1. Comprime la carpeta como `soliz-jorge-hoja-vida.zip`.
2. Sube el .zip a Moodle.
3. Adjunta también el enlace público al repositorio de GitHub (y al sitio
   publicado con GitHub Pages, si lo activaste).
