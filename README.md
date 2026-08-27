# Hoja de Vida - Jorge Emanuel Soliz Luque

Currículum construido exclusivamente con HTML5 semántico (sin CSS ni JavaScript),
cumpliendo con criterios de accesibilidad (A11y).

## Estructura del proyecto

```
cv-jorge-soliz/
├── index.html                          ← Archivo principal (abrir este en el navegador)
├── README.md                           ← Este archivo
└── assets/
    ├── images/
    │   ├── jorge-soliz-foto.png        ← Foto de perfil (única, usada en las 3 fuentes del picture)
    │   └── miniatura-video.jpg         ← Miniatura/poster que se ve antes de reproducir el video
    ├── audio/
    │   └── presentacion-jorge.mp3      ← Audio de presentación personal
    ├── video/
    │   ├── demo-sistema-gimnasio.mp4   ← Video demostrativo del proyecto de gimnasio
    │   └── demo-sistema-gimnasio-es.vtt← Subtítulos/captions del video (opcional pero recomendado)
    └── documents/
        └── cv-jorge-soliz.pdf          ← CV en PDF para el botón de descarga
```

**Importante:** los nombres de archivo deben coincidir EXACTAMENTE con los que están
escritos en `index.html`. Si usas otro nombre, cambia también la ruta dentro del HTML
(busca el atributo `src` o `href` correspondiente).

---

## 1. Cómo agregar la fotografía de perfil

El HTML usa `<picture>` (cumpliendo el requisito de la rúbrica), pero las 3 fuentes
apuntan al **mismo archivo** `.png` — así no necesitas convertir nada a WebP ni
manejar varios formatos.

| Archivo | Uso |
|---|---|
| `jorge-soliz-foto.png` | Única imagen: se usa para todas las resoluciones y como respaldo |

**Pasos:**
1. Toma o elige tu foto (idealmente cuadrada, fondo neutro, buena iluminación).
2. Guárdala como `.png`.
3. Colócala en `assets/images/` con el nombre exacto `jorge-soliz-foto.png`,
   reemplazando el archivo `jorge-soliz-foto.png.LEEME.txt`.

> **Nota:** si más adelante quieres optimizar el sitio con imágenes distintas por
> tamaño de pantalla (más liviano en celulares), puedes crear versiones separadas
> en `.webp` y volver a apuntar cada `<source>` a su archivo correspondiente dentro
> de `index.html`. No es obligatorio para que el CV funcione.

Si solo tienes una foto y no quieres convertir formatos, puedes simplificar el `<picture>`
dejando solo el `<img>` con tu foto en `.jpg`, pero perderías puntos si la rúbrica exige
`<picture>` con múltiples `<source>`.

---

## 2. Cómo agregar el audio de presentación

- Archivo esperado: `assets/audio/presentacion-jorge.mp3`
- Duración sugerida: 30-60 segundos.
- Contenido sugerido: preséntate, menciona tu carrera, semestre y un objetivo profesional.
- Formato: MP3 (compatible con todos los navegadores). También puedes grabar en WAV o M4A
  y convertir a MP3 con https://cloudconvert.com o cualquier grabadora de tu celular
  (WhatsApp, Grabadora de voz, etc.) exportando/convirtiendo a `.mp3`.

**Cómo grabarlo rápido:**
1. Usa la app "Grabadora de voz" de tu celular.
2. Exporta el archivo (usualmente queda en `.m4a` o `.amr`).
3. Conviértelo a `.mp3` en https://cloudconvert.com/m4a-to-mp3 (u otra herramienta similar).
4. Renómbralo a `presentacion-jorge.mp3` y colócalo en `assets/audio/`.

---

## 3. Cómo agregar el video del proyecto

- Archivo esperado: `assets/video/demo-sistema-gimnasio.mp4`
- Contenido sugerido: una grabación de pantalla (1-3 min) mostrando el Sistema de Gimnasio
  en Java funcionando (login, registro de clientes, menú principal, etc.).
- Formato: MP4 (códec H.264), es el más compatible con navegadores.

**Cómo grabarlo:**
- Windows: usa la Barra de juegos (`Win + G`) o el grabador de pantalla de Xbox.
- Herramienta gratuita multiplataforma: OBS Studio (https://obsproject.com).
- Exporta/guarda como `.mp4` y colócalo en `assets/video/` con el nombre exacto.

**Miniatura del video (poster):**
- Toma una captura de pantalla representativa del video (por ejemplo, el menú principal
  del sistema) y guárdala como `assets/images/miniatura-video.jpg`. Esa imagen es lo que
  se ve antes de que el usuario le dé "play".

**Subtítulos (opcional, pero suma en accesibilidad):**
- Crea un archivo de texto plano con extensión `.vtt` llamado `demo-sistema-gimnasio-es.vtt`
  con este formato mínimo:

  ```
  WEBVTT

  00:00:00.000 --> 00:00:05.000
  Bienvenidos a la demostración del Sistema de Gimnasio.

  00:00:05.000 --> 00:00:10.000
  Aquí se muestra el registro de un nuevo cliente.
  ```
- Guárdalo en `assets/video/`.

---

## 4. CV en PDF descargable

Ya incluí un `cv-jorge-soliz.pdf` funcional dentro de `assets/documents/`, generado
automáticamente con el mismo contenido del currículum, así que el botón "Descargar
CV en PDF" ya funciona sin que tengas que hacer nada.

Si prefieres reemplazarlo por una versión con tu propio diseño (por ejemplo, hecha en
Canva o Word), solo debes exportar tu versión como PDF, nombrarla exactamente
`cv-jorge-soliz.pdf` y sobrescribir el archivo en `assets/documents/`.

---

## 5. Verificación final antes de entregar

1. Abre `index.html` con doble clic (no necesitas servidor, funciona directo en el navegador).
2. Verifica que:
   - [ ] La foto se ve correctamente.
   - [ ] El audio reproduce con los controles nativos.
   - [ ] El video reproduce y muestra la miniatura antes de darle play.
   - [ ] El botón "Descargar CV en PDF" descarga el archivo.
   - [ ] El botón "Ver contacto rápido" abre la ventana `<dialog>`.
   - [ ] Todos los campos del formulario muestran su validación (prueba enviar vacío).
3. (Opcional pero recomendado) Valida el HTML en https://validator.w3.org/#validate_by_upload
   subiendo el archivo `index.html` para confirmar 0 errores.

---

## Notas técnicas

- Este proyecto **no usa CSS ni JavaScript**, tal como exige la consigna. La única
  excepción "activa" es el botón de contacto rápido, que usa los atributos nativos
  de HTML5 `command="show-modal"` / `commandfor="dialogo-contacto"` (API de Invoker
  Commands), **no** JavaScript.
- Si tu navegador es antiguo y ese botón no abre el `<dialog>`, el resto del sitio
  sigue funcionando con normalidad; es solo esa funcionalidad puntual la que depende
  de soporte reciente del navegador.
