const ORDER_STATUS_PAYED = "PAYÉ";
const ORDER_STATUS_IN_PROGRESS = "EN COURS";
const ORDER_STATUS_DONE = "DONE";

let SERVICE = {};

function postAvis() {
    // TODO : faire un check pour vérifier que tout est bien rempli
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const commentaireInput = document.getElementById("commentaire");
    const commentaire = commentaireInput.value;
    let selectedRating;

    ratingInputs.forEach(input => {
        if (input.checked) {
            selectedRating = input.value;
        }
    });


    let avisData = {
        commentaire: commentaire,
        note: parseInt(selectedRating),
        service: SERVICE,
        user : JSON.parse(window.localStorage.getItem("user"))
    }

    const response = fetch("/api/avis",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(avisData)
    }).then( () => {
            // Vider le truc commentaire et les avis
            ratingInputs.forEach(input => {
                input.checked = false;
            })
            commentaireInput.value = "";
            const avisDiv = document.getElementById("avis");
            const serviceDiv = document.getElementById("service");

            serviceDiv.innerText = "";
            avisDiv.innerText = ""; // Ptet revoir comment ça ça marche
            loadService(); // C'est pas tip top de faire comme ça faudrait un peu refacto
        }
    );


}

async function loadService() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("service");
    const service = getService(id);

    const serviceDiv = document.getElementById("service");
    const avisDiv = document.getElementById("avis");


    service.then((serv) => {
        console.log(serv);
        SERVICE = serv;
        const srv = document.createElement("p");
        srv.innerText = "id : " + serv.id + ", order id : " + serv.order_id + ", description : " + serv.description;
        serviceDiv.appendChild(srv);

        const avis = getAvis(serv.id);

        avis.then((response) => {
            response.map((avi) => {
                console.log(avi);
                const aviP = document.createElement("p");
                aviP.innerText = "id : " + avi.id + ", note : " + avi.note + ", commentaire : " + avi.commentaire;
                avisDiv.appendChild(aviP);
            })
        })

    });


}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const pad = (n) => n.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function commander() {

    const client = JSON.parse(localStorage.getItem("client"));
    const service = SERVICE;

    console.log("client : ", client);
    console.log("service : ", service);

    let orderStatus = {
        prestataireId : service.prestataire.id,
        clientId : client.id,
        status : ORDER_STATUS_PAYED,
        description : service.description + " " + service.prix + "€" + ", the " + formatTimestamp(Date.now())
    }

    console.log(orderStatus);

    const response = fetch("api/orderstatus", {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderStatus)
    }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));

}

function contacter() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("service");
    const service = getService(id).then(
        value => {
            console.log(value.prestataire.user.id);
            window.location.href = "/chat?u=" + value.prestataire.user.id;
        }
    );
}

async function getService(id) {
    const response = await fetch('/api/services/' + id);
    if (!response.ok) throw new Error("HTTP error " + response.status);
    return await response.json();
}

async function getAvis(serviceId){
    const response = await fetch('/api/avis/service/' + serviceId);
    if (!response.ok) throw new Error("HttP error " + response.status);
    return await response.json();
}