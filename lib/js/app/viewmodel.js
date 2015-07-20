//constructor for key destinations
var keyPlace = function(data) {
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.streetAddress);
  this.latlng = ko.observable(data.latlng);
}; // end keyPlace function
var MapMarker = function(data) {
  this.position = ko.observable(data.latlng);
  this.title = ko.observable(data.name);
}
var viewModel = function() {
  var self = this;
  self.placelist = ko.observableArray([]);
  //pushes each place to the array
  keyPlaces.forEach(function(placeItem) {
    self.placelist.push(new keyPlace(placeItem));
  });
};

ko.applyBindings(new viewModel());
