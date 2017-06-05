// get the buttons
var btnStart = document.getElementById("start");
var btnRetry = document.getElementById("retry");
var btnCalc = document.getElementById("calculate");
var btnRestart = document.getElementById("restart");

// get the three divs

var divOne = document.getElementById("one");
var divTwo = document.getElementById("two");
var divThree = document.getElementById("three");

// add listeners to buttons
btnStart.addEventListener("click", validateInput);
btnRetry.addEventListener("click", retryQuiz);
btnCalc.addEventListener("click", calcScore);
btnRestart.addEventListener("click", restartQuiz);

// question objects
var questionOne = {
    title: "1. What is the correct way to link JavaScript?",
    answers: ['<code>&lt;script href="script.js" type="text/javascript"&gt;</code>', '<code>&lt;script src="script.js" rel="text/javascript"&gt;</code>', '<code>&lt;srcipt href="script.js" rel="text/javascript"&gt;</code>', '<code>&lt;script src="script.js" type="text/javascript"&gt;</code>'],
    correctAnswer: 4
};

var questionTwo = {
    title: "2. Is JavaScript case-sensitive?",
    answers: ['Yes, it\'s fussy about case', 'No, it doesn\'t give a fu--'],
    correctAnswer: 1
};

var questionThree = {
    title: "3. Which statement is not true for <code>var num = 3</code>?",
    answers: ['num == "3"', 'num === 3', "num != '4'", 'num === "3"', 'num == 3'],
    correctAnswer: 4
};

// validate the user input
function validateInput() {

    var errorMessage = "";

    // get the user input
    var strFullName = document.getElementById("full-name").value;
    var strEmail = document.getElementById("email").value;

    // get the place to output validation message
    var validationMessage = document.getElementById("validation-message");

    // validate full name
    if (strFullName == "") {
        errorMessage += "<li>Please enter a name</li>";

    } else if (!/^[a-zA-Z]+\s[a-zA-Z]+$/.test(strFullName)) {
        errorMessage += "<li>" + strFullName + " is NOT a valid first and last name</li>";
    }

    // validate email
    if (strEmail == "") {
        errorMessage += "<li>Please enter an email address</li>";


    } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(strEmail)) {
        errorMessage += "<li>" + strEmail + " is NOT a valid email address</li>";

    }

    // update validation message
    validationMessage.innerHTML = "<ul>" + errorMessage + "</ul>";

    // if both name and email are correct, show div containing the quiz and hide first div 
    if (strFullName != "" && strFullName.match(/^[a-zA-Z]+\s[a-zA-Z]+$/) && strEmail != "" && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(strEmail)) {
        divTwo.style.display = 'block';
        divOne.style.display = 'none';
        // print the user's name to the last div
        document.querySelector('.name').innerHTML = strFullName;
    }

    // reset error message and name and email fields
    errorMessage = "";

}

// set the user's score
var score = 0;

// get all the correct answers
var correctAnswers = document.querySelectorAll('input.correct');

// set total questions
var totalQuestions = correctAnswers.length;

// go through every item in correct answer array to see if it's checked, if checked, increase score
function calcScore() {

    for (answer in correctAnswers) {
        if (correctAnswers[answer].checked == true) {

            score++;
        }

    }

    // update page to reflect score
    document.getElementById("score").innerHTML = score;
    document.getElementById("total").innerHTML = totalQuestions;

    score = 0;

    /* hide second div and show third */
    divTwo.style.display = 'none';
    divThree.style.display = 'block';
}

// get all radio buttons
var allAnswers = document.querySelectorAll('input[type=radio]');

function retryQuiz() {

    // uncheck all radio buttons
    for (answer in allAnswers) {
        allAnswers[answer].checked = false;
    }
}


// restart quiz (show first div and hide all others)

function restartQuiz() {
    document.getElementById("full-name").value = "";
    document.getElementById("email").value = "";
    /* hide second div and show third */
    divThree.style.display = 'none';
    divOne.style.display = 'block';

}
