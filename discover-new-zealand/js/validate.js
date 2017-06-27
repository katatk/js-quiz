// get the buttons
var submitBtn = document.getElementById("submit");
var clearBtn = document.querySelector('[type="reset"]');

// create a div for the validation message
var validationContainer = document.getElementById("validation-message-container");

// add event listeners to submit and clear buttons
submitBtn.addEventListener("click", validateForm);
clearBtn.addEventListener("click", clearForm);

var errorMessage = "";

function validateName(name) {

    // validate full name
    if (name == "") {
        errorMessage += "<li>Please enter a name</li>";
        console.log("name returned false");
        return false;
    } else if (!/^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/.test(name)) {
        errorMessage += "<li>" + name + " is NOT a valid first and last name</li>";
        return false;
    } else {
        return true;
    }
}

function validateEmail(email) {

    // validate email
    if (email == "") {
        errorMessage += "<li>Please enter an email address</li>";
        console.log("email returned false");
        return false;

    } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email)) {
        errorMessage += "<li>" + email + " is NOT a valid email address</li>";
        return false;

    } else {
        return true;
    }

}

function validatePhone(phone) {
    if (phone == "") {
        errorMessage += "<li>Please enter a phone number</li>";
        console.log("phone returned false");
        return false;
    }

    // if phone number field contains something, run this
    else if (phone != "") {

        // tests if phone only contains numbers or spaces
        if (!/[0-9 ]+/.test(phone)) {
            errorMessage += "<li>Please enter a number in the phone number field</li>";
            return false;
        }

        // tests if phone is between 9 and 13
        if (phone.length > 13 || phone.length < 9) {
            errorMessage += "<li>Phone number must be between 9 and 13 characters long (can include spaces)</li>";
            return false;
        }

        // phone number must contain either a plus or a 0 at the beginning
        if (phone.charAt(0) != "0" && phone.charAt(0) != "+") {
            errorMessage += "<li>" + phone + " is NOT a valid phone number, it must start with a '0' or '+'</li>";
            return false;
        } else {
            return true;
        }
    }

}

function validateMessage(message) {
    // validate message
    if (message == "") {
        errorMessage += "<li>Please enter a message</li>";
        console.log("message returned false");
        return false;


    } else if (message != "") {
        if (message.length < 10) {
            errorMessage += "<li>Your message needs to be 10 characters or longer</li>";
            return false;

        }

        if (message.length > 500) {
            errorMessage += "<li>Your message needs to shorter than 500 characters</li>";
            return false;

        } else {
            return true;
        }
    }

}

function validateForm() {

    // set an empty error message to be built up when validate function runs
    errorMessage = "";

    // get the user full name
    var strFullName = document.getElementById("full-name").value;

    // get the email address
    var strEmail = document.getElementById("email").value;

    // get the phone number
    var strPhone = document.getElementById("phone-number").value;

    // get the message
    var strMessage = document.getElementById("message").value;

    var validName = validateName(strFullName);
    var validEmail = validateEmail(strEmail);
    var validPhone = validatePhone(strPhone);
    var validMessage = validateMessage(strMessage);

    // if all fields are valid, form is ready to submit
    if (validName && validEmail && validPhone && validMessage) {
        // submit form!
        validationContainer.innerHTML = "Thank you for your message!";
        return;
    } else {
        validationContainer.innerHTML = errorMessage;
        return;
    }

}

function clearForm() {

    // set validation message to an empty string
    validationContainer.innerHTML = "";
}
