//constructor for key destinations
var keyPlace = function(data) {
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.streetAddress);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
  this.map = ko.observable(data.map);
}; // end keyPlace function

var viewModel = function() {
  var self = this;
  self.placelist = ko.observableArray([]);
  //pushes each place to the array
  model.keyPlaces.forEach(function(placeItem) {
    self.placelist.push(new keyPlace(placeItem));
  });


  function create_map() {
    var mapOptions = {
      center: { lat: 38.869987, lng: -77.090936},
      zoom: 13
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var places = ko.toJS(self.placelist);
    var markers = []
   for (i = 0; i < places.length; i++) {
    var myLatLng = new google.maps.LatLng(places[i].lat, places[i].lng);
    if (places[i].map == true) {
    var  mapToggle = map;
    } else {
      mapToggle = null;
    };
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: mapToggle,
        title: places[i].name
      });
  };
};

function RenderMarker() {
  var map;
  var places = ko.toJS(self.placelist);
  var markers = [];
  for (i = 0; i < places.length; i++) {
   var myLatLng = new google.maps.LatLng(places[i].lat, places[i].lng);
   if (places[i].map == true) {
   var  mapToggle = map;
   } else {
     mapToggle = null;
   };
   var marker = new google.maps.Marker({
       position: myLatLng,
       map: mapToggle,
       title: places[i].name
     });
 };
 }
  self.google_map = create_map();

  self.hideMarker = function(clickedPlace) {
    clickedPlace.map = false;
    create_map();
  };
};

ko.applyBindings(new viewModel());
google.maps.event.addDomListener(window, 'load', viewModel.google_map);
