import { birdState, drawBird, jumpBird } from "./bird.js";
import { showGameOver } from "./gameOver.js";
import { showGameStart } from "./gameStart.js";
import { drawPipeLoop, movePipes, resetGamePipes } from "./pipes.js";

export const gameBoard = document.querySelector('.gameBoard')

export let gameState = {
    positionStart: -100,

    gameOver: false,
    gameStartPage: true, 
    gameStarted: false,
    tickSpeed: 2000,
    tickRate: 60,
    
    loopGenerate: true,
    pipesArray: [],
    pipeIntervalId: null
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

    if(!gameState.gameStarted && 
        !gameState.gameOver && 
        gameState.gameStartPage && (
        event.key == "" || 
        event.code == "Space"
    )){
        startGame()
    }

}

function startGame() {
    gameState.gameStarted = true;
    gameState.loopGenerate = true;
    drawPipeLoop()
    movePipes()
    drawBird()

    showGameOver(true)
    showGameStart(true)

    birdState.gravityValue = 2
    birdState.birdY = 20  
}

export function stopGame(){
    document.querySelector(".game").classList.remove("moveBackground")
    gameState.loopGenerate = false;
    gameState.gameStarted = false;

    clearInterval(gameState.pipeIntervalId);
    gameState.pipeIntervalId = null;

    showGameOver(false)
}

export function resetGame(){
    document.querySelector(".game").classList.add("moveBackground")
    document.querySelector(".bird").style.top = "150px"
    resetGamePipes()

    setTimeout(() => {
        showGameStart(false)
        showGameOver(true)
        birdState.gameIntervalBird = 0
        
        gameState.gameStartPage = true;  // Garantir que a página de início esteja ativa
        gameState.gameOver = false;      // Resetar o estado do jogo
        gameState.gameStarted = false; 
    }, 100);
    
}

window.addEventListener("keydown", handleKeyPress)