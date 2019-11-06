

var map, heatmap;
var lat1 = 40.430955; // armstrong
var lng1 = -86.916221; // armstrong
var latEngFount = 40.428660; // in between 1 and 2
var lngEngFount = -86.913799; // in between 1 and 2
var lat2 = 40.427384; // WALC
var lng2 = -86.913711; // WALC
var lat3 = 40.425032; // Stuart
var lng3 = -86.913828; // Stuart
var latB34 = 40.424161; // between 3 and 4
var lngB34 = -86.913765; // between 3 and 4
var lat4 = 40.424096; // Union arch
var lng4 =  -86.910477; // Union arch
var lat5 = 40.424240; // state and university
var lng5 = -86.916790; // state and university
var latB46 = 40.424023; // between 4 and 6
var lngB46 = -86.908148; // between 4 and 6
var lat6 = 40.422306; // bottom of chauncey hill
var lng6 = -86.904514; // bottom of chauncey hill
var lat7 = 40.424431; // state and macarthur
var lng7 = -86.925618; // state and macarthur
var lat8 = 40.431392; // stadium and martin jischke
var lng8 = -86.921437; // stadium and martin jischke
var latB18 = 40.431300; // between 1 and 8
var lngB18 = -86.916617; // between 1 and 8

// baseline value for number of points
var distance12 = Math.sqrt(Math.pow((lat1 - latEngFount), 2) + Math.pow((lng1 - lngEngFount), 2));
var interval12 = distance12 / 70;


var scansLoc12 = 32; // gets this value from SQL query from Sayed
var scansLoc23 = 20; // gets this value from SQL query from Sayed
var scansLoc34 = 41;
var scansLoc35 = 23;
var scansLoc46 = 15;
var scansLoc57 = 20;
var scansLoc18 = 8;

var scanBetween = [];
var latLng;

function generateHeatMapBetween() {
  // scanners 1 & 2
  pointsBetween(true, latEngFount, lat1, lngEngFount, lng1, scansLoc12);
  pointsBetween(false, latEngFount, lat2, lngEngFount, lng2, scansLoc12);
  // scanners 2 & 3
  pointsBetween(true, lat2, lat3, lng2, lng3, scansLoc23);
  // scanners 3 & 4
  pointsBetween(true, lat3, latB34, lng3, lngB34, scansLoc34);
  pointsBetween(false, latB34, lat4, lngB34, lng4, scansLoc34);
  // scanners 3 & 5
  pointsBetween(true, lat3, latB34, lng3, lngB34, scansLoc35);
  pointsBetween(false, latB34, lat5, lngB34, lng5, scansLoc35);

  // scanners 4 & 6
  pointsBetween(true, lat4, latB46, lng4, lngB46, scansLoc46);
  pointsBetween(false, latB46, lat6, lngB46, lng6, scansLoc46);

  // scanners 5 & 7
  pointsBetween(true, lat5, lat7, lng5, lng7, scansLoc57);

  // scanners 1 & 8
  pointsBetween(true, lat1, latB18, lng1, lngB18, scansLoc18);
  pointsBetween(false, latB18, lat8, lngB18, lng8, scansLoc18); 

  return scanBetween;
  
}

function pointsBetween(firstScan, firstLat, secondLat, firstLng, secondLng, weightLoc) {
  var numPoints = Math.sqrt(Math.pow((firstLat - secondLat), 2) + Math.pow((firstLng - secondLng), 2)) / interval12;
  var latInterval = (secondLat - firstLat) / numPoints;
  var lngInterval = (secondLng - firstLng) / numPoints;
  if (firstScan)
  {
    for (var i = 0; i < numPoints; i++) {
      scanBetween.push({location: new google.maps.LatLng(firstLat + i*latInterval, firstLng + i*lngInterval), weight: weightLoc})
    }
  }
  else
  {
    for (var i = 1; i < numPoints; i++) {
      scanBetween.push({location: new google.maps.LatLng(firstLat + i*latInterval, firstLng + i*lngInterval), weight: weightLoc})
    }
  }
  
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14.9,
    center: {lat: 40.427605, lng: -86.919173},
    mapTypeId: 'satellite',
    scrollwheel: false,
    scaleControl: false,
    mapTypeControl: false,
    disableDefaultUI: true
    
  });
  heatmap = new google.maps.visualization.HeatmapLayer({
    data:generateHeatMapBetween(),
    map: map,
    maxIntensity: 300,
    radius: 12
  });
}

function changeCenterCampus() {
  map.setCenter(new google.maps.LatLng(40.427605, -86.919173)    );
  map.setZoom(14.9);
}

function changeCenterARMS() {
	map.setCenter(new google.maps.LatLng(lat1, lng1)    );
  map.setZoom(17);
  
  var marker = new google.maps.Marker({
			position: {lat: latARMS, lng: lngARMS},
			map: map,
			title: 'Golden Gate Bridge'
			});
  new google.maps.Size(42,68)
}

