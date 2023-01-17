// Variable declarations to access elements easier.
let startScreen = document.getElementById('start-screen');
let startButton = document.getElementById('start');
let questionsDiv = document.getElementById('questions');
let questionTitle = document.getElementById('question-title');
let choicesDiv = document.getElementById('choices');
let endScreen = document.getElementById('end-screen');
let submitButton = document.getElementById('submit');
let timeSpan = document.getElementById('time');
let finalScore = document.getElementById('final-score');
let initialsField = document.getElementById('initials');

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
    let scoresTable = localStorage.getItem('highscores');
    console.log("1")
    console.log(scoresTable)
    if (scoresTable === null) {
        scoresTable = {}
        console.log("1aAA")
    } else {
        scoresTable = JSON.parse(localStorage.getItem('highscores'))
    }

    console.log("2")
    scoresTable[initialsField.textContent] = score;
    console.log("3")
    console.log(JSON.stringify(scoresTable))
    localStorage.setItem('highscores', JSON.stringify(scoresTable));
}

// Returns the HTML for a single questions answer
function buttonHTML(title, correct) {
    return "<button onClick='answerQuiz(" + correct + ")'>" + title + "</button>";
}

function populateAnswerBoxes(question) {
    let answers = question['answers'];

    let toInsert = "";
    answers.forEach((answer, index) => {
        toInsert = toInsert + buttonHTML(answer[0], answer[1]);
    })

    choicesDiv.innerHTML = toInsert;
    questionTitle.innerHTML = question['title'];
}

let currentQuestion = 0;
let score = 0;
let timerEnd = 0;
function startQuiz() {
    timerEnd = (Date.now() / 1000) + 300; // 5 mins
    populateAnswerBoxes(questions[currentQuestion]);
}

function endQuiz() {
    // Hide the questions div
    questionsDiv.classList.add('hide');
    // Unhide the end screen div
    endScreen.classList.remove('hide');
    // Set final score span to value of 'score'
    finalScore.innerText = score;
}

// answerQuiz is called by the buttons
function answerQuiz(correct) {
    if (correct) {
        score += 1;
    } else {
        score -= 1;
        timerEnd = timerEnd - 10; // remove 10sec from the timer
    }

    console.log("Current score: " + score);
    currentQuestion += 1;

    // if currentQuestions is equal the length, we've past the last question
    if (currentQuestion == questions.length) {
        endQuiz();
        return;
    }

    // populate answer boxes for the next (now current) question
    populateAnswerBoxes(questions[currentQuestion])
}

// This function runs every second to update the timer or call endQuiz
function secondTick() {
    // if timer has started (timerEnd != 0) and we haven't finished the quiz yet
    if (timerEnd != 0 && currentQuestion < questions.length) {
        // if current time is greater than timerEnd, end the quiz
        if ((Date.now() / 1000) > timerEnd) {
            endQuiz()
        }
        timeSpan.innerText = Math.floor(timerEnd - (Date.now() / 1000));
    }
}
setInterval(secondTick, 1000);