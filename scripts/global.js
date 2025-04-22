import { drawBird, jumpBird } from "./bird.js";
import { drawPipeLoop } from "./pipes.js";

export const gameBoard = document.querySelector('.gameBoard')

export let gameState = {
    positionStart: -100,
    loopGenerate: true,
    pipesArray: [],

    gameStarted: false,
    tickSpeed: 2000,
    tickRate: 60
}

export function createElement(element, classList){
    const card = document.createElement(element)
    card.classList = classList;
    return card;
}


function handleKeyPress(event){
    if (event.code === "Space" && 
        gameState.gameStarted
    ){
        jumpBird();
    }

    if(!gameState.gameStarted && (
        event.key == "" || 
        event.code == "Space"
    )){
        gameState.gameStarted = true;
        drawPipeLoop()
        drawBird()
        console.log("startgame");         
    }

}


export function stopGame(){
    document.querySelector(".game").classList.remove("moveBackground")
    gameState.loopGenerate = false;
    gameState.gameStarted = false;
}

window.addEventListener("keydown", handleKeyPress)