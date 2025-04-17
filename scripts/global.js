import { drawBirdElement } from "./bird.js";
import { drawPipeLoop } from "./pipes.js";

export const gameBoard = document.querySelector('.gameBoard')

export let gameState = {
    positionStart: -100,
    loopGenerate: true,
    pipesArray: [],

    gameStarted: false,
    tickSpeed: 2000
}

export function createElement(element, classList){
    const card = document.createElement(element)
    card.classList = classList;
    return card;
}


function handleKeyPress(event){

    if(!gameState.gameStarted && (
        event.key == "" || 
        event.code == "Space"
    )){
        gameState.gameStarted = true;
        drawPipeLoop()
        drawBirdElement()
        console.log("startgame");
               
    }

}
window.addEventListener("keydown", handleKeyPress)