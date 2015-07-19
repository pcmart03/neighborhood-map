//constructor for key destinations
var keyPlace = function(data) {
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.streetAddress);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.long);
  this.placeLatLng = ko.pureComputed(function() {
    return "new google.maps.LatLng("+ this.lat + "," + this.lng + ")";
  }, this);
}; // end keyPlace function

var viewModel = function() {
var self = this;
self.placelist = ko.observableArray([])

//pushes each place to the array
keyPlaces.forEach(function(placeItem) {
  self.placelist.push(new keyPlace(placeItem));
});


};

ko.applyBindings(new viewModel());
