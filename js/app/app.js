// Since we will be making use of 3rd party functions (eg. navigator.geolocation.getCurrentPosition) which are not native javascript functions we will need
// to add this function to the list of native javascript functions to allow javascript identify and execute it each time its called.
// This is done by using the addEventListener() function.
//

var Latitude = undefined;
var Longitude = undefined;
var marker = undefined;
var map = undefined;
var id =1;

//document.addEventListener("deviceready", onDeviceReady, false);

//We decide to create a function to handle the 3rd party functions (eg. navigator.geolocation.getCurrentPosition)
// which we earlier added to the native functions of the javascript
/*function onDeviceReady()
{
     getMapLocation();
}*/
 
//gets the location of the device when the button is clicked
 $('#locationBtn').on('click', function()
 {
    if (id==1) 
    {
        map.setZoom(17);
        marker.setMap(map);
        id++;
        $('#locationBtn').text('Hide Location');
        //document.getElementById("locationBtn").innerHTML="Hide Location";
    }
    else
    {
        map.setZoom(5);
        marker.setMap(null);
        id = 1;
        $('#locationBtn').text('Show Location');
        //document.getElementById("locationBtn").innerHTML="Show Location";
    }
 });

// Get geo coordinates
function getMapLocation()
{
    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates
var onMapSuccess = function (position) 
{
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    getMap(Latitude, Longitude);
}

// Get map by using coordinates
function getMap(latitude, longitude) 
{
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);
    var latLong = new google.maps.LatLng(latitude, longitude);
    marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(null);
    map.setZoom(5);
    map.setCenter(marker.getPosition());
}

// Error callback
function onMapError(error) 
{
    alert('code: ' + error.code + '\n' +
     'message: ' + error.message + '\n');
}

