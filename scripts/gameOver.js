import { createElement, gameState, resetGame } from "./global.js";
import { savePlayer, scoreState } from "./score.js";
const game = document.querySelector(".game")

function createGameOver(){
    let modalGameOver = createElement("div", "modalGameOver hidden")

    let gameoverTitle = createElement("h1", "title")
    gameoverTitle.textContent = "Game Over"

    let tempScore = createElement("h4", "tempScore")
    tempScore.textContent = "Score:  Points"

    let inputName = createElement("input", "insertNickname")
    inputName.setAttribute("placeholder", "insert nickname")
    inputName.setAttribute("maxlength", "20")

    let textReload = createElement("h4", "textReload")
    textReload.textContent = `Press "Space" to Save & Reload`

    modalGameOver.appendChild(gameoverTitle)
    modalGameOver.appendChild(tempScore)

    modalGameOver.appendChild(inputName)

    modalGameOver.appendChild(textReload)

    game.appendChild(modalGameOver)
}
createGameOver()


export function showGameOver(boolean){
    document.querySelector(".modalGameOver").classList.toggle("hidden", boolean)
    gameState.gameOver = !boolean;
}

window.addEventListener("keydown", closeModal)

function closeModal(event){

    if(gameState.gameOver && (event.code == "Space" || event.key == "")){
        let inputname = document.querySelector(".insertNickname")
        
        if (document.activeElement === inputname) {
            resetGame()
            
            if(scoreState.score > 1 && inputname.value.trim() !== ""){
                savePlayer(inputname.value.trim(), scoreState.score)
                console.log(inputname.value.trim());
            }
            inputname.value = inputname.value.trim()
        } else {
            inputname.focus()
        }
        
    }

}

