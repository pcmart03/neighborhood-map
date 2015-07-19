function initialize() {
        var mapOptions = {
          center: { lat: 38.869987, lng: -77.090936},
          zoom: 13
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
      };

      google.maps.event.addDomListener(window, 'load', initialize);
