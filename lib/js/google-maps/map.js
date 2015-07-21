
var mapView = {
  markers: [],

  map: "",

  initialize: function() {
    var mapOptions = {
      center: { lat: 38.869987, lng: -77.090936},
      zoom: 13
    };

    mapView.map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

    var places = model.getPlaces();

    for (i = 0; i < places.length; i++) {
      mapView.addMarker(places[i]);
      }
  },

  addMarker: function(place) {
    var latLng = new google.maps.LatLng(place.lat, place.lng);
    var marker = new google.maps.Marker({
      position: latLng,
      map: mapView.map,
      title: place.name
      });
    mapView.markers.push(marker);
  },

  hideMarker: function(place) {
    mapView.makers[place].setMap(null);
  }  
};

google.maps.event.addDomListener(window, 'load', mapView.initialize);
