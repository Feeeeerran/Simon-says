console.log("Hola mundo")

// Setup
let grid = [];
let sec = [];
var play;

// DOM
let blocks = document.querySelectorAll(".block");
let buttonPlay = document.querySelector("button");
let turnoPlayer = document.querySelector(".tu-turno");
let containerBlock = document.querySelector(".container");
let checkIcon = document.querySelector(".icon")

// Definiendo que es cada bloque
var i = 0;
for (block of blocks) {
    grid[i] = new Block(i,block)
    i++;
}


// ~~~~~~~~~~~~~~~~  INICIANDO EL JUEGO  ~~~~~~~~~~~~~~~~~~~~ 
// El botón let's go me inicia el juego 
buttonPlay.addEventListener("click", sSays)
function sSays() {
    turnoPlayer.classList.remove("tuTurno-animOut");
    checkIcon.classList.remove("checkIn")

    // Una vez mostrada la secuencia llamamos al turno del jugador
    // Para eso desactivamos el eventListener del let's go
    sec = secuencia(sec);
    buttonPlay.removeEventListener("click",sSays);
    play = 0;
}


// función que llaman los bloques al ser clickeados
// Criterios a tener en cuenta
//  - Mientras se acierte le puedo dar click la cantidad de valores que haya en sec
//  - Si ha sido todo correcto --> cuando hago click bien al último sale el cartel todo bien --> darle al let's go
//  - Si se falla al menos una sola vez --> cartel de equivocado + volver a jugar
function verif(select) {
    turnoPlayer.classList.remove("tuTurno-animIn");
    turnoPlayer.classList.add("tuTurno-animOut");

    if (select == sec[play] && play == sec.length-1) {
        // Todo perfecto --> volvemos a activar la secuencia
        // Desactivamos el modo playing
        grid.forEach((e) => {
            e.playing = false;
        })

        buttonPlay.classList.remove("button-blocked")
        checkIcon.classList.add("checkIn")


        // Volvemos a cargar el eventListener
        buttonPlay.addEventListener("click", sSays)


    } else if (select == sec[play] && play < sec.length) {
        // Opción buena --> sigue jugando --> añadir alguna animación
    } else {
        
    }

    play++;
}






// Definiendo la secuencia + mostrarla en dom
function secuencia(arrSec) {
    // DEFINE LA SECUENCIA 
    // Obtengo un array de secuencias que van de 0 a 8 No van de 1 a 9 por temas de indexación en los arrays
    if (arrSec[0] == undefined) {
        for (let i=0;i<3;i++) {
            arrSec.push(rand(9));
        }
    } else {
        arrSec.push(rand(9));
    }
    console.log(arrSec)


    // MUESTRO LA SECUENCIA
    // Usamos la función para bloquear botones
    toggleClick(false)
    // Mostrando la arrSec --> a través de recursividad
    showSec(0,arrSec);
    
    return arrSec;
}

// Función recursiva para mostrar los bloques (uso recursividad para aprovechar el TimeOut)
function showSec(it,array) {
    if (it != array.length) {
        grid[array[it]].show();
        setTimeout(()=> showSec(it+1,array),500);
    } else {
        // Una vez finaliza la iteración recursiva muestro el cartel del turno y desbloqueo los botones
        toggleClick(true)
        turnoPlayer.classList.add("tuTurno-animIn")

        // Finaliza la secuencia ahora el usuario puede jugar
        grid.forEach((e) => {
            e.playing = true;
        })

        buttonPlay.classList.add("button-blocked")
        return;
    }
}




// Función para bloquear botones tanto del let's go como los bloques
function toggleClick(bool) {
    if (bool) {
        grid.forEach((e) => {
            e.showing = bool;
            e.domE.classList.remove("button-blocked")
        });

        buttonPlay.disabled = !bool;
        buttonPlay.classList.remove("button-blocked");
    } else {
        grid.forEach((e) => {
            e.showing = bool;
            e.domE.classList.add("button-blocked")
        });

        buttonPlay.disabled = !bool;
        buttonPlay.classList.add("button-blocked");
    }

    // Explicación:
    //  Si quiero bloquear los botones --> argumento debe ser false
    //  Si quiero desbloquearlos --> argumento debe ser true

}

// Función rand --> numero aleatorio entero entre 0 y num-1
function rand(num) {
    return Math.floor(Math.random()*num)
}