
const gameBoard = document.querySelector('.gameBoard')

let gameState = {

    positionStart: 0,
    loopGeneratePipe: true,
    pipesArray: [],

    gameStarted: false
}

function drawPipeLoop(){
    setInterval(() => {
        createNewPipe()
    }, 2500);
}

function createElement(element, classList){
    const card = document.createElement(element)
    card.classList = classList;
    return card;
}

function movePipes() {
    if(!gameState.loopGeneratePipe) return;

    gameState.pipesArray.forEach((pipeObj, index) => {
        pipeObj.position += 2;
        pipeObj.element.style.right = pipeObj.position + "px"

        if(pipeObj.position >= 500){
            gameBoard.removeChild(pipeObj.element)
            gameState.pipesArray.splice(index, 1)
        }
    });

    requestAnimationFrame(movePipes)
}

function createNewPipe() {
    const pipe = createPipeGroup()
    pipe.style.right = gameState.positionStart + "px"
    gameBoard.appendChild(pipe)

    gameState.pipesArray.push({element: pipe, position: gameState.positionStart})
}

function createPipeGroup(){
    const pipe = createElement("div", "pipe")
    
    const pipeTop = createPipe("top")
    const pipeBottom = createPipe("bottom")
    
    pipe.appendChild(pipeTop);
    pipe.appendChild(pipeBottom);
    return pipe;
}

function createPipe(position){
    const pipe = createElement("div", `cano ${position}`)        
    const pipeHead = createElement("div", "head")
    const pipeBody = createElement("div", "body")

    pipe.appendChild(pipeHead)
    pipe.appendChild(pipeBody) 
    return pipe;
}

function startGame(event){
    if(!gameState.gameStarted && 
        event.key === "" || 
        event.code === "Space"
    ){

        gameState.gameStarted = true;
        drawPipeLoop()
    }
}

window.addEventListener("keydown", startGame)
movePipes()







