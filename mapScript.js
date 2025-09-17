var SPREADSHEET_ID = "1N5I82OXyV3e1VXXyBuEaJ03EWc3kWY7Y_JlHl360rug";
var TAB_NAME = "Sheet1";

var prev_infowindow = false;

function initMap() {
    // Define map options
    var mapOptions = {
        zoom: 13,
        center: { lat: 51.525611, lng: -0.059855 }, // Default center
        mapId: "4bca94b7572606bc"
    };

    // Create a new map
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Load and process data from the Google Sheet via opensheet
    const url = `https://opensheet.elk.sh/${SPREADSHEET_ID}/${TAB_NAME}`;

    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log("Spreadsheet data:", json); // Debugging

            json.forEach((row, index) => {
                // Place a marker directly using latitude/longitude
                var marker = new google.maps.Marker({
                    map: map,
                    position: {
                        lat: parseFloat(row["latitude"]),
                        lng: parseFloat(row["longitude"])
                    },
                    title: row["tree name"], // adjust if this is also uppercase in your sheet
                    icon: row["icons"]
                });

                // Build the info window content
                var infoContentDiv = document.createElement('div');
                infoContentDiv.classList.add('infoContent');

                infoContentDiv.innerHTML = `
                    <model-viewer alt="Tree" src="${row["tree 3d"]}" shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
                `;

                var detailsDiv = document.createElement('div');
                detailsDiv.classList.add("detailsDiv");

                var speciesText = document.createElement("p");
                speciesText.innerText = `SPECIES: ${row["SPECIES"]}`;
                detailsDiv.appendChild(speciesText);

                var statusText = document.createElement("p");
                statusText.innerText = `STATUS: ${row["STATUS"]}`;
                detailsDiv.appendChild(statusText);

                var locationText = document.createElement("p");
                locationText.innerText = `LOCATION: ${row["COORDS"]}`;
                detailsDiv.appendChild(locationText);

                var carbonText = document.createElement("p");
                carbonText.innerText = `CARBON SEQ: ${row["CARBON SEQ"]}`;
                detailsDiv.appendChild(carbonText);

                var capturesText = document.createElement("p");
                capturesText.innerText = `CAPTURES: ${row["CAPTURES"]}`;
                detailsDiv.appendChild(capturesText);

                var investorText = document.createElement("p");
                investorText.innerText = `INVESTORS: ${row["INVESTORS"]}`;
                detailsDiv.appendChild(investorText);

                infoContentDiv.appendChild(detailsDiv);

                // Add INVEST button
                const investButton = document.createElement('button');
                investButton.className = 'invest-button';
                investButton.textContent = 'INVEST';
                investButton.onclick = function () {
                    window.location.href = `invest.html?id=${row["tree name"]}`;
                };
                infoContentDiv.appendChild(investButton);

                // Create the InfoWindow
                var infowindow = new google.maps.InfoWindow({
                    content: infoContentDiv
                });

                marker.addListener('click', function () {
                    if (prev_infowindow) {
                        prev_infowindow.close();
                    }
                    prev_infowindow = infowindow;
                    infowindow.open(map, marker);
                });
            });
        })
        .catch(err => console.error("Error loading sheet:", err));
}


