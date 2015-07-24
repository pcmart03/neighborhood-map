var viewModel = function(){
	var self = this;
	var map, infowindow;
	
	self.markers = ko.observableArray();
	
	var drawMap = function() {
		var mapOptions = {
		center: { lat: 38.869987, lng: -77.090936},
		zoom: 13
		};

		map = new google.maps.Map(document.	getElementById('map-canvas'),mapOptions);
		// Gets map objects from model
		var places = model.keyPlaces;
		
		//iterates through array and creates markers
		for (var i = 0; i < places.length; i++) {
			var latLng = new google.maps.LatLng(places[i].lat, places[i].lng)
		
			var marker = new google.maps.Marker({
				position: latLng,
				title: places[i].name,
				map: map,			
			});
			setInfo(marker, i);
		}
		
		function setInfo(marker, num) {
			var infowindow = new google.maps.InfoWindow({
				content: places[num].name
			});
			
			google.maps.event.addListener(marker,'click', function() { 
				infowindow.open(marker.get('map'), marker)
			});
		};
	}();
};

ko.applyBindings(new viewModel());
