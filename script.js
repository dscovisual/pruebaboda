/* =============================================
   CONFIGURACIÓN — tocar solo esto por cliente
   ============================================= */
const CONFIG = {
    numeroWhatsappOrganizador: "5493880000000", // sin +, sin espacios
    mensajeConfirmacion: (nombre) =>
        `Hola! Soy ${nombre} y confirmo mi asistencia a la boda 💍`,
    cantidadPetalos: 14,
};

document.addEventListener("DOMContentLoaded", function () {

    /* ---------- Sobre: abrir / cerrar ---------- */
    const sobre = document.getElementById("sobre");
    const instruccion = document.getElementById("texto-instruccion");

    sobre.addEventListener("click", function (evento) {
        // Evita que un clic dentro de la carta (botones, input) cierre el sobre
        if (evento.target.closest(".carta") && sobre.classList.contains("sobre-abierto")) {
            return;
        }

        sobre.classList.toggle("sobre-abierto");

        if (sobre.classList.contains("sobre-abierto")) {
            instruccion.style.opacity = "0";
        } else {
            instruccion.style.opacity = "1";
        }
    });

    /* ---------- Pétalos flotantes ---------- */
    const contenedorPetalos = document.getElementById("petalos");

    function crearPetalo() {
        const petalo = document.createElement("div");
        petalo.className = "petalo";

        const inicioX = Math.random() * 100; // %
        const deriva = (Math.random() * 80 - 40) + "px";
        const duracion = 7 + Math.random() * 6; // segundos
        const demora = Math.random() * 8;
        const escala = 0.6 + Math.random() * 0.8;

        petalo.style.left = inicioX + "%";
        petalo.style.setProperty("--deriva", deriva);
        petalo.style.animationDuration = duracion + "s";
        petalo.style.animationDelay = demora + "s";
        petalo.style.transform = `scale(${escala})`;

        contenedorPetalos.appendChild(petalo);
    }

    for (let i = 0; i < CONFIG.cantidadPetalos; i++) {
        crearPetalo();
    }

    /* ---------- Lista de invitados vía WhatsApp ---------- */
    const inputNombre = document.getElementById("nombre-invitado");
    const btnEnviar = document.getElementById("btn-enviar-lista");
    const nota = document.getElementById("lista-nota");

    function mostrarNota(texto, esError) {
        nota.textContent = texto;
        nota.classList.toggle("error", Boolean(esError));
    }

    function enviarConfirmacion() {
        const nombre = inputNombre.value.trim();

        if (nombre.length < 2) {
            mostrarNota("Escribí tu nombre para confirmar.", true);
            inputNombre.classList.add("input-error");
            inputNombre.focus();
            setTimeout(() => inputNombre.classList.remove("input-error"), 400);
            return;
        }

        const mensaje = encodeURIComponent(CONFIG.mensajeConfirmacion(nombre));
        const url = `https://wa.me/${CONFIG.numeroWhatsappOrganizador}?text=${mensaje}`;

        mostrarNota("¡Gracias! Te llevamos a WhatsApp…", false);
        window.open(url, "_blank");
    }

    btnEnviar.addEventListener("click", enviarConfirmacion);

    inputNombre.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            evento.preventDefault();
            enviarConfirmacion();
        }
    });

    inputNombre.addEventListener("input", function () {
        nota.textContent = "";
        inputNombre.classList.remove("input-error");
    });
});
