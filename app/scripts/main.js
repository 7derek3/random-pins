/* Get a random latitude and longitude somewhere in the United States */
function randLatLon() {
  var latRange = [18.005611, 48.987386];
  var lonRange = [-124.626080, -62.361014];
  var randLat  = Math.random() * (latRange[1] - latRange[0]) + latRange[0];
  var randLon  = Math.random() * (lonRange[1] - lonRange[0]) + lonRange[0];
  return [randLat, randLon];
}

/* Call random lat/lon function and create URI to call API */
var latLon = randLatLon();
var baseUri = "http://pinballmap.com/api/v1/locations/closest_by_lat_lon.json";
var params = "?lat="+latLon[0]+"&lon="+latLon[1]+"&max_distance=3000";
var uri = baseUri + params;

/* */
var xhr = new XMLHttpRequest();
xhr.open('GET', uri, true);
xhr.responseType = "json";
xhr.send();
xhr.addEventListener("readystatechange", processRequest, false);

function processRequest() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = xhr.response;
    console.log(response);
  }
}
