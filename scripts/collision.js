import { gameState, stopGame } from "./global.js";


export function checkColision(element){
    let birdCoords = element.getBoundingClientRect();
    let pipes = document.querySelectorAll(".pipe")
    
    if(gameState.gameStarted){
        pipes.forEach(pipe => {
            let top = pipe.querySelector(".top")
            let bottom = pipe.querySelector(".bottom")
    
            let pipeTop = top.getBoundingClientRect()
            let pipeBottom = bottom.getBoundingClientRect()
                
            let topCollison = verifyCollision(birdCoords, pipeTop)
            let bottomCollison = verifyCollision(birdCoords, pipeBottom)

            if (topCollison || bottomCollison) {
                stopGame() 
            }
        })

        if(birdCoords.top == 658){
            stopGame()    
        }
    }
}

function verifyCollision(bird, pipe){
    return(
        bird.top < pipe.bottom &&
        bird.bottom > pipe.top &&
        bird.left < pipe.right &&
        bird.right > pipe.left
    );
}



