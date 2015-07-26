var viewModel = function(){
	var self = this;
	var map, infowindow;
	var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=Washington,DC&units=imperial&APPID=115dcc40d88f4cbcdbb3bdcac6d6d62e';

	self.markers = ko.observableArray();
	self.searchTerm = ko.observable("");
	self.selectedMarker = ko.observable();
	self.previousMarker = ko.observable(self.markers()[0]); //set an initial previous marker to stop the app from breaking.

	// Filters self.markers based oninput from the search window.
	self.filteredMarkers = ko.computed(function() {
		var filter = self.searchTerm().toLowerCase();
		if (!filter) {
			return self.markers();
		} else {
			return ko.utils.arrayFilter(self.markers(), function(item){
				return item.title.toLowerCase().indexOf(filter) !== -1
			});
		}
	}, self);

	// sets marker.map to null for all markers not in filteredMarkers
	self.filteredMarkers.subscribe(function() {
		var differences = ko.utils.compareArrays(self.markers(), self.filteredMarkers());
		ko.utils.arrayForEach(differences, function(marker){
			if (marker.status === 'deleted') {
				marker.value.setMap(null);
			} else {
				marker.value.setMap(map);
			}
		});
	});

	// allows knockout to change the highlighted place in the list view in response to a clicked marker on the map.
	self.clickMarker = function(marker) {
		if (self.selectedMarker()) {
			self.previousMarker(self.selectedMarker())
		}
		self.selectedMarker(marker);
	};

	// trigger the marker click event when you click on a place in the list view. Also switches the highlights
	self.selectMarker = function(marker){
		self.clickMarker(marker);
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

//Initializes the google map
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
			var yelpRequestURL = "https://api.yelp.com/phone_search?phone=" + places[i].phone + "&ywsid=W6XJfNlcVjV2XJhDqYdgWA";

			// variables for Yelp data
			var yDisplayPhone, yAddress, yRating, yRatingImg, yURL;

			//pulls yelp data
			$.getJSON(yelpRequestURL, function(data) {
				yDisplayPhone = data.display_phone;
				yAddress = data.location.address[0];
				yRating = data.rating;
				yRatingImg = data.rating_img_url_small;
				yURL = "http://yelp.com/biz/" + data.id;
			});




			var marker = new google.maps.Marker({
				position: latLng,
				title: places[i].name,
				map: map,
				phone: yDisplayPhone,
				address: yAddress,
				reviewURL: yURL,
				rating: yRating,
				ratingImg: yRatingImg,
				highlight: places[i].highlight
			});

			// listener for opening the infowindow
			google.maps.event.addListener(marker,'click', function() {
				var clickedMarker = this;
				var contentString = "<h4>" + clickedMarker.title + "</h4> <p><a href='" + clickedMarker.reviewURL + ">Yelp Rating:</a>  <img src='" + clickedMarker.ratingImg + "' alt='rating" + clickedMarker.rating + "'><br>Phone: " + clickedMarker.phone +" <br>" + clickedMarker.address + "</p>";
				self.clickMarker(clickedMarker);
				infowindow.setContent(contentString);
				infowindow.open(map, clickedMarker);
			});

			//removes highlight when you close the info window on the map
			google.maps.event.addListener(infowindow, 'closeclick', function() {
				 self.selectedMarker().highlight(false);
			 });

			self.markers.push(marker);
		} // end marker For loop
	}(); //end drawMap

	//weather observables
	self.currentTemp = ko.observable();
	self.currentCondition = ko.observable();
	self.currentIcon = ko.observable();
	//pulls the icon representing the current weather from the openweathermap
	self.currentIconURL = ko.computed(function() {
		return "http://openweathermap.org/img/w/" + self.currentIcon()  + ".png";
	}, this);
	//pulls data need from openweathermap to display the current temp and icon representing the current conditions. the description of current conditions is used as alt text for the icon.
	$.getJSON(weatherURL, function(data){
		self.currentTemp(data.main.temp);			self.currentCondition(data.weather[0].description);			self.currentIcon(data.weather[0].icon);
	});

}; //end viewModel

ko.applyBindings(new viewModel());
