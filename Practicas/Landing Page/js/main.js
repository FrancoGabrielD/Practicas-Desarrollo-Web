// ==========================================================
// DJ DELTA - JavaScript
// ==========================================================

const nav = document.getElementById("nav");
const botonMenu = document.getElementById("navToggle");
const listaLinks = document.getElementById("navLinks");

// 1) La barra se vuelve sólida cuando bajás de la parte superior
function actualizarNav() {
  nav.classList.toggle("nav--solida", window.scrollY > 40);
}
window.addEventListener("scroll", actualizarNav);
actualizarNav(); // por si la página carga ya scrolleada

// 2) Menú hamburguesa en celular
function cambiarMenu(abrir) {
  listaLinks.classList.toggle("abierto", abrir);
  botonMenu.setAttribute("aria-expanded", String(abrir));
  botonMenu.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
}

botonMenu.addEventListener("click", () => {
  const estaAbierto = botonMenu.getAttribute("aria-expanded") === "true";
  cambiarMenu(!estaAbierto);
});

// Al tocar un link del menú, se cierra
listaLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => cambiarMenu(false));
});

// 3) Año automático en el footer
document.getElementById("anio").textContent = new Date().getFullYear();

// ==========================================================
// FORMULARIO DE CONTRATACIÓN
// ==========================================================

// Número con código de país, sin +, sin espacios, sin 0 ni 15.
// Ejemplo Argentina: 54 + código de área + número  ->  5491122334455
const NUMERO_WHATSAPP = "542920292261";

const form = document.getElementById("formContacto");
const estado = document.getElementById("formEstado");
const campos = form.querySelectorAll("input, select, textarea");

// No permitir fechas pasadas
document.getElementById("fecha").min = new Date().toLocaleDateString("en-CA"); // AAAA-MM-DD

function mostrarError(input, mensaje) {
  const campo = input.closest(".campo");
  const small = campo.querySelector(".campo__error");
  if (small) small.textContent = mensaje;
  campo.classList.toggle("campo--error", mensaje !== "");
  input.setAttribute("aria-invalid", mensaje !== "");
}

function validarCampo(input) {
  const valor = input.value.trim();
  let mensaje = "";

  if (input.required && !valor) {
    mensaje = "Completá este campo.";
  } else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
    mensaje = "Ingresá un mail válido.";
  } else if (input.type === "tel" && valor.replace(/\D/g, "").length < 8) {
    mensaje = "Ingresá un teléfono válido.";
  } else if (input.type === "number" && Number(valor) < 1) {
    mensaje = "Ingresá una cantidad mayor a 0.";
  } else if (input.type === "date" && valor < input.min) {
    mensaje = "Elegí una fecha a partir de hoy.";
  }

  mostrarError(input, mensaje);
  return mensaje === "";
}

// Validar cada campo al salir de él
campos.forEach((input) => {
  input.addEventListener("blur", () => validarCampo(input));
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  let primerError = null;
  campos.forEach((input) => {
    if (!validarCampo(input) && !primerError) primerError = input;
  });

  if (primerError) {
    primerError.focus();
    estado.textContent = "Revisá los campos marcados.";
    return;
  }

  const d = new FormData(form);
  const fecha = new Date(d.get("fecha") + "T00:00").toLocaleDateString("es-AR", {
    day: "numeric", month: "long", year: "numeric",
  });

  const lineas = [
    "Hola Delta! Quiero consultar disponibilidad:",
    "",
    `*Nombre:* ${d.get("nombre")}`,
    `*Teléfono:* ${d.get("telefono")}`,
    `*Mail:* ${d.get("email")}`,
    "",
    `*Tipo de evento:* ${d.get("tipo")}`,
    `*Fecha:* ${fecha}`,
    `*Personas:* ${d.get("personas")}`,
    `*Lugar:* ${d.get("lugar")}`,
  ];

  const detalles = d.get("detalles").trim();
  if (detalles) lineas.push("", `*Detalles:* ${detalles}`);

  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(lineas.join("\n"))}`;
  window.open(url, "_blank");

  estado.textContent = "Se abrió WhatsApp con tu solicitud. Tocá enviar para completar el pedido.";
  form.reset();
});

// ==========================================================
// VIDEO DE YOUTUBE (se carga al hacer clic)
// ==========================================================
const contenedorVideo = document.getElementById("videoDelta");

if (contenedorVideo) {
  const botonPlay = contenedorVideo.querySelector(".video__play");

  botonPlay.addEventListener("click", () => {
    const idVideo = contenedorVideo.dataset.id;

    // En modo local (file://) YouTube bloquea el reproductor:
    // se abre el video en otra pestaña. Ya publicada la web, se reproduce acá.
    if (location.protocol === "file:") {
      window.open(`https://www.youtube.com/watch?v=${idVideo}`, "_blank");
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${idVideo}?autoplay=1&rel=0`;
    iframe.title = contenedorVideo.dataset.titulo;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    contenedorVideo.replaceChildren(iframe);
  });
}