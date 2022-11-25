let latitude;
let longitude;

// fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg')
// .then(data=> data.json)
// .then(res => console.log(res))

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function success(pos) {
	const crd = pos.coords;
  longitude= 	crd.longitude
  latitude= crd.latitude
  let location= {latitude, longitude}

  initMap(latitude, longitude)
}

function error(err) {
	document.getElementById('locationError').innerHTML = 'Error fetching location';
}

navigator.geolocation.watchPosition(success, error, options)

  function initMap(lat= 41.85, lng= -87.65) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(
      document.getElementById("map") ,
      {
        zoom: 8,
        center: { lat, lng },
      }
    );

    const size = new google.maps.Size(42,68)

    const marker = new google.maps.Marker({
      position: {lat:latitude, lng:longitude},
      map: map,
      label: "user",
      icon: {
        url: "http://maps.google.com/mapfiles/kml/shapes/man.png",
        labelOrigin: new google.maps.Point(60, 30)
      },
      animation: google.maps.Animation.DROP
    });

    const driverMarker = new google.maps.Marker({
      position: {lat:latitude+ 0.02, lng:longitude+0.02},
      map: map,
      label: "driver",
      icon: {
        url: "http://maps.google.com/mapfiles/kml/shapes/cabs.png",
        labelOrigin: new google.maps.Point(100, 50)
      },
      animation: google.maps.Animation.DROP
    });

    const destinationMarker = new google.maps.Marker({
      position: {lat:latitude+ 0.01, lng:longitude+0.03},
      map: map,
      label: "destination",
      icon: {
        url: "http://maps.google.com/mapfiles/kml/shapes/flag.png"
      },
      animation: google.maps.Animation.DROP
    });
    const start = new google.maps.LatLng(latitude, longitude);
    const end = new google.maps.LatLng(latitude+0.02, longitude+0.02);

    var request = {
      origin: start,
      destination: end,
      // Note that JavaScript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode['DRIVING']
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      //travel time
      console.log(response.routes[0].legs[0].duration.value)
      directionsRenderer.setDirections(response);
    }
  });

    var bounds = new google.maps.LatLngBounds();
    bounds.extend(marker.getPosition());
    bounds.extend(driverMarker.getPosition());
    bounds.extend(destinationMarker.getPosition());
    map.fitBounds(bounds);
    directionsRenderer.setMap(map);
    
    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
    
    (document.getElementById("start") ).addEventListener(
      "change",
      onChangeHandler
    );
    (document.getElementById("end") ).addEventListener(
      "change",
      onChangeHandler
    );
  }
    
  // function calculateAndDisplayRoute(
  // directionsService,
  // directionsRenderer
  // ) {
  // directionsService
  //   .route({
  //     origin: {
  //       query: (document.getElementById("start") ).value,
  //     },
  //     destination: {
  //       query: (document.getElementById("end") ).value,
  //     },
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   })
  //   .then((response) => {
  //     directionsRenderer.setDirections(response);
  //   })
  //   .catch((e) => window.alert("Directions request failed due to " + status));
  // }


  