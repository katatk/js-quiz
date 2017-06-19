// Variables

// Sets new animal that appears
var newAnimal;

// How many animals user has caught
var userAnimals = [];

// Maximum that user can catch
const maximum = 10;

// Maximum animals reached
var maximumReached = false;

// Getting amount in each array
var userTotal = userAnimals.length;

// How many unique species user has
var userSpecies;

var oneLeft;

var clicks = 0;

//removed animals array - animals that have been
//released but we might want to bring back with 'undo'

var removedAnimals = {
    index: -1
};


// releasedAnimal tells us if we have release an animal
// -1 means we haven't just released an animal
// if >= 0, then remove animal at this index, marks animal to be released
var releasedAnimal = -1;

// Updating html to display amount (x out of y)

$(".user-total").html(userTotal);
$(".maximum").html(maximum);


// GET request getting animals from json file and putting them in
// animals array
// totalAnimals is also equal to total species
var totalAnimals;

var weightedAnimals;

$.getJSON('js/animals.json', function (data) {
    var Animals = data;
    totalAnimals = Animals.length;
    $(".species-total").html(totalAnimals);

    // Pass the global animals array to the function
    weightedAnimals = generateRandomAnimals(Animals);

    //Generate bait buttons
    var baitList = getBaits(Animals);
    baitButtons(baitList);
    setUpButtons();

    //hint function uses oneLeft
    oneLeft = totalAnimals - 1;
});

// Generate random animals array (each animal probability x 100)
// Multiple arrays for different bait types
// function requires an 'animals' array
generateRandomAnimals = function (animals) {
    var randomAnimals = {};

    //For each animal object in the animals.json array
    //key = index, value = object
    $.each(animals, function (index, animal) {

        //For each bait object in the animals object
        //key = baitType (eg. meat), value = bait (probability, eg. 0.1)
        $.each(animal.bait, function (baitType, bait) {
            // amount is how many of each animal to add to baitType array
            // eg Panther meat: 0.6, add 60 panthers to meat array
            var amount = bait * 100;
            // If baitType doesn't exist yet, create an empty array
            // otherwise for loop will add animals to the array
            if (typeof randomAnimals[baitType] === "undefined") {
                randomAnimals[baitType] = [];
            }

            for (i = 0; i < amount; i++) {
                randomAnimals[baitType].push(animal);
            }

        });
    });

    return randomAnimals;
}

// Generate bait buttons

function getBaits(animals) {
    var baitList = [];
    $.each(animals, function (index, animal) {

        //For each bait object in the animals object
        //key = baitType (eg. meat), value = bait (probability, eg. 0.1)
        $.each(animal.bait, function (baitType, bait) {
            if (baitList.indexOf(baitType) === -1) {

                baitList.push(baitType);
            }

        });

    });

    return baitList;

}

function baitButtons(baitList) {
    var html = "";

    for (i = 0; i < baitList.length; i++) {
        var baitType = baitList[i];

        html += "<a class='button bait' data-bait='";
        html += baitType;
        html += "'>";
        html += baitType;
        html += "</a>";
    }

    $(".buttons").html(html);

}

// Function to get next random animal from arr
//  + setting html
//  
function bait(arr) {
    var i = Math.floor(Math.random() * arr.length);
    // Sets new animal that appears
    newAnimal = arr[i];
    $(".new-animal").html(newAnimal.name);
    $(".first").hide();
    $(".second").show();

    // Getting next random animal image + setting html
    var html = "<img src='";
    html += newAnimal.src;
    html += "' class='icon'>";
    $(".new-animal-img").html(html);

};

// Hint to catch last animal
// If user has every species apart from 1
// and doesn't have a panda and has clicked 
// release 5 times then show hint

function hint(userAnimals) {
    var names = [];

    // For each animal in userAnimals array, add to list of names
    $.each(userAnimals, function (index, animal) {
        var animalName = animal.name;
        names.push(animalName);

    });

    if ($.inArray(names, "Giant Panda") && clicks === 4) {
        alert("Having trouble catching that last animal? Hint: It only eats lettuce.");
    }

}

function setUpButtons() {

    var baitButton = $(".bait");
    var secondButton = $(".second .button");
    var thirdButtonOne = $(".third .one");
    var thirdButtonTwo = $(".third .two");
    var fourthButton = $(".fourth .button");
    var fifthButton = $(".fifth .button");
    var tooMany = $(".sixth");

    //"Release" button
    var releaseButton = $(".release");

    // Choose bait
    baitButton.click(function () {
        var baitType = $(this).data("bait");
        bait(weightedAnimals[baitType]);
    });


    // "Wait" button
    secondButton.click(function () {
        $(".second").hide();
        $(".third").show();
    });

    // "Catch it!" button
    thirdButtonOne.click(function () {

        // Adding new animal to userAnimals array
        userAnimals.push(newAnimal);

        $(".third").hide();
        $(".fourth").show();

        updateAnimals();

        // end "Catch it" function
    });


    // "Let it go" button
    thirdButtonTwo.click(function () {
        $(".third").hide();
        $(".fifth").show();

        // Shows hint after pressing 'let it go' 5 times (clicks === 5)

        if (userSpecies === oneLeft) {

            clicks++;
            hint(userAnimals);
        }

    });


    // Caught message, try again button
    fourthButton.click(function () {
        $(".fourth").hide();
        // Too many message, no button
        // Check if user has caught maximum
        if (userTotal >= maximum) {
            maximumReached = true;
            $(".sixth").show();
        } else {
            $(".first").show();
        }
    });

    // Let go message, try again button
    fifthButton.click(function () {
        $(".fifth").hide();
        $(".first").show();
    });

}

