//constructor for key destinations
var keyPlace = function(data) {
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.streetAddress);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
}; // end keyPlace function

var viewModel = function() {
  var self = this;
  self.placelist = ko.observableArray([]);
  //pushes each place to the array
  model.keyPlaces.forEach(function(placeItem) {
    self.placelist.push(new keyPlace(placeItem));
  });

  self.removeMarker = function(clickedPlace) {
    mapView.hideMarker(clickedPlace);
  };

};



ko.applyBindings(new viewModel());
