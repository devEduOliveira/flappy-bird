import { createElement, gameState } from "./global.js";
import { showRules } from "./rules.js";
const game = document.querySelector(".game")

function createGameStart(){
    let modalGameStart = createElement("div", "modalGameStart")

    let gameoverTitle = createElement("h4", "title")
    gameoverTitle.textContent = `Press "space" to start game`

    modalGameStart.appendChild(gameoverTitle)

    game.appendChild(showRules())
    game.appendChild(modalGameStart)
}
createGameStart()


export function showGameStart(boolean){
    document.querySelector(".modalGameStart").classList.toggle("hidden", boolean)
    gameState.gameStartPage = !boolean;
}


