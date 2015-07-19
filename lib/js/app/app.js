var keyPlaces = [
  {
    name: "Jaleo",
    streetAddress: "2250 Crystal Drive",
    lat: 38.853636,
    lng: -77.049553,
    keywords: ['tapas','restaurant','spanish','date night','wine']
  },
  {
    name: "Extreme Pizza",
    streetAddress: "1419 S Fern St",
    lat: 38.860028,
    lng: -77.056056,
    keywords: ["pizza","beer"]
  },
  {
    name: "RedRocks Arlington",
    streetAddress: "901 S Barton St",
    lat: 38.894017,
    lng: -77.084009,
    keywords: ["pizza","beer","brunch"]
  },
  {
    name: "Giant",
    streetAddress: "3450 Washington Blvd",
    lat: 38.885886,
    lng: -77.103031,
    keywords: ["grocery store", "pharmacy"]
  },
];

var keyPlace = function(data) {
  this.name = ko.observable(data.name)
  this.address = ko.observable(data.streetAddress)
}
