import { createElement, gameBoard } from "./global.js"


export let scoreState = {
    score: 0
}

function addingScore(){
    let score = createElement("h4", "score")
    score.innerText = "0"
    gameBoard.appendChild(score)
}


export function reloadScore(){
    document.querySelector(".score").innerText = scoreState.score
}

window.addEventListener("DOMContentLoaded", addingScore)