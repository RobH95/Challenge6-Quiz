let highScoresList = document.getElementById('highscores');
let clearButton = document.getElementById('clear');

clearButton.onclick = function() {
    localStorage.clear();
    console.log("Cleared localStorage");
}

let scoresTable = localStorage.getItem('highscores') || {};
let scoresInnerHTML = "";
for (const score in scoresTable) {
    const scoreValue = scoresTable[score];
    scoresInnerHTML = scoresInnerTable + "<li>" + score + ": " + scoreValue + "</li>";
}

highScoresList.innerHTML = scoresInnerHTML