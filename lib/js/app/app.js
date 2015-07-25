var model = {
  keyPlaces: [
  {
    name: "Jaleo",
    streetAddress: "2250 Crystal Drive",
    keywords: ['tapas','restaurant','spanish','date night','wine'],
    lat: 38.853636,
    lng: -77.049553,
    highlight: ko.observable(null)
  },
  {
    name: "Extreme Pizza",
    streetAddress: "1419 S Fern St",
    keywords: ["pizza","beer"],
    lat: 38.860028,
    lng: -77.056056,
    highlight: ko.observable(null)
  },
  {
    name: "RedRocks Arlington",
    streetAddress: "901 S Barton St",
    keywords: ["pizza","beer","brunch"],
    lat: 38.864033,
    lng: -77.084282,
    highlight: ko.observable(null)
  },
  {
    name: "Giant",
    streetAddress: "3450 Washington Blvd",
    keywords: ["grocery store", "pharmacy"],
    lat: 38.885886,
    lng: -77.103031,
    highlight: ko.observable(null)
  }
],
  getPlaces: function(){
    return model.keyPlaces;
  }
};

var viewModel = function(){
	var self = this;
	var map, infowindow;

	self.markers = ko.observableArray();
	self.searchTerm = ko.observable();
	self.selectedMarker = ko.observable();
	self.previousMarker = ko.observable(self.markers()[0]); //set an initial previous marker to stop the app from breaking.

	// This allows knockout to change the highlighted place in the list view in response to a clicked marker on the map.
	self.clickMarker = function(marker) {
		if (self.selectedMarker()) {
		self.previousMarker(self.selectedMarker())
		}
		self.selectedMarker(marker);
	};

	// trigger the marker click event when you click on a place in the list view. Also switches the highlights
	self.selectMarker = function(marker){
		if (self.selectedMarker()) {
		self.previousMarker(self.selectedMarker())
		}
		google.maps.event.trigger(marker, 'click');
		self.selectedMarker(marker);
	};

	// subscriptions set the hightlight.
	self.selectedMarker.subscribe(function() {
		self.selectedMarker().highlight(true);
	});
	self.previousMarker.subscribe(function() {
		self.previousMarker().highlight(false);
	})

	var drawMap = function() {
		var mapOptions = {
		center: { lat: 38.869987, lng: -77.090936},
		zoom: 13
		};

		map = new google.maps.Map(document.	getElementById('map-canvas'),mapOptions);
		infowindow = new google.maps.InfoWindow({
			 content: null
		 });

		// Gets map objects from model
		var places = model.keyPlaces;

		//iterates through array and creates markers
		for (var i = 0; i < places.length; i++) {
			var latLng = new google.maps.LatLng(places[i].lat, places[i].lng)

			var marker = new google.maps.Marker({
				position: latLng,
				title: places[i].name,
				map: map,
				highlight: places[i].highlight
			});
			// listener for opening the infowindow
			google.maps.event.addListener(marker,'click', function() {
				var clickedMarker = this;
				self.clickMarker(clickedMarker)
				infowindow.setContent("<h2>" + clickedMarker.title + "</h2>");
				infowindow.open(map, clickedMarker);
			});
			google.maps.event.addListener(infowindow, 'closeclick', function() {
				 self.selectedMarker().highlight(false);
			 });

			self.markers.push(marker);
		}
	}(); //end Create Map
}; //end viewModel

ko.applyBindings(new viewModel());
