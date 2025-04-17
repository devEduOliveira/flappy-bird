import { createElement, gameBoard, gameState } from "./global.js";
let birdElement = null;
let gameInterval;

export function drawBirdElement(){
    const bird = createElement("div", "bird")
    gameBoard.appendChild(bird)
    birdElement = bird

    drawBird()
}

let spacePressed = false;

// Detecta quando uma tecla é pressionada
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        spacePressed = true
        drawBird()

        setPosition("up")
    }
});

function drawBird() {
    spacePressed ? spacePressed = false : spacePressed = true;
    gameLoop(); // Continua o jogo normalmente
}

function gameLoop(){
    clearInterval(gameInterval)
    gameInterval = setInterval(() => {
        gravity()
    }, 20)
}


let gravityValue = 0.2; // valor base de início
let gravityAcceleration = 0.15; // quanto aumenta por tick
let gravityMax = 1.2; // limite de gravidade

function gravity() {
    if(gravityValue < gravityMax){
        gravityValue += gravityAcceleration;
    }
    setPosition("down")
}

function setPosition(direction){
    let birdTop = parseFloat(birdElement.style.top) || 0;
    let position;
    
    direction == "down" ? position = (birdTop += 7 * gravityValue) : position = (birdTop -= 200)
    
    if (direction === "down") {
        position = birdTop + gravityValue * 6; // queda gradual e fluida
    } else {
        gravityValue = 0.6; // reseta leve a gravidade após o pulo
        position = birdTop - 70; // pulo suave, sem exagerar
    }

    birdElement.style.top = position+ "px";
}

