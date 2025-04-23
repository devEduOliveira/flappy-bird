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

function createRanking(){
    let scoreRank = createElement("div", "scoreRank")
    let table = createElement("table", "tableRank")

    scoreRank.appendChild(table)
    document.querySelector(".game").appendChild(scoreRank)
}
createRanking()

export function savePlayer(player, score){
    let ranking = loadLocalStorage();
    ranking.push({name: player, score})
    ranking.sort((a,b) => b.score - a.score)
    saveInLocalStorage(ranking)
    showRanking()
}

function saveInLocalStorage(dados){
    localStorage.setItem("ranking", JSON.stringify(dados))
}

function loadLocalStorage(){
    const data = localStorage.getItem("ranking")
    return data ? JSON.parse(data) : []
}

function showRanking() {
    const table = document.querySelector(".tableRank");

    table.innerHTML = 
        `<tr>
            <th id="rank">#</th>
            <th id="name">Name</th>
            <th id="score">Score</th>
        </tr>`;

    const ranking = loadLocalStorage();
    const topRanking = ranking.slice(0, 10);
    topRanking.forEach((player, index) => {
        table.innerHTML += 
        `<tr>
            <td id="rank">${index + 1}</td>
            <td id="name">${player.name}</td>
            <td id="score">${player.score}</td>
        </tr>`;
    });
}


window.addEventListener("DOMContentLoaded", addingScore)
showRanking()