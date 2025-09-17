function fetchAndDisplayMap() {
    // Use the published CSV link from your Google Sheet
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQQNhBCkzxe-kj_N00wfC9lQOx-YNL_-V1nzh-DXpf6OR581xe04dHv-zRttpiJJKIGvJP1hFVJNgM-/pub?output=csv';

    fetch(url)
        .then(response => response.text())
        .then(csvText => {
            // Parse CSV using PapaParse (make sure PapaParse is included in your HTML)
            const data = Papa.parse(csvText, { header: true }).data;
            console.log("the data is: ", data);
            initMap(data);
        });
}

function initMap(locations) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {lat: parseFloat(locations[0].latitude), lng: parseFloat(locations[0].longitude)}
    });

    locations.forEach(function(location) {
        if (location.latitude && location.longitude) {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(location.latitude), parseFloat(location.longitude)),
                map: map,
                title: location['tree name'] // Use the correct header name
            });
        }
    });
}

fetchAndDisplayMap();