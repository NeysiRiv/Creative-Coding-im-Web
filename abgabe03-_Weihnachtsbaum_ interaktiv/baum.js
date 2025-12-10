"use strict";
// Seleccionar elementos del DOM
const lights = document.querySelectorAll(".light"); // Todas las luces ya están en el HTML
const toggleLightsButton = document.getElementById("toggleLights"); // Botón para encender/apagar
const lightColorSelect = document.getElementById("lightColor"); // Select box para el color

// Estado de las luces
let lightsOn = false; // Inicialmente apagadas
let blinkInterval = null; // Intervalo para hacer parpadear las luces

// Función para encender o apagar las luces
function toggleLights() {
    lightsOn = !lightsOn;
    if (lightsOn) {
        startBlinking();
    } else {
        stopBlinking();
        lights.forEach((light) => {
            light.style.opacity = "0"; // Asegurarse de que estén apagadas
        });
    }

    toggleLightsButton.textContent = lightsOn ? "Lichter aus" : "Lichter ein";
    console.log(`Lichter ${lightsOn ? "eingeschaltet und blinken" : "ausgeschaltet"}.`);
}
function changeLightColor() {
    const selectedColor = lightColorSelect.value; // Obtener color seleccionado del select box
    lights.forEach((light) => {
        light.style.backgroundColor = selectedColor; // Cambiar el color de cada luz
    });
    console.log(`Lichtfarbe geändert zu ${selectedColor}.`);
}
function startBlinking() {
    if (blinkInterval) return; // Evitar múltiples intervalos

    blinkInterval = setInterval(() => {
        lights.forEach((light) => {
            light.style.opacity = light.style.opacity === "1" ? "0" : "1";
        });
    }, 500);
}
function stopBlinking() {
    clearInterval(blinkInterval);
    blinkInterval = null;
}

// Event listeners
toggleLightsButton.addEventListener("click", toggleLights);
lightColorSelect.addEventListener("change", changeLightColor);
function generateSnow() {
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.style.left = Math.random() * 100 + "%";
        snowflake.style.animationDuration = Math.random() * 5 + 2 + "s";
        snowflake.style.animationDelay = Math.random() * 5 + "s";
        snowContainer.appendChild(snowflake);
    }
    console.log("Schnee wurde erzeugt.");
}

// Llamar a la función para generar la nieve al cargar la página
generateSnow();
