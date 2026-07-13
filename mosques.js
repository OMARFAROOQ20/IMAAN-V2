const locationText = document.getElementById("locationText");
const mosqueList = document.getElementById("mosqueList");

navigator.geolocation.getCurrentPosition(showLocation, showError);

function showLocation(position) {

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    locationText.innerHTML =
        "📍 Latitude : " + lat.toFixed(5) +
        "<br>📍 Longitude : " + lng.toFixed(5);

    // Sample nearby mosques
    const mosques = [

        {
            name: "Masjid-E-Huzoor",
            distance: "550 m",
            rating: "⭐ 4.7"
        },

        {
            name: "Jamia Masjid",
            distance: "1.2 km",
            rating: "⭐ 4.8"
        },

        {
            name: "Masjid-E-Aqsa",
            distance: "2.3 km",
            rating: "⭐ 4.6"
        },

        {
            name: "Noor Masjid",
            distance: "3.1 km",
            rating: "⭐ 4.5"
        }

    ];

    mosqueList.innerHTML = "";

    mosques.forEach(mosque => {

        mosqueList.innerHTML += `

        <div class="mosque-card">

            <h3>🕌 ${mosque.name}</h3>

            <p>${mosque.rating}</p>

            <p>📍 ${mosque.distance}</p>

            <a
                class="direction-btn"
                href="https://www.google.com/maps/search/${encodeURIComponent(mosque.name)}/@${lat},${lng},15z"
                target="_blank">

                📍 Directions

            </a>

        </div>

        `;

    });

}

function showError() {

    locationText.innerHTML =
        "❌ Unable to detect your location.";

    mosqueList.innerHTML =
        "<h2>Please enable location access.</h2>";

}