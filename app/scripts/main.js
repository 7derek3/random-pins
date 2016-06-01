/* Get a random latitude and longitude somewhere in the United States */
function randLatLon() {
  var latRange = [18.005611, 48.987386]
  var lonRange = [-124.626080, -62.361014]
  var randLat  = Math.random() * (latRange[1] - latRange[0]) + latRange[0];
  var randLon  = Math.random() * (lonRange[1] - lonRange[0]) + lonRange[0];
  return [randLat, randLon]
}
