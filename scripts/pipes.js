import { createElement, gameBoard, gameState } from "./global.js";
import { reloadScore, scoreState } from "./score.js";

export function drawPipeLoop() {
    clearInterval(gameState.pipeIntervalId); 
    gameState.pipeIntervalId = setInterval(() => {
        createNewPipe();
    }, gameState.tickSpeed);
}

export function movePipes() {
    if(!gameState.loopGenerate) return;

    gameState.pipesArray.forEach((pipeObj, index, point) => {
        pipeObj.position += 2.485;
        pipeObj.element.style.right = pipeObj.position + "px"

        if(!pipeObj.point && pipeObj.position > 200){
            pipeObj.point = true
            scoreState.score += 1
            reloadScore()
        }

        if(pipeObj.position >= 500){
            gameBoard.removeChild(pipeObj.element)
            gameState.pipesArray.splice(index, 1)
        }
    });

    requestAnimationFrame(movePipes)
}

function createNewPipe() {
    if(gameState.gameStarted){
        const pipe = createPipeGroup()
        pipe.style.right = gameState.positionStart + "px"
        gameBoard.appendChild(pipe)
    
        gameState.pipesArray.push({element: pipe, position: gameState.positionStart, validPoint: false})
    
    }
}

function createPipeGroup() {
    const pipeGroup = createElement("div", "pipe");

    const pipeTop = createPipe("top");
    const pipeBottom = createPipe("bottom");

    const { heightTop, heightBase } = getRandomHeights();

    setPipeHeight(pipeTop, heightTop);
    setPipeHeight(pipeBottom, heightBase);

    positionPipe(pipeTop, "top");
    positionPipe(pipeBottom, "bottom");

    pipeGroup.appendChild(pipeTop);
    pipeGroup.appendChild(pipeBottom);

    return pipeGroup;
}

function getRandomHeights() {
    const heightMax = 320;
    const heightMin = 30;
    const spaceBetween = 300;

    const heightTop = Math.floor(Math.random() * (heightMax - heightMin)) + heightMin;
    const heightBase = 700 - heightTop - spaceBetween;

    return { heightTop, heightBase };
}

function setPipeHeight(pipe, height) {
    const body = pipe.querySelector(".body");
    if (body) {
        body.style.height = height + "px";
    }
}

function positionPipe(pipe, type) {
    pipe.style.position = "absolute";

    if (type === "top") {
        pipe.style.top = "0";
        pipe.style.transform = "rotate(180deg)";
    } else {
        pipe.style.bottom = "0px";
    }
}

function createPipe(position){
    const pipe = createElement("div", `cano ${position}`)        
    const pipeHead = createElement("div", "head")
    const pipeBody = createElement("div", "body")

    pipe.appendChild(pipeHead)
    pipe.appendChild(pipeBody) 
    return pipe;
}

export function resetGamePipes() {
    gameState.pipesArray = []; 
    let pipesInGameBoard = gameBoard.querySelectorAll(".pipe")
    pipesInGameBoard.forEach(pipe => {
        gameBoard.removeChild(pipe)
    });

}






