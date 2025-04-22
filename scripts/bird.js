import { checkColision } from "./collision.js";
import { createElement, gameBoard, gameState } from "./global.js";

let birdState = {
    screenTop: -30,   
    screenBottom: 490,

    birdElement: "",
    gameIntervalBird: "",
    gravityValue: 2,
    gravityAcceleration: 0.8, 
    gravityMax: 20,
    birdY: 1
}

function drawBirdElement(){
    const bird = createElement("div", "bird")
    birdState.birdElement = bird
    birdState.birdElement.style.top = "150px";
    gameBoard.appendChild(bird)
}

export function drawBird() {
    gameLoop(); 
}

export function jumpBird(){
    setPosition("up")
    
}

function gameLoop(){
    clearInterval(gameState.gameIntervalBird)
    gameState.gameIntervalBird = setInterval(() => {
        gravity()
        checkColision(birdState.birdElement)
    }, gameState.tickRate)
}

function gravity() {
    if(birdState.gravityValue < birdState.gravityMax){
        birdState.gravityValue += birdState.gravityAcceleration;
    }
    setPosition("down")
}

function setPosition(direction) {
    if (direction === "down") {
        birdState.birdY += birdState.gravityValue * 6;
    } else {
        birdState.gravityValue = 0;
        birdState.birdY -= 250;
    }

    birdState.birdY = Math.max(birdState.screenTop, Math.min(birdState.birdY, birdState.screenBottom));

    birdState.birdElement.style.top = `${birdState.birdY}px`;
}

window.addEventListener("DOMContentLoaded", () => {
    drawBirdElement()
})

