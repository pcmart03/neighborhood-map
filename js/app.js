var keyPlaces = [
  {
    name: "Jaleo",
    streetAddress: "2250 Crystal Drive",
    lat: new google.maps.LatLng(38.853636, -77.049553),
    keywords: ['tapas','restaurant','spanish','date night','wine']
  },
  {
    name: "Extreme Pizza",
    streetAddress: "1419 S Fern St",
    latlng: new google.maps.LatLng(38.860028, -77.056056),
    keywords: ["pizza","beer"]
  },
  {
    name: "RedRocks Arlington",
    streetAddress: "901 S Barton St",
    latlng: new google.maps.LatLng(38.894017, -77.084009),
    keywords: ["pizza","beer","brunch"]
  },
  {
    name: "Giant",
    streetAddress: "3450 Washington Blvd",
    lat: new google.maps.LatLng(38.885886, -77.103031),
    keywords: ["grocery store", "pharmacy"]
  },
];

//constructor for key destinations
var keyPlace = function(data) {
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.streetAddress);
  this.latlng = ko.observable(data.latlng);
}; // end keyPlace function

var viewModel = function() {
var self = this;
self.placelist = ko.observableArray([])
self.mapMarkers = ko.observableArray([])
//pushes each place to the array
keyPlaces.forEach(function(placeItem) {
  self.placelist.push(new keyPlace(placeItem));
});
self.placelist.forEach(function(){
  var marker = new google.maps.Marker({
    position: self.placelist.latlng();
    map: intialize.map;
  });
  maker.setMap(intialize.map)
})

};

ko.applyBindings(new viewModel());
