// Buscador de proyectos en tiempo real.
// Los datos originales son inmutables (Object.freeze): el filtro nunca los modifica,
// siempre crea arreglos nuevos con .filter() y .map().

const PROYECTOS = Object.freeze([
  {
    id: 'cine',
    meta: ['Programación II', 'Marzo 2025', '90/100'],
    titulo: 'Sistema de Cine en Java',
    resumen: 'Framework de gestión de un cine aplicando programación orientada a objetos.',
    detalle: 'Framework polimórfico con control de membresías, registro de clientes, horarios de funciones y reportes básicos, aplicando herencia y encapsulamiento.'
  },
  {
    id: 'mercado',
    meta: ['Base de Datos I', 'Abril 2026'],
    titulo: 'Base de Datos — Mercado Rodríguez',
    resumen: 'Esquema relacional conceptual para digitalizar la información del comercio informal.',
    detalle: 'Modelo entidad-relación con normalización, pensado para registrar precios, sus rangos de volatilidad y el historial de transacciones del mercado.'
  },
  {
    id: 'agua',
    meta: ['Metodología de la Investigación', 'Mayo 2026'],
    titulo: 'Propuesta de paper para reducir el desperdicio de agua en La Paz',
    resumen: 'Propuesta de tesis para reducir el porcentaje de desperdicio de agua en la ciudad de La Paz.'
  },
  {
    id: 'bancos',
    meta: ['Programación I', 'Octubre 2025'],
    titulo: 'Sistema de Bancos (depósitos y retiros)',
    resumen: 'Implementación de un sistema de gestión bancaria con funcionalidades básicas de depósito y retiro.'
  },
  {
    id: 'assembly',
    meta: ['Septiembre 2025'],
    titulo: 'Depuración de código Assembly (NASM x86, 32 bits)',
    resumen: 'Identificación y corrección de errores en bloques de código Assembly de 32 bits.'
  },
  {
    id: 'habittracker',
    meta: ['Proyecto personal', 'GitHub'],
    titulo: 'HabitTracker',
    resumen: 'Repositorio para el seguimiento del propio proceso de desarrollo de software.'
  }
].map((proyecto) => Object.freeze(proyecto)));

const buscador = document.getElementById('buscador_proyectos');
const listaProyectos = document.getElementById('lista_proyectos');
const resultadoFiltro = document.getElementById('resultado_filtro');
const sinResultados = document.getElementById('sin_resultados');

// Pasa a minúsculas y quita tildes para que "programacion" encuentre "Programación"
function normalizar(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function textoBuscable(proyecto) {
  return normalizar([...proyecto.meta, proyecto.titulo, proyecto.resumen, proyecto.detalle ?? ''].join(' '));
}

function crearTarjeta(proyecto) {
  const detalle = proyecto.detalle
    ? `<details>
         <summary>Ver detalles</summary>
         <p>${escaparHtml(proyecto.detalle)}</p>
       </details>`
    : '';

  return `
    <li>
      <article class="project_card">
        <p class="meta">${escaparHtml(proyecto.meta.join(' · '))}</p>
        <h3>${escaparHtml(proyecto.titulo)}</h3>
        <p>${escaparHtml(proyecto.resumen)}</p>
        ${detalle}
      </article>
    </li>`;
}

function mostrarProyectos(termino = '') {
  const buscado = normalizar(termino.trim());

  // Tubería funcional: filtra los proyectos y transforma cada uno en su tarjeta
  const tarjetas = PROYECTOS
    .filter((proyecto) => textoBuscable(proyecto).includes(buscado))
    .map(crearTarjeta);

  listaProyectos.innerHTML = tarjetas.join('');
  resultadoFiltro.textContent = `Mostrando ${tarjetas.length} de ${PROYECTOS.length} proyectos`;
  sinResultados.hidden = tarjetas.length > 0;
}

function iniciarFiltro() {
  // Enter dentro del buscador no debe recargar la página
  buscador.form.addEventListener('submit', (evento) => evento.preventDefault());
  buscador.addEventListener('input', () => mostrarProyectos(buscador.value));
  mostrarProyectos();
}

iniciarFiltro();
