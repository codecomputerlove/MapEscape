function initialize() {
	var mapOptions = {
  	center: new google.maps.LatLng(53.506508, -2.320072),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("Map"), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);