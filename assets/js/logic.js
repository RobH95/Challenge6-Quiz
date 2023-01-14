let startScreen = document.getElementById('start-screen');
let startButton = document.getElementById('start');
let questionsDiv = document.getElementById('questions');
let choicesDiv = document.getElementById('choices');
let endScreen = document.getElementById('end-screen');
let submitButton = document.getElementById('submit');

// Start button handler
startButton.onclick = function() {
    // Hide #start-screen
    startScreen.classList.add('hide');
    // Unhide #questions
    questionsDiv.classList.remove('hide');

    startQuiz();
}

// Submit button handler
submitButton.onclick = function() {

}

function buttonHTML(id, title) {
    return "<button id='" + id + "'>" + title + "</button>"
}

function populateAnswerBoxes(question) {
    let title = question['title'];
    let answers = question['answers'];

    console.log("Question: " + title);
    console.log("Correct answer: " + answers[0]);

    let toInsert = "";
    toInsert = toInsert + buttonHTML()
}

currentQuestion = 0;
function startQuiz() {
    populateAnswerBoxes(questions[currentQuestion])
}