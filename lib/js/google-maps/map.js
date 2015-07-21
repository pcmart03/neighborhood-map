function initialize() {
        var mapOptions = {
          center: { lat: 38.869987, lng: -77.090936},
          zoom: 13
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);


        var places = controller.getplaces();

        /*for (i = 0; i < places.length; i++) {
          var marker = new google.maps.Marker({
            position: places[i].position,
            title: places[i].name
          });
          marker.setMap(map);
        } */
        console.log(places);
      };

      google.maps.event.addDomListener(window, 'load', initialize);
