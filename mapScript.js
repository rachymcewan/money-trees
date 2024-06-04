var SPREADSHEET_ID = "1N5I82OXyV3e1VXXyBuEaJ03EWc3kWY7Y_JlHl360rug";
var TAB_NAME = "Sheet1";

var prev_infowindow = false;

function initMap() {
    // Define map options
    var mapOptions = {
        zoom: 13,
        center: {lat: 51.525611 , lng: -0.059855}, // Default center
        mapId: "4bca94b7572606bc"
    };

    // Create a new map
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const geocoder = new google.maps.Geocoder();
    // Load and process CSV data
    const url = `https://opensheet.elk.sh/${SPREADSHEET_ID}/${TAB_NAME}`;

    fetch(url)
        .then(response => response.json())
        .then(json => {
            json.forEach((row, index) => {
                geocoder.geocode({ 'address': row["location"] }, function(results, status) {
                    if (status == 'OK') {
                        const iconImage = document.createElement("img");
                        iconImage.src = row["icons"];

                        // Place a marker at the geocoded location
                        var marker = new google.maps.Marker({
                            map: map,
                            position:  {lat: parseFloat(row["latitude"]), lng: parseFloat(row["longitude"])},
                            title: row["tree name"],
                            icon: row["icons"] 
                        });

                        // Create the info window content without the title
                        var infoContentDiv = document.createElement('div');
                        infoContentDiv.classList.add('infoContent');

                        infoContentDiv.innerHTML = `<model-viewer alt="Tree" src=${row["tree 3d"]} shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>`;

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
                        const investButton = document.createElement('button');
                        investButton.className = 'invest-button';
                        investButton.textContent = 'INVEST';
                        investButton.onclick = function() {
                           
                            window.location.href=`invest.html?id=${row["tree name"]}`
                        };
                        infoContentDiv.appendChild(investButton);
                        // infoContent.Div.
                        var infowindow = new google.maps.InfoWindow({
                            content: infoContentDiv
                        });

                        marker.addListener('click', function() {
                            if (prev_infowindow) {
                                prev_infowindow.close();
                            }

                            prev_infowindow = infowindow;
                            infowindow.open(map, marker);
                        });
                    } else {
                        console.error('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });
        });
}

// Include the async defer script tag in your HTML to load the Google Maps API
// Function to display asset details
function showAssetDetails(asset) {
    // Create a container for the asset details
    const infoContent = document.createElement('div');
    infoContent.className = 'infoContent';

    // Add asset details to the container (example)
    const assetName = document.createElement('p');
    assetName.textContent = asset.name;
    infoContent.appendChild(assetName);

    const assetDescription = document.createElement('p');
    assetDescription.textContent = asset.description;
    infoContent.appendChild(assetDescription);

    // Add the INVEST button
    const investButton = document.createElement('button');
    investButton.className = 'invest-button';
    investButton.textContent = 'INVEST';
    investButton.onclick = function() {
        alert('Invest button clicked!'); // You can replace this with your investment logic
    };
    infoContent.appendChild(investButton);

    // Assuming you have a method to display this infoContent in the appropriate place
    displayInfoContent(infoContent);
}

// Example usage of the function (you should replace this with your actual logic)
const exampleAsset = {

    description: 'Click below to Invest.'
}
// showAssetDetails(exampleAsset);

// Function to display the content (you need to implement this based on your UI structure)
function displayInfoContent(content) {
    const container = document.querySelector('.wrapper'); // Adjust the selector to your actual container
    container.appendChild(content);
}

