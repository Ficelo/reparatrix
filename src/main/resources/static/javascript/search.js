LONGITUDE = 0;
LATITUDE = 0;

function onInitSearch() {

    const params = new URLSearchParams(document.location.search);
    const searchParam = params.get("s");

    const searchbar = document.getElementById("search")
    searchbar.value = searchParam;

    searchForProfession("search");

}

function searchEnter() {
    if(event.key === 'Enter'){
        searchForProfession("search");
    }
}

function searchForProfession(inputId) {

    const params = new URLSearchParams(document.location.search);

    let input = document.getElementById(inputId);
    let distanceMax = document.getElementById("distanceRange")
    let noteMin = document.getElementById("noteRange")
    const resultats = document.getElementById("results")

    // Juste pour mettre à jour l'url
    params.set("s", input.value.toLowerCase());
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);

    resultats.innerHTML = '';

    let clientCoords = getClientCoords();

    window.myMap.setView([clientCoords[0], clientCoords[1]], 12);
    addMapMarker(clientCoords[0], clientCoords[1], "Vous");

    fetch('/api/prestataires?profession=' + input.value.toLowerCase() + "&noteMin=" + noteMin.value + "&distanceMax=" + distanceMax.value)
        .then(reponse => reponse.json())
        .then(prestas => {
            prestas.forEach(presta => {
                console.log("distance : ", getDistance(getClientCoords(), presta.localisation.split(", ")) );
                console.log("distance max : ", distanceMax.value);
                if(parseFloat(getDistance(getClientCoords(), presta.localisation.split(", ")))  <= parseFloat(distanceMax.value)) {
                    const card = new PrestataireCard(presta.entreprise, getDistance(getClientCoords(), presta.localisation.split(", ")), presta.note, presta.profession, presta.id);
                    resultats.appendChild(card);
                    let loc = presta.localisation.split(", ");
                    console.log(loc);
                    addMapMarker(presta.localisation.split(", ")[1], presta.localisation.split(", ")[0], presta.entreprise);
                    //addRandomMapMarker(48.864716, 2.349014, presta.entreprise, 10000);
                }


            });
        })
        .catch( err => console.error('Error fetching prestataires:', err))
}

function updateSearchValueDisplay(displayId, rangeId, suffix) {

    const display = document.getElementById(displayId);
    console.log(display.innerText)
    const range = document.getElementById(rangeId);

    let innerText = display.innerText.split(":")
    display.innerText = innerText[0] + " : " + range.value + suffix;

}

function getDistance(coordsUser, coordsPresta) {
    if (!coordsUser || !coordsPresta || coordsUser === "" || coordsPresta === "") {
        return 0;
    }

    console.log("coords : " + coordsUser + ", " + coordsPresta);

    const toRad = (value) => value * Math.PI / 180;

    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(coordsPresta[1] - coordsUser[0]);
    const dLon = toRad(coordsPresta[0] - coordsUser[1]);

    const lat1 = toRad(coordsUser[0]);
    const lat2 = toRad(coordsPresta[1]);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;


    return distance.toFixed(2);
}

function getClientCoords() {

    const client = JSON.parse(window.localStorage.getItem("client"));

    if(client !== undefined) {
        return client.localisation.split(", ");
    }

}

// ça j'ai copié de chatgpt juste pour avoir un visuel vite fais
function addRandomMapMarker(centerLat, centerLng, label, radiusInMeters = 1000) {
    const radiusInDegrees = radiusInMeters / 111320; // approx meters per degree latitude

    const u = Math.random();
    const v = Math.random();
    const w = radiusInDegrees * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const offsetLat = w * Math.cos(t);
    const offsetLng = w * Math.sin(t) / Math.cos(centerLat * (Math.PI / 180));

    const newLat = centerLat + offsetLat;
    const newLng = centerLng + offsetLng;

    L.marker([newLat, newLng])
        .addTo(window.myMap)
        .bindPopup(label);
}

class PrestataireCard extends HTMLElement {

    constructor(entreprise, distance, note, profession, id) {
        super();
        this.attachShadow({mode: "open"});

        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
            <style>
                .card {
                    margin-bottom: 5px;
                }
                .entreprise-affichage {
                    display: flex;
                    flex-direction: row;
                }
                
                img {
                    width: 200px;
                    height: auto;
                    border-radius: 10px;
                    object-fit: cover;
                    margin-right: 20px;
                }
                
            </style>
            <div class="card">
                <div class="card-body entreprise-affichage">
                    <img alt="image métier" src="../images/professions/${profession}.png"/>
                    <div>
                        <p>Entrerpise : <a href="/entreprise?entreprise=${id}"><span id="entreprise">${entreprise}</span></a></p>
                        <p>Distance : <span id="distance">${distance} km</span></p>
                        <p>Note : <span id="note">${note} / 5</span></p>
                    </div>
                </div>
            </div>
            `;
    }

}
customElements.define("prestataire-card", PrestataireCard);