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
  var latLon  = randLatLon();
  var baseUri = "http://pinballmap.com/api/v1/locations/closest_by_lat_lon.json";
  var params  = "?lat="+latLon[0]+"&lon="+latLon[1]+"&max_distance=3000";
  var uri     = baseUri + params;
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

/* Process request and insert into HTML */
function processRequest() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var location      = xhr.response.location;
    var machineNames  = location.machine_names;
    var machineLength = machineNames.length;
    if (machineLength > 0) {
      document.getElementById('location-name').innerHTML = location.name;
      document.getElementById('location-city').innerHTML = location.city + ", " + location.state;
      var machineCount = machineLength + " machine";
      if (machineLength > 1) {
        machineCount += "s";
      }
      document.getElementById('machine-count').innerHTML = machineCount;
      for (var i = 0; i < machineLength; i++) {
        var ul = document.getElementById('machine-list');
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(machineNames[i]));
        li.setAttribute('id', 'machine');
        ul.appendChild(li);
      }
      document.getElementById('location').setAttribute("class", "show");
    } else {
      callApi();
    }
  }
}

callApi();
