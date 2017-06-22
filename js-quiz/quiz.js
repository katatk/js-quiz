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

// question array
var questions = [
questionOne = {
        number: 1,
        title: "1. Which is the correct way to link an external JavaScript file in HTML?",
        answers: ['<code>&lt;script href="script.js" type="text/javascript"&gt;</code>', '<code>&lt;script src="script.js" rel="text/javascript"&gt;</code>', '<code>&lt;srcipt href="script.js" rel="text/javascript"&gt;</code>', '<code>&lt;script src="script.js" type="text/javascript"&gt;</code>'],
        correctAnswer: 3
},

questionTwo = {
        number: 2,
        title: "2. Is JavaScript case-sensitive?",
        answers: ['Yes, it\'s fussy about case', 'No, it\'s super chill'],
        correctAnswer: 0
},

questionThree = {
        number: 3,
        title: "3. Which statement is not true for the following? <pre><code>var num = 3</code></pre>",
        answers: ['num == "3"', 'num === 3', "num == '3'", "num != 4", 'num === "3"', 'num == 3'],
        correctAnswer: 4
},
questionFour = {
        number: 4,
        title: "4. Which events are fired when an element is clicked?",
        answers: ['<code>click</code>', '<code>mousedown</code> and <code>mouseup</code>', '<code>mousedown</code>, <code>mouseup</code> and <code>click</code>'],
        correctAnswer: 2
},

    questionFive = {
        number: 5,
        title: "5. What does this return? <pre><code>Boolean('12' > 10)</code></pre>",
        answers: ['<code>True</code>', '<code>False</code>', '<code>NaN</code>'],
        correctAnswer: 0
}

];

output = "";

// get the container to set the output to
var questionsContainer = document.getElementById("questions-container");

// build the html
for (x in questions) {
    output += "<div class='inner'>";
    output += "<div>";
    output += "<legend class='question-heading'>" + questions[x].title + "</legend>";

    for (var j = 0; j < questions[x].answers.length; j++) {
        output += "<div class='questions'>";
        output += "<input type='radio' name='q" + questions[x].number + "'>";
        output += "<label>" + questions[x].answers[j] + "</label>";
        output += "</div>";
    }

    output += "</div>";
    output += "</div>";
}

questionsContainer.innerHTML = output;

// print total to page (equal to length of questions array)
document.getElementById("total").innerHTML = questions.length;

/* ========

Validate User Input

=========== */

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

    } else if (!/^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/.test(strFullName)) {
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
    if (strFullName != "" && strFullName.match(/^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/) && strEmail != "" && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(strEmail)) {
        divTwo.style.display = 'block';
        divOne.style.display = 'none';
        // print the user's name to the last div
        document.querySelector('.name').innerHTML = strFullName.split(" ")[0];
    }

    // reset error message and name and email fields
    errorMessage = "";

}

/* ========

Calculate Score

=========== */

function calcScore() {
    // set the user's score
    var score = 0;

    var unansweredMessage = "";

    for (x in questions) {
        // store correct answer for each question 
        var correct = questions[x].correctAnswer;

        // get the radio buttons to loop through and see if they're checked
        var questionAnswers = document.querySelectorAll('[name=q' + questions[x].number + ']');
        var isChecked = false;

        // loop through all the answers to see if they are checked, if a checked answer is the correct answer, add 1 to the score
        for (var j = 0; j < questions[x].answers.length; j++) {

            // if an answer is checked, then see if it is the correct answer
            if (questionAnswers[j].checked === true) {
                console.log(questionAnswers[j]);
                isChecked = true;

                // if correct answer, add to score
                if (j == correct) {
                    score++;
                }

            }
        }

        // If there was no radio buttons checked for the question we need to add to unanswered string.
        if (isChecked === false) {
            unansweredMessage += questions[x].number + ", ";
        }
    }


    // if none are checked, throw an error
    if (unansweredMessage !== "") {
        document.querySelector(".error-message").innerHTML = "Halt! You must answer all the questions first, you missed the following: " + unansweredMessage;
    } else {
        // hide second div and show third 
        divTwo.style.display = 'none';
        divThree.style.display = 'block';
    }

    // update page to reflect score
    var scoreContainer = document.getElementById("score");
    scoreContainer.innerHTML = score;




}


/* ========

Retry Quiz

=========== */


function retryQuiz() {

    // get all radio buttons
    var allAnswers = document.querySelectorAll('input[type=radio]');

    // uncheck all radio buttons
    for (answer in allAnswers) {
        allAnswers[answer].checked = false;
    }
    document.querySelector(".error-message").innerHTML = "";
}



/* ========

Restart Quiz

=========== */

function restartQuiz() {
    document.getElementById("full-name").value = "";
    document.getElementById("email").value = "";
    /* hide second div and show third */
    divThree.style.display = 'none';
    divOne.style.display = 'block';

    // clear all radio buttons and remove missed questions message
    retryQuiz();

}
