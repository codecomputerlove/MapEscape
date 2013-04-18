function initialize() {
	var myLatLong = new google.maps.LatLng(53.479861,-2.229677);
	var mapOptions = {
  	center: myLatLong,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("Map"), mapOptions);
  var marker = new google.maps.Marker({
      position: myLatLong,
      map: map
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

//https://maps.google.co.uk/maps?q=Code+Computerlove+Digital+Agency,+Jutland+Street,+Manchester&hl=en&sll=53.506508,-2.320072&sspn=0.855118,1.307373&oq=code+c&hq=Code+Computerlove+Digital+Agency,&hnear=Jutland+St,+Manchester+M1,+United+Kingdom&t=m&z=17