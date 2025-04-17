
const gameBoard = document.querySelector('.gameBoard')

let gameState = {

    positionStart: -100,
    loopGeneratePipe: true,
    pipesArray: [],

    gameStarted: false,
    tickSpeed: 2000
}

function drawPipeLoop(){
    setInterval(() => {
        createNewPipe()
    }, gameState.tickSpeed);
}

function createElement(element, classList){
    const card = document.createElement(element)
    card.classList = classList;
    return card;
}

function movePipes() {
    if(!gameState.loopGeneratePipe) return;

    gameState.pipesArray.forEach((pipeObj, index) => {
        pipeObj.position += 2.49;
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
    const heightMax = 400;
    const heightMin = 90;
    const spaceBetween = 220;

    const heightTop = Math.floor(Math.random() * (heightMax - heightMin)) + heightMin;
    const heightBase = 580 - heightTop - spaceBetween;

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
        pipe.style.bottom = "90px";
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

function startGame(event){
    if(!gameState.gameStarted && (
        event.key === "" || 
        event.code === "Space")
    ){

        gameState.gameStarted = true;
        console.log(gameState.gameStarted);
        
        drawPipeLoop()
    }
}

window.addEventListener("keydown", startGame)
movePipes()







