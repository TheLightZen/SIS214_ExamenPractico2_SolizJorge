// Menú hamburguesa: abre y cierra la navegación y mantiene aria-expanded al día.

const botonMenu = document.getElementById('menu_toggle');
const menuPrincipal = document.getElementById('menu_principal');
const mediaEscritorio = window.matchMedia('(min-width: 1025px)');

function establecerMenu(abierto) {
  menuPrincipal.classList.toggle('is_open', abierto);
  botonMenu.setAttribute('aria-expanded', String(abierto));
  botonMenu.setAttribute(
    'aria-label',
    abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
  );
}

function menuEstaAbierto() {
  return botonMenu.getAttribute('aria-expanded') === 'true';
}

function iniciarMenu() {
  if (!botonMenu || !menuPrincipal) return;

  // Click en el botón: alterna el estado
  botonMenu.addEventListener('click', () => {
    establecerMenu(!menuEstaAbierto());
  });

  // Delegación de eventos: un solo listener en la nav para todos los enlaces
  menuPrincipal.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) {
      establecerMenu(false);
    }
  });

  // Escape cierra el menú y devuelve el foco al botón
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menuEstaAbierto()) {
      establecerMenu(false);
      botonMenu.focus();
    }
  });

  // Al pasar a escritorio el menú ya es horizontal: se reinicia el estado
  mediaEscritorio.addEventListener('change', (evento) => {
    if (evento.matches) establecerMenu(false);
  });
}

iniciarMenu();
