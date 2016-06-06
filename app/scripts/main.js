/* Get a random latitude and longitude somewhere in the United States */
function randLatLon() {
  var latRange = [18.005611, 48.987386];
  var lonRange = [-124.626080, -62.361014];
  var randLat  = Math.random() * (latRange[1] - latRange[0]) + latRange[0];
  var randLon  = Math.random() * (lonRange[1] - lonRange[0]) + lonRange[0];
  return [randLat, randLon];
}

/* Call random lat/lon function and create URI to call API */
function getUri() {
  var latLon = randLatLon();
  var baseUri = "http://pinballmap.com/api/v1/locations/closest_by_lat_lon.json";
  var params = "?lat="+latLon[0]+"&lon="+latLon[1]+"&max_distance=3000";
  var uri = baseUri + params;
  return uri;
}

var xhr;

/* Make call to pinballmap API */
function callApi() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', getUri(), true);
  xhr.responseType = "json";
  xhr.send();
  xhr.addEventListener("readystatechange", processRequest, false);
}

/* Process request */
function processRequest() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var location = xhr.response.location;
    var machineNames = location.machine_names;
    if (machineNames.length > 0) {
      document.getElementById('location-name').innerHTML = location.name;
      document.getElementById('location-city').innerHTML = location.city + ", " + location.state;
      document.getElementById('machine-count').innerHTML = machineNames.length + " machines";
      for (var i = 0; i < machineNames.length; i++) {
        var ul = document.getElementById('machine-list');
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(machineNames[i]));
        li.setAttribute('id', 'machine');
        ul.appendChild(li);
      }
      document.getElementById('location').setAttribute("style", "visibility:visible;");
    } else {
      callApi();
    }
  }
}

callApi();
