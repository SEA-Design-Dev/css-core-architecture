
var myCenter=new google.maps.LatLng(47.6235481,-122.336212);
var marker;

function initialize(){
  var mapProp = {
  center:myCenter,
  zoom:18,
  mapTypeId:google.maps.MapTypeId.TERRAIN
  };
  var map=new google.maps.Map(document.getElementById("googleMap")
  ,mapProp);
  var marker=new google.maps.Marker({
  position:myCenter,
  animation:google.maps.Animation.BOUNCE
  });

  marker.setMap(map);

  var infowindow = new google.maps.InfoWindow({
  content:"SLU Farmer's Market"
  });

  google.maps.event.addListener(marker, 'click', function(){
    infowindow.open(map,marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
