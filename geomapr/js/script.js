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

// search function
function search() {
    // get the what is typed into the search box
    var usersearch = inputField.value;
    // make the AJAX request, pass in URL and callback function
    loadDoc(root + usersearch, getValues);
}

// get vistor's IP right away 
/*window.onload = search();*/

// search when enter is pressed
inputField.onkeydown = function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        search();
    }
};

// get search button
var searchBtn = document.getElementById("search");

// search when button is clicked
searchBtn.onclick = function (e) {
    e.preventDefault();
    search();
}


/*function createClusters() {
    markerCluster = new MarkerClusterer(map, markers, {
        imagePath: '../img/cluster/m'
    });
}*/


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

    // add new markers (if gmaps)
    if (isGmap) {
        addMarkers();
    }

    // add markers (if mapbox)
    if (isMapbox) {
        addMarkerLeaflet(locations[locations.length - 1].lat, locations[locations.length - 1].lng);
    }

    //run marker cluster function
    /* createClusters();*/

    // output the results to the page
    buildHTML();
}

// locations array containing co-ordinates, will get added to everytime an ip lookup is performed
var locations = [];

// markers array for gmaps
var gmarkers = [];

// markers array for mapbox
var mbmarkers = [];

var markerCluster;

// gmap build markers function
// loops through locations array and retruns a new marker for each location object in the array
function addMarkers() {

    var marker = new google.maps.Marker({
        position: locations[locations.length - 1],
        map: gmap
    });

    var contentString = inputField.value;

    if (contentString == "") {
        contentString = ipLocation["IP Address"];
    }
    // add an info window to the marker
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker.addListener('click', function () {
        infowindow.open(gmap, marker);
    });

    // push new marker to array
    gmarkers.push(marker);

    // if the user has done a search and locations array is bigger than one then zoom out
    if (locations.length > 1) {
        gmap.setZoom(2);
    }

    if (locations.length > 1) {
        gmap.setCenter({
            lat: 0,
            lng: 0
        });
    } else {
        gmap.setCenter(locations[0]);
    }

    // add a cluster
    /* markerCluster = new MarkerClusterer(map, markers, {
         imagePath: '../img/cluster/m'
     });*/
}

// mapboc add markers function
function addMarkerLeaflet(lat, lng) {
    var newMarker = L.marker([lat, lng]).addTo(mapLeaflet);
    mbmarkers.push(newMarker);
}

// mapbox builder markers function



// clear the map function

document.getElementById("clear-map").addEventListener('mousedown', clearMap);

function clearMap() {


    // gmaps - loop through markers array and remove from map
    if (isGmap) {
        for (i = 0; i < gmarkers.length; i++) {
            gmarkers[i].setMap(null);
        }
        // set markers to an empty array
        gmarkers = [];
    }

    // mapbox - clear markers
    if (isMapbox) {
        for (var i = 0; i < mbmarkers.length; i++) {
            mapLeaflet.removeLayer(mbmarkers[i]);
        }

        mbmarkers = [];
    }

    // set locations to an empty array
   /* locations = [];*/
}


// init gmap
var gmap;

function initMap() {
    // set intial zoom to zoomed in
    var mapOptions = {
        zoom: 2,
        center: {
            lat: 0,
            lng: 0
        }
    }

    // initial position for map
    gmap = new google.maps.Map(document.getElementById('gmap'), mapOptions);
}

// init mapbox
var mapLeafet;

function createMapbox() {
    L.mapbox.accessToken = 'pk.eyJ1Ijoia2F0YWsiLCJhIjoiY2o0Njc0ZGJuMHByNDMybzJnc2Z4NWVsaSJ9.UiTN4aKH6VFzKyGTBQBvCw';
    mapLeaflet = L.mapbox.map('mapbox', 'mapbox.light').setView([0, 0], 2);
    mapLeaflet.scrollWheelZoom.disable();
}

// create mapbox on page load + add marker for user location straight away
window.addEventListener("load", function () {
    createMapbox();
    search();
});



// toggle between maps, starting with mapbox on and gmaps off

var isGmap = false;
var isMapbox = true;

document.getElementById("change-map").addEventListener("click", function () {
    // get containing divs for maps
    var gmapContainer = document.getElementById("gmap");
    var mapboxContainer = document.getElementById("mapbox");

    // if google map already showing, load mapbox and update button to gmaps
    if (this.innerHTML == "Load Mapbox") {
        this.innerHTML = "Load Google Maps";
        gmapContainer.style.display = "none";
        mapboxContainer.style.display = "block";
        isGmap = false;
        isMapbox = true;

        // if map box already showing, load gmaps and update button to mapbox
    } else {
        this.innerHTML = "Load Mapbox";
        gmapContainer.style.display = "block";
        mapboxContainer.style.display = "none";
        isGmap = true;
        isMapbox = false;
    }

});
