console.log("Hola mundo")

// Setup
let grid = [];
let sec = [];
var play;
var score = 0;

// DOM
let blocks = document.querySelectorAll(".block");
let buttonPlay = document.querySelector("button");
let alerts = document.querySelector(".alert");
let alertMsg = document.querySelectorAll(".alert p")
let containerBlock = document.querySelector(".container");
let icons = document.querySelectorAll(".icon");
let scoreD = document.querySelector(".score");
let scoreP = document.querySelector(".score p");

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
    showAlert(false,1);
    icons[0].classList.remove("iconIn")
    icons[1].classList.remove("iconIn")


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
    showAlert(false,0);

    if (select == sec[play] && play == sec.length-1) {
        // Todo perfecto --> volvemos a activar la secuencia
        // Desactivamos el modo playing
        grid.forEach((e) => {
            e.playing = false;
        })

        buttonPlay.classList.remove("button-blocked")
        icons[0].classList.add("iconIn")
        
        // Sumando al contador de score
        score++

        // Volvemos a cargar el eventListener
        buttonPlay.addEventListener("click", sSays)

    } else if(select != sec[play]) {
        // Equivocado --> resetear juego
        showAlert(true,1);
        buttonPlay.classList.remove("button-blocked")
        icons[1].classList.add("iconIn")

        // Mostrando el score final
        scoreD.style.visibility = "visible"
        scoreP.innerHTML = `MAX SCORE <br>  ${score}`


        reset();


    }

    play++;
}

// Función para resetear el juego --> hay que dejarlo como cuando inicia
function reset() {
    buttonPlay.addEventListener("click", sSays)
    sec = [];

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
        showAlert(true,0)

        // Finaliza la secuencia ahora el usuario puede jugar
        grid.forEach((e) => {
            e.playing = true;
        })

        buttonPlay.classList.add("button-blocked")
        return;
    }
}

// Función para mostrar y reatraer los alert
function showAlert(bool,opc) {
    // bool me indica si mostrar o retraer el alert
    // la opción me muestra si es el primer o segundo mensaje
    if (bool) {
        alerts.classList.add("alertIn");
        alertMsg[opc].style.opacity = 1;            
        alerts.classList.remove("alertOut")
    } else {
        // alerts.classList.add("alertOut");
        alertMsg[opc].style.opacity = 0;
        alerts.classList.remove("alertIn")
    }
}


// Función para bloquear botones tanto del let's go como los bloques
function toggleClick(bool) {
    if (bool) {
        grid.forEach((e) => {
            e.showing = bool;
            e.domE.classList.remove("button-blocked")
            e.domE.classList.add("hover")
        });

        buttonPlay.disabled = !bool;
        buttonPlay.classList.remove("button-blocked");
    } else {
        grid.forEach((e) => {
            e.showing = bool;
            e.domE.classList.add("button-blocked")
            e.domE.classList.remove("hover")

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