
var map;
var markers =[];
//draw map on page
var initialize = function() {
  var mapOptions = {
    center: { lat: 38.869987, lng: -77.090936},
    zoom: 13
  };

  mapView.map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
};
//Pin constructor
var Pin = function(place) {
  var marker;
    this.title = ko.observable(place.name);
    this.lat = ko.observable(place.lat);
    this.lng = ko.observable(place.lng);
    this.address = ko.observable(place.streetAddress);
    this.showMarker = ko.observable(true);

  var latLng = new google.maps.LatLng(place.lat, place.lng);
    marker = new google.maps.Marker({
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
      marker.push(makers);
  });
};

google.maps.event.addDomListener(window, 'load', mapView.initialize);
