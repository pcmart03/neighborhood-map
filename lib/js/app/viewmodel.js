var map;
var markers = [];
var center;
//draw map on page
var initialize = function() {
  var mapOptions = {
    center: { lat: 38.869987, lng: -77.090936},
    zoom: 13
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

};
//Pin constructor
var Pin = function(place) {
  this.name = ko.observable(name);
  this.showMarker = ko.observable(false);
  var latLng = new google.maps.LatLng(place.lat, place.lng);
  var  marker = new google.maps.Marker({
      position: latLng,
      title: place.name
      });
    //checks showMarker value to hide and reveal marker. This will allow the knockout to hide the markers based on the filter function
  this.showMarker.subscribe(function(newValue) {
      if (newValue) {
        marker.setMap(map);
      } else {
        marker.setMap(null);
      }
  });
  this.showMarker(true);
  markers.push(marker);
};
// Draws Pins on map
var pinMap = function(){
  places = model.keyPlaces;
  for(i=0; i < places.length; i++) {
    new Pin(places[i]);
  }
  };

  function calculateCenter() {
    center = map.getCenter();
  }


var viewModel = function() {
  var self = this;
  self.pins = ko.observableArray();

};

ko.applyBindings(new viewModel());
google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, 'load', pinMap);
google.maps.event.addDomListener(map, 'idle', function() {
  calculateCenter();
});
google.maps.event.addDomListener(window, 'resize', function() {
  map.setCenter(center);
});
