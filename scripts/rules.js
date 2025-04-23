import { createElement } from "./global.js";


export function showRules(){
    let gridRules = createElement("div", "gridRules")

    let rulesTitle = createElement("h4", "rulesTitle")
    rulesTitle.innerText = "Rules"

    let rulesTexybody = createElement("h4", "rulesTextbody")
    rulesTexybody.innerText = `
    Objective:
        - Guide the bird as far as possible by flying through the gaps between the pipes.

    Controls:
        - Press the spacebar to make the bird "jump" (go up).
        - The bird automatically falls due to gravity.

    Collision = Game Over:
        - If the bird hits a pipe, the game ends.
        - If the bird touches the ground, it continues riding on a skateboard.

    Scoring:
        - You earn +1 point each time you successfully pass between two pipes.

    Constant speed:
        - Pipes move from right to left at a fixed speed.

    No pause or save:
        - The game cannot be paused and restarts from zero when it ends.
    `

    gridRules.appendChild(rulesTitle)
    gridRules.appendChild(rulesTexybody)
    return gridRules
}
