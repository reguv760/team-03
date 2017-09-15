/* NO jQuery syntax */
var currentPosLat, currentPosLong;

var map;


function initMap()
{

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var currentTime = new Date().getHours();

  //check if map is between these times:::
  if ((currentTime >= 7) && (currentTime <= 19))///7am - 7pm:::
  {
    //daytime mode::
    map = new google.maps.Map(document.getElementById('map'), {
     zoom: 12,
     center: {lat: 34.1666809, lng: -118.3735587} //Ai NoHo coordinates
    });
  } else
  {
    //nighttime mode:::
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.1666809, lng: -118.3735587}, //Ai NoHo coordinates
      zoom: 12,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });



  }

  directionsDisplay.setMap(map);

  var infoWindow = new google.maps.InfoWindow({map: map});

  //geolocation:::
  if (navigator.geolocation)
  {
   navigator.geolocation.getCurrentPosition(function(position)
   {
     currentPosLat = position.coords.latitude;
     currentPosLong = position.coords.longitude;

     var pos = {
       lat: currentPosLat,
       lng: currentPosLong
     };

     infoWindow.setPosition(pos);
     infoWindow.setContent('Location found.');
     map.setCenter(pos);
   }, function() {
     handleLocationError(true, infoWindow, map.getCenter());
   });
  } else {
   // Browser doesn't support Geolocation
   handleLocationError(false, infoWindow, map.getCenter());
  }

  map.addListener('idle', function()
  {
   // loadingAnimation.style.visibility = "hidden";
   // loadingAnimation.style.display = "none";
  });

   //changeHandler for dropDowns:::
  var onChangeHandler = function()
  {
   calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  //eventListeners to DropDowns AFTER defining functins:::
  document.getElementById('start').addEventListener("change", onChangeHandler);
  document.getElementById('end').addEventListener("change", onChangeHandler);
}


function calculateAndDisplayRoute(directionsService, directionsDisplay)
{
  var selectedOrigin = document.getElementById("start").value;
  var selectedDest = document.getElementById("end").value;

  if (selectedOrigin === "currentLocation")
  {
  selectedOrigin = {lat: currentPosLat, lng: currentPosLong};
  }

  if (selectedDest === "currentLocation")
  {
   selectedDest = {lat: currentPosLat, lng: currentPosLong};
  }

  //display loading map animation:::
  // loadingAnimation.style.visibility = "visible";
  // loadingAnimation.style.display = "block";

  directionsService.route({
   origin: selectedOrigin,
   destination: selectedDest,
   travelMode: 'DRIVING'
   }, function(response, status) {
     if (status === 'OK') {
       directionsDisplay.setDirections(response);
     } else {
       window.alert('Directions request failed due to ' + status);
     }
   });

   //Distance calculator:::
   var origin = new google.maps.LatLng(selectedOrigin),
    destination = selectedDest,
    service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
  {
     origins: [selectedOrigin],
     destinations: [selectedDest],
     travelMode: google.maps.TravelMode.DRIVING,
     unitSystem: google.maps.UnitSystem.IMPERIAL,
     avoidHighways: false,
     avoidTolls: false
  }, callback );
}

function callback(response, status) {
  var myTotalDistance = document.getElementById("totalDistance");
  if(status=="OK") {
    myTotalDistance.innerHTML = response.rows[0].elements[0].distance.text;
    //console.log(myTotalDistance.value);
      // orig.value = response.destinationAddresses[0];
      // dest.value = response.originAddresses[0];
      // dist.value = response.rows[0].elements[0].distance.text;
  } else {
      alert("Error: " + status);
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
