var viewModel = function(){
	var self = this;
  // Gets map objects from model
  var places = model.keyPlaces;
	var map, infowindow;
  self.yelpObjects = ko.observableArray();

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

  //function for formatting phone numbers. Adapted code form http://jsfiddle.net/kaleb/Dm4Jv/
  var formatPhone = function(obj) {
    var numbers = obj.replace(/\D/g, ''),
        char = {0:'(',3:') ',6:' - '};
    var phone = '';
    for (var i = 0; i < numbers.length; i++) {
        phone += (char[i]||'') + numbers[i];
    }
    return phone;
  };
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

		//iterates through array and creates markers
		for (var i = 0; i < places.length; i++) {
			var latLng = new google.maps.LatLng(places[i].lat, places[i].lng)

      //var yelpLocation = yelpObject.businesses[0]
      //var ratingImg = yelpLocation.img

      var marker = new google.maps.Marker({
				position: latLng,
				title: places[i].name,
				map: map,
				phone: places[i].phone,
				highlight: places[i].highlight
			});

			// listener for opening the infowindow
			google.maps.event.addListener(marker,'click', function() {
				var clickedMarker = this;
        infowindow.setContent(" ");
        var yelpRequestURL = "http://api.yelp.com/phone_search?phone=" + clickedMarker.phone + "&ywsid=W6XJfNlcVjV2XJhDqYdgWA";

        //creates a fail condition for yelp ajax request.
        var yelpRequestFail = setTimeout(function(){
          infowindow.setContent("Yelp Information failed to load");
        }, 8000);

        //requests yelp data from yelp api and builds the contentString.
        $.ajax({
          url: yelpRequestURL,
          dataType: "jsonp",
          success: function( response ) {
            var data = response.businesses[0];
            var formattedPhone = formatPhone(data.phone)
            var contentString = "<h4>" + data.name + "</h4>" +
            "<p>" + "<a href='"+ data.url + "'>" + "Yelp Rating: " + "<img src='" + data.rating_img_url_small + "' alt='" + data.avg_rating + "'>" + "</a>" + "<br>" + "Phone: " + formattedPhone  + "<br>" + data.address1 + "</p>";
            infowindow.setContent(contentString);
            clearTimeout(yelpRequestFail);
          }
        });

        self.clickMarker(clickedMarker);
				map.panTo(clickedMarker.position)
				infowindow.open(map, clickedMarker);
			});

			//removes highlight when you close the info window on the map
			google.maps.event.addListener(infowindow, 'closeclick', function() {
				 self.selectedMarker().highlight(false);
				 map.panTo(latLng);
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
  var getWeather = function(){
      var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=Washington,DC&units=imperial&APPID=115dcc40d88f4cbcdbb3bdcac6d6d62e';
	   $.getJSON(weatherURL, function(data){
		  self.currentTemp(data.main.temp);
      self.currentCondition(data.weather[0].description);
      self.currentIcon(data.weather[0].icon);
	   })
     .fail(function( jqxhr) {
      alert("Weather information has failed to load");
    });
  }();
  console.log(self.yelpObjects);
}; //end viewModel

ko.applyBindings(new viewModel());
