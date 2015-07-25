var ViewModel = function(){
	var self = this;
	var map, infowindow;
	
	self.markers = ko.observableArray();
	
	var drawMap = function() {
		var mapOptions = {
    center: { lat: 38.869987, lng: -77.090936},
    zoom: 13
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
	}
};