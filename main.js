console.log("Hola mundo")

// Setup
let grid = [];
let sec = [];

// DOM
let blocks = document.querySelectorAll(".block");
let newSec = document.querySelector("button");

newSec.addEventListener("click", () => {
    sec = secuencia(sec);
    
})

// Definiendo que es cada bloque
var i = 0;
for (block of blocks) {
    grid[i] = new Block(i+1,block)
    i++;
}


// Iniciando el juego




// Definiendo la secuencia + mostrarla en dom
function secuencia(arrSec) {
    if (arrSec[0] == undefined) {
        for (let i=0;i<3;i++) {
            arrSec.push(rand(9));
        }
    } else {
        arrSec.push(rand(9));
    }

    // Obtengo un array de secuencias que van de 0 a 8
    // No van de 1 a 9 por temas de indexación en los arrays
    console.log(arrSec)

    // Para mostrar bloqueamos al botón, luego en la función lo volvemos a activar
    newSec.disabled = true
    // Además de bloquear el botón bloqueamos el click a los bloques
    grid.forEach((e) => {e.showing = false})
    // Mostrando la arrSec --> a través de recursividad
    let it = 0;
    showSec(it,arrSec);

    return arrSec;
}

// Función recursiva para mostrar los 
function showSec(it,array) {
    
    newSec.classList.add("button-blocked");
    if (it != array.length) {
        grid[array[it]].show();
        setTimeout(()=> showSec(it+1,array),500);
    } else {
        newSec.disabled = false;
        newSec.classList.remove("button-blocked");
        return;
    }
}


function rand(num) {
    return Math.floor(Math.random()*num)
}