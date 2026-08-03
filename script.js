document.addEventListener("DOMContentLoaded", function() {
    const sobre = document.getElementById("sobre");
    const instruccion = document.getElementById("texto-instruccion");

    sobre.addEventListener("click", function() {
        // Alternamos la clase que activa la animación
        sobre.classList.toggle("sobre-abierto");
        
        // Escondemos el texto de "Toca el sobre" una vez que lo abren
        if (sobre.classList.contains("sobre-abierto")) {
            instruccion.style.opacity = "0";
        } else {
            instruccion.style.opacity = "1";
        }
    });
});