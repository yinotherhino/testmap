// const options = {
// 	enableHighAccuracy: true,
// 	timeout: 5000,
// 	maximumAge: 0,
// };

// const error= (err) => {
// 	alert('Error fetching location');
// 	console.log(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options)

// function success(pos) {
//   console.log(pos.coords)
// 	const crd = pos.coords;

//   function initMap() {
//   const directionsService = new google.maps.DirectionsService();
//   const directionsRenderer = new google.maps.DirectionsRenderer();
//   const map = new google.maps.Map(
//     document.getElementById("map") ,
//     {
//       zoom: 7,
//       center: { lat: crd.latitude, lng: crd.longitude },
//     }
//   );

//   directionsRenderer.setMap(map);

//   const onChangeHandler = function () {
//     calculateAndDisplayRoute(directionsService, directionsRenderer);
//   };

//   (document.getElementById("start") ).addEventListener(
//     "change",
//     onChangeHandler
//   );
//   (document.getElementById("end") ).addEventListener(
//     "change",
//     onChangeHandler
//   );
//   }

//   function calculateAndDisplayRoute(
//   directionsService,
//   directionsRenderer
//   ) {
//   directionsService
//     .route({
//       origin: {
//         query: (document.getElementById("start") ).value,
//       },
//       destination: {
//         query: (document.getElementById("end") ).value,
//       },
//       travelMode: google.maps.TravelMode.DRIVING,
//     })
//     .then((response) => {
//       directionsRenderer.setDirections(response);
//     })
//     .catch((e) => window.alert("Directions request failed due to " + status));
//   }

//   window.addEventListener("load", docReady);

//   function docReady() {
//   initMap();
//   }

// }
// export {};



const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function success(pos) {
	const crd = pos.coords;

	// Document.getElementById('details').innerHTML = `Latitude : ${crd.latitude} <br/>
	// Longitude: ${crd.longitude}<br/>
	// ${crd.accuracy} meters accuracy.
	// `;
	console.log(crd.longitude)
	console.log(crd.latitude);
	// Console.log('Your current position is:');
	// console.log(`Latitude : ${crd.latitude}`);
	// console.log(`Longitude: ${crd.longitude}`);
	// console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
	document.getElementById('locationError').innerHTML = 'Error fetching location';
	console.warn(`ERROR(${err.code}): ${err.message}`);
}
// window.addEventListener('load', 
navigator.geolocation.getCurrentPosition(success, error, options)
// )