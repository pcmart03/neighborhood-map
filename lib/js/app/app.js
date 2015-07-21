var model = {
  keyPlaces: [
  {
    name: "Jaleo",
    streetAddress: "2250 Crystal Drive",
    keywords: ['tapas','restaurant','spanish','date night','wine'],
    lat: 38.853636,
    lng: -77.049553,
    mapToggle: true
  },
  {
    name: "Extreme Pizza",
    streetAddress: "1419 S Fern St",
    keywords: ["pizza","beer"],
    lat: 38.860028,
    lng: -77.056056,
    mapToggle: true
  },
  {
    name: "RedRocks Arlington",
    streetAddress: "901 S Barton St",
    keywords: ["pizza","beer","brunch"],
    lat: 38.864033,
    lng: -77.084282,
    mapToggle: true
  },
  {
    name: "Giant",
    streetAddress: "3450 Washington Blvd",
    keywords: ["grocery store", "pharmacy"],
    lat: 38.885886,
    lng: -77.103031,
    mapToggle: true
  },
],
getPlaces: function() {
  return this.keyPlaces
}
};

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
