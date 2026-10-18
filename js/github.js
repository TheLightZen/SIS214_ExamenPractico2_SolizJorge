// Módulo asíncrono: consume la API REST pública de GitHub con fetch y async/await.
// Estados de la interfaz: loading (cargando), success (éxito) y error.

const USUARIO_GITHUB = 'TheLightZen';
const URL_REPOS = `https://api.github.com/users/${USUARIO_GITHUB}/repos?sort=updated&per_page=6`;
const TIEMPO_MAXIMO_MS = 10000;

const estadoGithub = document.getElementById('estado_github');
const listaRepos = document.getElementById('lista_repos');
const botonReintentar = document.getElementById('reintentar_github');

// Mensajes para los códigos HTTP más comunes de esta API
const MENSAJES_HTTP = {
  400: 'La solicitud no es válida (400 Bad Request).',
  403: 'GitHub limitó las consultas desde esta red (403). Intenta de nuevo en unos minutos.',
  404: `No se encontró el usuario ${USUARIO_GITHUB} en GitHub (404 Not Found).`,
  500: 'GitHub tuvo un problema interno (500 Internal Server Error). Intenta más tarde.'
};

function mensajeParaEstado(status) {
  if (MENSAJES_HTTP[status]) return MENSAJES_HTTP[status];
  if (status >= 500) return `Error del servidor de GitHub (${status}).`;
  return `Respuesta inesperada de GitHub (${status}).`;
}

function mostrarEstado(estado, texto) {
  estadoGithub.dataset.estado = estado;
  estadoGithub.textContent = texto;
  botonReintentar.hidden = estado !== 'error';
}

async function obtenerRepositorios() {
  // AbortController cancela la petición si GitHub tarda demasiado
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIEMPO_MAXIMO_MS);

  try {
    const respuesta = await fetch(URL_REPOS, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controlador.signal
    });

    // response.ok es true solo para códigos 200-299 (aquí se espera 200 OK)
    if (!respuesta.ok) {
      const error = new Error(mensajeParaEstado(respuesta.status));
      error.status = respuesta.status;
      throw error;
    }

    return await respuesta.json();
  } finally {
    clearTimeout(temporizador);
  }
}

function crearTarjetaRepo(repo) {
  const fecha = new Date(repo.updated_at).toLocaleDateString('es-BO', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  const datos = [repo.language, `★ ${repo.stargazers_count}`, `Actualizado ${fecha}`]
    .filter(Boolean)
    .join(' · ');

  return `
    <li>
      <article class="project_card">
        <p class="meta">${escaparHtml(datos)}</p>
        <h3>
          <a href="${escaparHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer">
            ${escaparHtml(repo.name)}
            <span class="sr_only">(se abre en una pestaña nueva)</span>
          </a>
        </h3>
        <p>${escaparHtml(repo.description ?? 'Sin descripción.')}</p>
      </article>
    </li>`;
}

function textoDeError(error) {
  if (error.status) return error.message;
  if (error.name === 'AbortError') return 'GitHub tardó demasiado en responder. Intenta de nuevo.';
  if (error instanceof TypeError) return 'No se pudo conectar con GitHub. Revisa tu conexión a internet.';
  return 'Ocurrió un error inesperado al leer la respuesta de GitHub.';
}

async function cargarRepositorios() {
  mostrarEstado('loading', 'Cargando repositorios desde GitHub...');
  listaRepos.innerHTML = '';

  try {
    const repositorios = await obtenerRepositorios();

    // Se omiten los forks y cada repositorio restante se transforma en una tarjeta
    const tarjetas = repositorios
      .filter((repo) => !repo.fork)
      .map(crearTarjetaRepo);

    listaRepos.innerHTML = tarjetas.join('');
    mostrarEstado(
      'success',
      tarjetas.length > 0
        ? `Se cargaron ${tarjetas.length} repositorios públicos.`
        : 'El usuario no tiene repositorios públicos para mostrar.'
    );
  } catch (error) {
    mostrarEstado('error', textoDeError(error));
  }
}

botonReintentar.addEventListener('click', cargarRepositorios);
cargarRepositorios();
