 function initMap() {


     var palace = {
         lat: -38.012697,
         lng: 175.326889
     };
     var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 16,
         center: palace
     });

     var icon = 'img/marker.png';

     var marker = new google.maps.Marker({
         position: palace,
         map: map,
         icon: icon
     });


 }
