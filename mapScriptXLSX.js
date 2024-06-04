function fetchAndDisplayMap() {
    // const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    // const sheetId = 'YOUR_SHEET_ID'; // Extract from your Google Sheets URL
    // const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
    const url='https://docs.google.com/spreadsheets/d/e/2PACX-1vQQNhBCkzxe-kj_N00wfC9lQOx-YNL_-V1nzh-DXpf6OR581xe04dHv-zRttpiJJKIGvJP1hFVJNgM-/pubhtml?gid=0&single=true
    fetch(url)
    .then(response => response.json())
    .then(json => {
        const data = parseSheetData(json);
      console.log("the data is: ", data);
        initMap(data); // Initialize the map with the parsed data
    });
}

function parseSheetData(json) {
    // Assuming the first row is headers
    const rows = json.values;
    const headers = rows.shift();
    return rows.map(row => {
        let obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index];
        });
        return obj;
    });
}

function initMap(locations) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: {lat: parseFloat(locations[0].latitude), lng: parseFloat(locations[0].longitude)}
    });

    locations.forEach(function(location) {
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(location.latitude), parseFloat(location.longitude)),
            map: map,
            title: location.name
        });
    });
}
fetchAndDisplayMap()