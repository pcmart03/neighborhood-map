var viewModel = function(){
	var self = this;
	var map, infowindow;

	self.markers = ko.observableArray();
	self.searchTerm = ko.observable();

	self.selectMarker = function(marker){
		google.maps.event.trigger(marker, 'click');
	};

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
			//setInfo(marker, i);
			google.maps.event.addListener(marker,'click', function() {
				var clickedMarker = this;
				clearHighlights();
				infowindow.setContent("<h2>" + clickedMarker.title + "</h2>");
				infowindow.open(map, clickedMarker);
				clickedMarker.highlight(true);
			});
			google.maps.event.addListener(infowindow, 'closeclick', function() {
				 clearHighlights();
			 });

			self.markers.push(marker);
		}
	}();

	function clearHighlights() {
		for (i=0; i < self.markers().length; i++) {
			self.markers()[i].highlight(false);
		}
	}; //end clearHighlights
}; //end viewModel

ko.applyBindings(new viewModel());
