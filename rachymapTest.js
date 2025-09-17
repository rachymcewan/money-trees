var SPREADSHEET_ID = "1N5I82OXyV3e1VXXyBuEaJ03EWc3kWY7Y_JlHl360rug";
var TAB_NAME = "Sheet1";

function initMap() {
    // Define map options
    var mapOptions = {
        zoom: 13,
        center: { lat: 51.525611, lng: -0.059855 }, // Default center
        mapId: "4bca94b7572606bc"
    };

    // Create a new map
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const geocoder = new google.maps.Geocoder();
    const url = `https://opensheet.elk.sh/${SPREADSHEET_ID}/${TAB_NAME}`;

    fetch(url)
    .then(response => response.json())
    .then(json => {
        json.forEach(row => {
            console.log("Processing:", row["tree name"]);

            geocoder.geocode({ 'address': row["location"] }, function(results, status) {
                if (status == 'OK') {
                    // Define the icon with custom sizing
                    const iconImage = {
                        url: row["icons"], // URL of the icon
                        scaledSize: new google.maps.Size(100, 100) // scaled size to maintain aspect ratio
                    };

                    // Place a marker at the geocoded location with a custom icon
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: row["tree name"],
                        icon: iconImage
                    });

                    // Info window content with embedded 3D model and video link
                    var infoContent = `<h1>${row["tree name"]}</h1>
                    <model-viewer alt="Tree" src="${row["tree 3d"]}" shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
                    <p><a href="${row["tree video"]}">Watch Video</a></p>`;

                    var infowindow = new google.maps.InfoWindow({
                        content: infoContent
                    });

                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });
                } else {
                    console.error('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
    });
}
