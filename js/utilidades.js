// Funciones de apoyo compartidas por el resto de los scripts.

// Escapa texto antes de insertarlo con innerHTML (evita inyección de HTML)
function escaparHtml(texto) {
  const reemplazos = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(texto ?? '').replace(/[&<>"']/g, (caracter) => reemplazos[caracter]);
}
