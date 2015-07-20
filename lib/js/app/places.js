var keyPlaces = [
  {
    name: "Jaleo",
    streetAddress: "2250 Crystal Drive",
    keywords: ['tapas','restaurant','spanish','date night','wine'],
    position: new google.maps.LatLng(38.853636, -77.049553)
  },
  {
    name: "Extreme Pizza",
    streetAddress: "1419 S Fern St",
    keywords: ["pizza","beer"],
    position: new google.maps.LatLng(38.860028, -77.056056)
  },
  {
    name: "RedRocks Arlington",
    streetAddress: "901 S Barton St",
    keywords: ["pizza","beer","brunch"],
    position: new google.maps.LatLng(38.864033, -77.084282)
  },
  {
    name: "Giant",
    streetAddress: "3450 Washington Blvd",
    keywords: ["grocery store", "pharmacy"],
    position: new google.maps.LatLng(38.885886, -77.103031)
  },
];

var controller = {
  getplaces: function() {
    return keyPlaces;
  }
};
