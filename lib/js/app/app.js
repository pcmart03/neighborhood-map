var map = map;
var model = {
  keyPlaces: [
  {
    name: "Jaleo",
    streetAddress: "2250 Crystal Drive",
    keywords: ['tapas','restaurant','spanish','date night','wine'],
    lat: 38.853636,
    lng: -77.049553,
    map: true
  },
  {
    name: "Extreme Pizza",
    streetAddress: "1419 S Fern St",
    keywords: ["pizza","beer"],
    lat: 38.860028,
    lng: -77.056056,
    map: true
  },
  {
    name: "RedRocks Arlington",
    streetAddress: "901 S Barton St",
    keywords: ["pizza","beer","brunch"],
    lat: 38.864033,
    lng: -77.084282,
    map: true
  },
  {
    name: "Giant",
    streetAddress: "3450 Washington Blvd",
    keywords: ["grocery store", "pharmacy"],
    lat: 38.885886,
    lng: -77.103031,
    map: true
  },
]
};

var controller = {
  getPlaces: function() {
    return model.keyPlaces;
  }
};

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

   for (i = 0; i < places.length; i++) {
    var myLatLng = new google.maps.LatLng(places[i].lat, places[i].lng);
    var marker = new google.maps.Marker({
        position: myLatLng,
        title: places[i].name
      });
    if (places[i].map == true) {
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
    console.log(places[i].map);
  };
    console.log(places);
    console.log(places.length)
  };

  self.google_map = create_map();
};

ko.applyBindings(new viewModel());
google.maps.event.addDomListener(window, 'load', viewModel.google_map);
