// code for gmaps API
var map;

function initMap() {
    // set intial zoom to zoomed in
    var mapOptions = {
        zoom: 6
    }

    // initial position for map
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

// location object
var ipLocation = {
    "IP Address": null,
    "Domain": null,
    "Country Name": null,
    "Country Code": null,
    "City": null,
    "Region Name": null,
    "Time Zone": null,
    "Latitude": null,
    "Longitude": null
};

function buildHTML() {
    // build the html
    var output = "";

    output += "<h4>" + Object.keys(ipLocation)[0] + ":" + "</h4>";
    output += "<span>" + ipLocation["IP Address"] + "</span>";

    output += "<h4>" + Object.keys(ipLocation)[1] + ":" + "</h4>";
    // only output the domain name if it exists
    if (ipLocation["Domain"] == null) {
        output += "<span>Domain name not available</span>";
    } else {
        output += "<span>" + ipLocation["Domain"] + "</span>";
    }

    output += "<h4>" + Object.keys(ipLocation)[2] + ":" + "</h4>";
    output += "<span>" + ipLocation["Country Name"] + "</span>";

    output += "<h4>" + Object.keys(ipLocation)[3] + ":" + "</h4>";
    output += "<span>" + ipLocation["Country Code"] + "</span>";

    output += "<h4>" + Object.keys(ipLocation)[4] + ":" + "</h4>";
    output += "<span>" + ipLocation["City"] + "</span>";

    output += "<h4>" + Object.keys(ipLocation)[5] + ":" + "</h4>";
    output += "<span>" + ipLocation["Region Name"] + "</span>";

    output += "<h4>" + Object.keys(ipLocation)[6] + ":" + "</h4>";
    output += "<span>" + ipLocation["Time Zone"] + "</span>";

    output += "<h4>" + Object.keys(ipLocation)[7] + ":" + "</h4>";
    output += "<span>" + ipLocation["Latitude"] + "</span>";

    output += "<h4>" + Object.keys(ipLocation)[8] + ":" + "</h4>";
    output += "<span>" + ipLocation["Longitude"] + "</span>";

    // get the container for the output
    var detailsContainer = document.getElementById("details-container");

    // set it's innerHTML to the output string
    detailsContainer.innerHTML = output;

}

var root = 'https://freegeoip.net/json/';

// get the input field
var inputField = document.getElementById('ip-address');

// prevent page from refreshing when form is submitted
function preventRefresh() {
    inputField.addEventListener('keypress', function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });
}

// search function
function search() {
    // get the what is typed into the search box
    var usersearch = inputField.value;
    // make the AJAX request, pass in URL and callback function
    loadDoc(root + usersearch, getValues);
    preventRefresh();
}

// get vistor's IP right away 
window.onload = search();

// search when enter is pressed
inputField.onkeydown = function (e) {
    if (e.keyCode == 13) {
        search();
    }
};

// get search button
var searchBtn = document.getElementById("search");

// search when button is clicked
searchBtn.addEventListener('click', search);


/* =========
AJAX Request 
=========== */

function loadDoc(url, cFunction) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

// callback function
function getValues(xhttp) {
    var data = JSON.parse(xhttp.responseText);
    console.log(data);
    var output = "";

    // replace current location object with values from data object
    ipLocation["IP Address"] = data.ip;
    ipLocation["Domain"] = data.domain;
    ipLocation["Country Name"] = data.country_name;
    ipLocation["Country Code"] = data.country_code;
    ipLocation["City"] = data.city;
    ipLocation["Region Name"] = data.region_name;
    ipLocation["Time Zone"] = data.time_zone;
    ipLocation["Latitude"] = data.latitude;
    ipLocation["Longitude"] = data.longitude;

    // add new lat and long to the locations array
    locations.push({
        lat: data.latitude,
        lng: data.longitude
    });


    // run new markers function
    addMarkers();

    // output the results to the page
    buildHTML();
}

// map pins array, will get added to everytime an ip lookup is performed
var locations = [];

// build markers function
// loops through locations array and retruns a new marker for each location object in the array
function addMarkers() {
    for (i = 0; i < locations.length; i++) {
        new google.maps.Marker({
            position: locations[i],
            map: map

        });

        // if the user has done a search and locations array is bigger than one then zoom out
        if (locations.length > 1) {
            map.setZoom(2);
        }

        if (locations.length > 1) {
            map.setCenter({
                lat: 0,
                lng: 0
            });
        } else {
            map.setCenter(locations[0]);
        }
    }
}



// clear the map function

document.getElementById("clear-map").addEventListener('mousedown', clearMap);

function clearMap() {
    // set locations to an empty array
    locations = [];

    for (i = 0; i < locations.length; i++) {
        locations[i].setMap(null);
    }
    // run add markers function
    addMarkers();
}