//Shows description on hover
function showDescrip(index) {
    
    if ( $(window).width() > 820) {  

    // Select list item
    var descripContainer = ".description-container-"+index;
    descripContainer = String(descripContainer);
    
    var listItem = "#animal-"+index;
    listItem = String(listItem); 
    
  $(descripContainer).css("display", "inline-block");
  
}
    
}

function hideDescrip(index) {
    // Select list item
    var descripContainer = ".description-container-"+index;
    descripContainer = String(descripContainer);
    
    var listItem = "#animal-"+index;
    listItem = String(listItem);
    
    $(descripContainer).hide();

}

// if user clicks release button
function releaseAnimal(index) {
    if (removedAnimals.index >= 0) {
        //check if current released animals index comes before or after
        //the previously released animal, if index is higher then reduce by 1
        if (removedAnimals.index < index) {
            index--;
        }
        
    }
   
    updateAnimals();
    // Pushing animal from userAnimals into removedAnimals array
    removedAnimals.animal = userAnimals[index];
    removedAnimals.index = index;

    userAnimals.splice(index, 1);
    updateUserTotals();

    // Gets the list item to change it's inner html to undo button
    var animalListItem = $('#animal-' + index);
    // don't call 'updateAnimals' at this point because we don't
    // want to remove the list item because need undo button to be there

    // Create undo button
    var html = "";
    html += '<img src="';
    html += removedAnimals.animal.src;
    html += '" class="icon-deactivated" alt="';
    html += removedAnimals.animal.description;
    html += '"/>'
    html += removedAnimals.animal.name;
    html += "<a class='button undo' onclick='undoRelease()'>Undo</button>";

    //updating the animal in the list item to the undo button
    animalListItem.html(html);

    // if user has caught too many then releases one, update html
    // if user has less than the maximum and has previously reached the maximum
    if (userTotal < maximum && maximumReached) {
        $(".sixth").hide();
        $(".first").show();
        maximumReached = false;
    }

};


// if user clicks undo button
function undoRelease() {
    userAnimals.splice(removedAnimals.index, 0, removedAnimals.animal);
    // Sets releasedAnimal to -1 because we haven't just clicked release
    removedAnimals.index = -1;
    updateAnimals();
}




function updateUserTotals() {
    // Update length + html with new animal
    userTotal = userAnimals.length;
    $(".user-total").html(userTotal);

    // Update user species total
    userSpecies = unique(userAnimals).length;
    $(".species").html(userSpecies);
    if (userSpecies === totalAnimals) {
        alert("Congratulations, you caught every species needed for the reserve!")
    };
};

// Gets called when regenerate user animals list
// user: catches a new animal, undoes a release, or releases two or more animals
function updateAnimals() {
    // Set back to -1 because we haven't just clicked release
     removedAnimals.index = -1;
    // Update user total + species total and html
    updateUserTotals();

    // Add animal from userAnimal array to list in html
    // Using single quotes so animal descriptions don't escape strings
    var html = '<ol>';
    $.each(userAnimals, function (index, animal) {
        html += '<li id="animal-';
        html += index;
        html += '">';
        html += '<div class="animal-container" onmouseover="showDescrip(';
        html += index;
        html += ')" onmouseout="hideDescrip(';
        html += index;
        html += ')">';
        html += '<img src="';
        html += animal.src;
        html += '" class="icon" alt="';
        html += animal.description;
        html += '"/>';
        html += animal.name;
        html += '<a class="button release" onclick="releaseAnimal(';
        html += index;
        html += ')">Release</a>';
        html += '</div>';
        html += "<div class='description-container-";
        html +=  index;
        html += "'><p>"
        html += animal.description;
        html += "</p></div>";
        html += '</li>';
        
    });


    html += "</ol>";
    $(".animals-list").html(html);

};


//Function that takes an array and adds elements to uniqueElements array
//if they aren't aleady in there then returns the array (strips out duplicate
//elements)
function unique(arr) {
    var uniqueElements = [];

    $.each(arr, function (index, element) {
        //if element in arr is not in uniqueElements (returns -1) 
        //then add it
        if ($.inArray(element, uniqueElements) === -1) {
            uniqueElements.push(element);
        }

    });

    return uniqueElements;
};





//Show animal description on hover
//
/*function tooltipShow(index) {
    var description = userAnimals[index].description;
    description.show();
}

function tooltipHide(index) {
    userAnimals[index].description.hide();
}*/