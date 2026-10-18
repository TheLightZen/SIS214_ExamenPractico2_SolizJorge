// Conmutador de tema claro/oscuro.
// La preferencia se guarda en localStorage como JSON.

const CLAVE_PREFERENCIAS = 'preferencias_portafolio';
const raiz = document.documentElement;

function leerPreferencias() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_PREFERENCIAS)) ?? {};
  } catch (error) {
    // Si el JSON guardado está dañado se ignora y se parte de cero
    return {};
  }
}

function guardarPreferencias(preferencias) {
  localStorage.setItem(CLAVE_PREFERENCIAS, JSON.stringify(preferencias));
}

function obtenerTemaInicial() {
  const { tema } = leerPreferencias();
  if (tema === 'dark' || tema === 'light') return tema;
  const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefiereOscuro ? 'dark' : 'light';
}

function aplicarTema(tema) {
  raiz.setAttribute('data-theme', tema);

  const boton = document.getElementById('theme_toggle');
  if (!boton) return;
  boton.setAttribute('aria-pressed', String(tema === 'dark'));
  boton.querySelector('.theme_toggle_icon').textContent = tema === 'dark' ? '☀' : '☾';
}

function iniciarBotonTema() {
  const boton = document.getElementById('theme_toggle');
  aplicarTema(raiz.getAttribute('data-theme'));

  boton.addEventListener('click', () => {
    const nuevoTema = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    aplicarTema(nuevoTema);
    guardarPreferencias({ ...leerPreferencias(), tema: nuevoTema });
  });
}

// Este script va en el <head>: el tema se aplica antes de pintar la página
// para evitar el parpadeo en blanco. El botón se conecta cuando el DOM está listo.
raiz.setAttribute('data-theme', obtenerTemaInicial());
document.addEventListener('DOMContentLoaded', iniciarBotonTema);
