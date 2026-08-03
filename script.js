document.addEventListener("DOMContentLoaded", function() {
    const sobre = document.getElementById("sobre");
    const instruccion = document.getElementById("texto-instruccion");

    sobre.addEventListener("click", function() {
     
        sobre.classList.toggle("sobre-abierto");
        
        
        if (sobre.classList.contains("sobre-abierto")) {
            instruccion.style.opacity = "0";
        } else {
            instruccion.style.opacity = "1";
        }
    });
});
