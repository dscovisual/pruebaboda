const CONFIG = {
    numeroWhatsappOrganizador: "5493880000000",
    mensajeConfirmacion: (nombre) =>
        `Hola! Soy ${nombre} y confirmo mi asistencia a la boda 💍`,
    cantidadPetalos: 14,
    fechaBoda: "2026-03-15T18:00:00",
    audioBoda: "audio/cancion.mp3",
};

document.addEventListener("DOMContentLoaded", function () {

    const cajaInvitacion = document.getElementById("invitacion-caja");
    const sobre = document.getElementById("sobre");
    const instruccion = document.getElementById("texto-instruccion");

    sobre.addEventListener("click", function () {
        const abierta = cajaInvitacion.classList.toggle("abierta");
        sobre.classList.toggle("sobre-abierto", abierta);
        instruccion.style.opacity = abierta ? "0" : "1";

        if (abierta) {
            setTimeout(() => {
                document.getElementById("carta-contenedor")
                    .scrollIntoView({ behavior: "smooth", block: "nearest" });
            }, 250);
        }
    });

    const contenedorPetalos = document.getElementById("petalos");

    function crearPetalo() {
        const petalo = document.createElement("div");
        petalo.className = "petalo";

        const inicioX = Math.random() * 100;
        const deriva = (Math.random() * 80 - 40) + "px";
        const duracion = 7 + Math.random() * 6;
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

    const elDias = document.getElementById("contador-dias");
    const elHoras = document.getElementById("contador-horas");
    const elMin = document.getElementById("contador-min");
    const elSeg = document.getElementById("contador-seg");

    function actualizarContador() {
        const ahora = new Date().getTime();
        const objetivo = new Date(CONFIG.fechaBoda).getTime();
        const restante = objetivo - ahora;

        if (restante <= 0) {
            elDias.textContent = "00";
            elHoras.textContent = "00";
            elMin.textContent = "00";
            elSeg.textContent = "00";
            clearInterval(intervaloContador);
            return;
        }

        const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
        const horas = Math.floor((restante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((restante % (1000 * 60)) / 1000);

        elDias.textContent = String(dias).padStart(2, "0");
        elHoras.textContent = String(horas).padStart(2, "0");
        elMin.textContent = String(minutos).padStart(2, "0");
        elSeg.textContent = String(segundos).padStart(2, "0");
    }

    actualizarContador();
    const intervaloContador = setInterval(actualizarContador, 1000);

    const musica = document.getElementById("musica-fondo");
    const btnMusica = document.getElementById("btn-musica");

    function alternarMusica() {
        if (musica.paused) {
            musica.play().then(() => {
                btnMusica.classList.add("sonando");
                btnMusica.setAttribute("aria-label", "Pausar música");
            }).catch(() => {
            });
        } else {
            musica.pause();
            btnMusica.classList.remove("sonando");
            btnMusica.setAttribute("aria-label", "Reproducir música");
        }
    }

    btnMusica.addEventListener("click", alternarMusica);

    sobre.addEventListener("click", function () {
        if (cajaInvitacion.classList.contains("abierta") && musica.paused) {
            alternarMusica();
        }
    });
});
