// Kaaba Coordinates
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

// Get HTML Elements
const locationText = document.getElementById("location");
const directionText = document.getElementById("direction");
const distanceText = document.getElementById("distance");
const statusText = document.getElementById("status");
const needle = document.getElementById("needle");

// Refresh Button
document.getElementById("refreshBtn").addEventListener("click", getLocation);

// Calibrate Button
document.getElementById("calibrateBtn").addEventListener("click", () => {
    alert("Move your phone in a figure 8 to calibrate the compass.");
});

// Start Automatically
getLocation();


// ==============================
// Get GPS Location
// ==============================
function getLocation() {

    statusText.innerHTML = "Getting your location...";

    if (!navigator.geolocation) {
        statusText.innerHTML = "Geolocation is not supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(

        success,

        error,

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}


// ==============================
// Success
// ==============================
function success(position) {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
.then(response => response.json())
.then(data => {

    const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Unknown";

    const state =
        data.address.state || "";

    const country =
        data.address.country || "";

    locationText.innerHTML =
        "📍 " + city + "<br>" +
        state + "<br>" +
        country;

});

    const qibla = calculateBearing(
        lat,
        lon,
        KAABA_LAT,
        KAABA_LON
    );

    directionText.innerHTML =
        Math.round(qibla) + "°";

    const distance = calculateDistance(
        lat,
        lon,
        KAABA_LAT,
        KAABA_LON
    );

    distanceText.innerHTML =
        distance.toFixed(0) + " km";

    statusText.innerHTML =
        "GPS Connected";

    rotateNeedle(qibla);

}


// ==============================
// Error
// ==============================
function error(err) {

    switch(err.code){

        case err.PERMISSION_DENIED:
            statusText.innerHTML="Permission Denied";
            break;

        case err.POSITION_UNAVAILABLE:
            statusText.innerHTML="Location Unavailable";
            break;

        case err.TIMEOUT:
            statusText.innerHTML="Location Timeout";
            break;

        default:
            statusText.innerHTML="Unknown Error";

    }

}


// ==============================
// Qibla Bearing
// ==============================
function calculateBearing(lat1, lon1, lat2, lon2){

    const dLon = (lon2-lon1) * Math.PI / 180;

    lat1 *= Math.PI/180;
    lat2 *= Math.PI/180;

    const y = Math.sin(dLon) * Math.cos(lat2);

    const x =
        Math.cos(lat1)*Math.sin(lat2) -
        Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);

    return (Math.atan2(y,x)*180/Math.PI+360)%360;

}


// ==============================
// Distance
// ==============================
function calculateDistance(lat1,lon1,lat2,lon2){

    const R = 6371;

    const dLat = (lat2-lat1)*Math.PI/180;

    const dLon = (lon2-lon1)*Math.PI/180;

    const a =
    Math.sin(dLat/2)*Math.sin(dLat/2)+
    Math.cos(lat1*Math.PI/180)*
    Math.cos(lat2*Math.PI/180)*
    Math.sin(dLon/2)*
    Math.sin(dLon/2);

    const c =
    2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

    return R*c;

}


// ==============================
// Rotate Compass Needle
// ==============================
function rotateNeedle(angle){

    // Smooth animation
    needle.style.transition = "transform 0.8s ease";

    // Rotate needle
    needle.style.transform =
    `translate(-50%,-100%) rotate(${angle}deg)`;

}