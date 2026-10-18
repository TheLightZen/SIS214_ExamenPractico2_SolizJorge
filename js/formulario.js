// Formulario de contacto: validación nativa de HTML5 (Constraint Validation API)
// combinada con validación en tiempo real mediante el evento input.

const formulario = document.getElementById('formulario_contacto');
const estadoFormulario = document.getElementById('estado_formulario');
const CORREO_DESTINO = 'jorge.500.soliz@gmail.com';

// Traduce el estado de validity del navegador a un mensaje para el usuario
function obtenerMensajeError(campo) {
  const { validity } = campo;

  if (validity.valueMissing) return 'Este campo es obligatorio.';
  if (validity.typeMismatch) return 'Escribe un correo con formato válido, por ejemplo nombre@dominio.com.';
  if (validity.patternMismatch) return campo.title || 'El formato no es válido.';
  if (validity.tooShort) return `Escribe al menos ${campo.minLength} caracteres (llevas ${campo.value.length}).`;
  if (validity.tooLong) return `Máximo ${campo.maxLength} caracteres.`;
  if (validity.rangeUnderflow || validity.rangeOverflow) return `Ingresa un valor entre ${campo.min} y ${campo.max}.`;
  return 'El valor ingresado no es válido.';
}

// Muestra error o éxito junto al campo; devuelve true si el campo es válido
function validarCampo(campo) {
  const contenedor = campo.closest('.form_field');
  const mensaje = document.getElementById(`error_${campo.id}`);
  const esValido = campo.checkValidity();
  const tieneValor = campo.value.trim() !== '';

  contenedor.classList.toggle('is_invalid', !esValido);
  contenedor.classList.toggle('is_valid', esValido && tieneValor);
  campo.setAttribute('aria-invalid', String(!esValido));

  if (!esValido) {
    mensaje.textContent = obtenerMensajeError(campo);
    mensaje.classList.remove('is_ok');
  } else if (tieneValor) {
    mensaje.textContent = '✓ Correcto';
    mensaje.classList.add('is_ok');
  } else {
    mensaje.textContent = '';
    mensaje.classList.remove('is_ok');
  }

  return esValido;
}

function obtenerCampos() {
  return [...formulario.querySelectorAll('input, select, textarea')];
}

// Quita los estilos y mensajes de validación de todos los campos
function limpiarCampos() {
  obtenerCampos().forEach((campo) => {
    campo.closest('.form_field').classList.remove('is_valid', 'is_invalid');
    campo.removeAttribute('aria-invalid');
    document.getElementById(`error_${campo.id}`).textContent = '';
  });
}

function limpiarMarcas() {
  limpiarCampos();
  estadoFormulario.hidden = true;
}

function mostrarEstado(tipo, texto) {
  estadoFormulario.className = `form_status is_${tipo}`;
  estadoFormulario.textContent = texto;
  estadoFormulario.hidden = false;
}

// El sitio es estático (sin servidor): tras validar se ofrece enviar el mensaje desde el correo
function crearEnlaceCorreo(datos) {
  const cuerpo = `${datos.mensaje_texto}\n\nNombre: ${datos.nombre_remitente}\nCorreo: ${datos.correo_remitente}\nTeléfono: ${datos.telefono_remitente}`;
  const enlace = document.createElement('a');
  enlace.href = `mailto:${CORREO_DESTINO}?subject=${encodeURIComponent(datos.asunto_mensaje)}&body=${encodeURIComponent(cuerpo)}`;
  enlace.textContent = 'Abrir mi correo con el mensaje listo';
  return enlace;
}

function manejarEnvio(evento) {
  evento.preventDefault(); // evita la recarga de la página

  const campos = obtenerCampos();
  const resultados = campos.map(validarCampo);

  if (resultados.includes(false)) {
    mostrarEstado('error', 'Revisa los campos marcados en rojo antes de enviar.');
    campos.find((campo) => !campo.checkValidity()).focus();
    return;
  }

  const datos = Object.fromEntries(new FormData(formulario));
  mostrarEstado('success', `Gracias, ${datos.nombre_remitente}. Tu mensaje es válido. Este sitio no tiene servidor, así que puedes enviarlo desde tu correo: `);
  estadoFormulario.append(crearEnlaceCorreo(datos));
  formulario.reset();
  limpiarCampos();
}

function iniciarFormulario() {
  formulario.addEventListener('submit', manejarEnvio);

  // Validación en tiempo real: un solo listener (delegación) para todos los campos
  formulario.addEventListener('input', (evento) => validarCampo(evento.target));
  // Al salir de un campo vacío también se avisa que es obligatorio
  formulario.addEventListener('focusout', (evento) => {
    if (evento.target.matches('input, select, textarea')) validarCampo(evento.target);
  });
  formulario.addEventListener('reset', limpiarMarcas);
}

iniciarFormulario();
