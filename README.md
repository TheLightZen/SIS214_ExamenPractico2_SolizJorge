# Portafolio profesional - Jorge Emanuel Soliz Luque

Segundo examen práctico de **Tecnologías Web I (SIS-214)**, Unidad II, UCB.
Es mi hoja de vida del primer examen, pero rehecha para esta unidad: HTML semántico sin `div`s,
CSS mobile-first con tokens y JavaScript moderno (ES6+) dividido en un archivo por funcionalidad.
No usa frameworks ni librerías, solo HTML, CSS y JS.

- Repositorio: https://github.com/TheLightZen/SIS214_ExamenPractico2_SolizJorge
- Producción (GitHub Pages): https://thelightzen.github.io/SIS214_ExamenPractico2_SolizJorge/

## Qué hace

| Funcionalidad | Archivo | Cómo funciona |
|---|---|---|
| Menú hamburguesa | `js/menu.js` | Abre y cierra la navegación en móvil y tablet. Actualiza `aria-expanded` y `aria-label`, se cierra con Escape o al elegir un enlace (delegación de eventos). |
| Modo claro/oscuro | `js/tema.js` | Cambia `data-theme` en `<html>`. La preferencia se guarda en `localStorage` con `JSON.stringify` y se lee con `JSON.parse`. Si no hay nada guardado usa la preferencia del sistema. |
| Buscador de proyectos | `js/filtro.js` | Filtra en tiempo real (evento `input`) con `.filter().map()`. Los datos están congelados con `Object.freeze`, así que el filtro nunca los modifica. Ignora mayúsculas y tildes. |
| Formulario de contacto | `js/formulario.js` | Usa la validación nativa de HTML5 (`checkValidity` y `validity`) y la muestra mientras se escribe. Intercepta el envío con `preventDefault()`. |
| Repositorios de GitHub | `js/github.js` | `fetch` con `async/await` y `try/catch` a la API pública de GitHub. Muestra tres estados: cargando, éxito y error (400, 403, 404, 500, red caída y tiempo agotado), con botón para reintentar. |

`js/utilidades.js` tiene una función compartida (`escaparHtml`) que se usa antes de insertar texto con `innerHTML`.

Como el sitio es estático no hay a dónde enviar el formulario. Cuando los datos son válidos se ofrece un
enlace `mailto:` con el mensaje ya escrito.

## Arquitectura

```
SIS214_ExamenPractico2_SolizJorge/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── tema.js          (va en el <head> para evitar el parpadeo al cargar)
│   ├── utilidades.js
│   ├── menu.js
│   ├── filtro.js
│   ├── formulario.js
│   └── github.js
├── assets/
│   ├── images/
│   ├── audio/
│   ├── video/
│   └── documents/
├── link.txt
└── README.md
```

**HTML.** Usa `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`, `fieldset`, `details`
y `time`. No hay ningún `<div>`: los márgenes laterales los resuelve el CSS y las cuadrículas se
aplican directamente sobre las `section`. Para accesibilidad uso `aria-label`, `aria-labelledby`,
`aria-expanded`, `aria-controls`, `aria-pressed`, `aria-live`, `aria-invalid`, `aria-describedby`,
`role="search"` y `role="status"`, además del enlace "saltar al contenido".

**CSS.** Todo está en `css/styles.css`.
- `:root` define `--primary-color`, `--secondary-color`, `--bg-color`, `--text-color`,
  `--font-family-base` y `--spacing-unit`, más otros tokens que salen de ellos. El tema oscuro solo
  sobrescribe esos tokens.
- Reset universal: `* { box-sizing: border-box; margin: 0; padding: 0; }`.
- Mobile-first: los estilos base son los del móvil y se amplían con `min-width`.

  | Rango | Media query |
  |---|---|
  | Móvil (< 768px) | estilos base |
  | Tablet (768px a 1024px) | `min-width: 768px` (y un bloque `min-width: 768px and max-width: 1024px` solo para el menú) |
  | Escritorio (> 1024px) | `min-width: 1025px` |

- **Flexbox** para componentes de una dimensión: cabecera, navegación, chips, botones, certificaciones y pie.
  **Grid** para el diseño en dos dimensiones: presentación, tarjetas de proyectos, secciones de habilidades,
  multimedia y contacto, y los campos del formulario.

## Cómo ejecutarlo en local

No necesita instalar nada ni usar un servidor, porque los scripts son archivos normales y no módulos.

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/TheLightZen/SIS214_ExamenPractico2_SolizJorge.git
   ```
2. Abrir `index.html` con doble clic, o con la extensión Live Server de VS Code.

Las fuentes vienen de Google Fonts y la lista de repositorios de la API de GitHub, así que hace falta
internet para verlas completas. Sin conexión se usan las fuentes del sistema y la sección de GitHub
muestra su mensaje de error. La API pública limita las consultas por IP (60 por hora); si se pasa,
la página lo avisa con el error 403.

## Convenciones

- **Nombres:** clases e identificadores HTML en `snake_case` (`project_card`, `menu_toggle`); variables y
  funciones de JavaScript en `camelCase` (`mostrarProyectos`); constantes en `MAYUSCULAS`
  (`PROYECTOS`); propiedades personalizadas de CSS en `kebab-case` (`--primary-color`).
- **Commits:** siguen Conventional Commits (`feat`, `fix`, `refactor`, `chore`, `docs`) con un commit
  por funcionalidad. Se puede ver con `git log --oneline`.

## Tecnologías

HTML5, CSS3 (Flexbox, Grid, variables, media queries), JavaScript ES6+ (módulos de script, `async/await`,
`fetch`, `localStorage`, Constraint Validation API), Git y GitHub Pages.
