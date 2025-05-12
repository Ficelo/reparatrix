window.myMap = L.map('map').setView([48.8566, 2.3522], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(window.myMap);

window.addMapMarker = function(lat, lng, label) {
    L.marker([lat, lng])
        .addTo(window.myMap)
        .bindPopup(label);
}
