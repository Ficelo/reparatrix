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

    fetch("/api/avis", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(avisData)
    })
        .then(() => {
            // Fetch services of the prestataire
            return fetch("/api/services/prestataireId/" + SERVICE.prestataire.id);
        })
        .then(res => res.json())
        .then(async services => {
            let allNotes = [];
            let total = 0

            // Wait for all avis fetches in parallel
            const avisPromises = services.map(service =>
                fetch("/api/avis/service/" + service.id)
                    .then(resp => resp.json())
            );

            const allAvis = await Promise.all(avisPromises);

            // Collect all notes from all avis responses
            allAvis.forEach(avisList => {
                avisList.forEach(avis => {
                    allNotes.push(avis.note);
                    total += avis.note;
                });
            });

            let moyenne = total / allNotes.length;

            let updatedPresta = SERVICE.prestataire;
            updatedPresta.note = moyenne;

            fetch("api/prestataires/" + updatedPresta.id, {
                method : "PUT",
                headers : {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(updatedPresta)
            })

            // Reset form inputs
            ratingInputs.forEach(input => {
                input.checked = false;
            });
            commentaireInput.value = "";

            // Clear UI
            document.getElementById("avis").innerText = "";
            document.getElementById("service").innerText = "";

            // Refresh service list
            loadService();
        })
        .catch(err => {
            console.error("Error during avis or services fetch:", err);
        });



}

async function loadService() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("service");
    const service = getService(id);

    const serviceDiv = document.getElementById("service");
    const avisDiv = document.getElementById("avis");
    const serviceImg = document.getElementById("image-profession");


    service.then((serv) => {
        console.log(serv);
        SERVICE = serv;
        const srv = document.createElement("p");
        //srv.innerText = "id : " + serv.id + ", order id : " + serv.order_id + ", description : " + serv.description;
        srv.innerText = serv.description
        serviceDiv.appendChild(srv);

        // const a = new AvisCard("Service rapide et très professionnel.", 4, "Jean Dupont");
        // serviceDiv.appendChild(a);

        serviceImg.src = "images/professions/" + serv.prestataire.profession + ".png"

        const avis = getAvis(serv.id);

        avis.then((response) => {
            response.map((avi) => {
                console.log(avi);
                // const aviP = document.createElement("p");
                // aviP.innerText = "id : " + avi.id + ", note : " + avi.note + ", commentaire : " + avi.commentaire;

                const avisElement = new AvisCard(avi.commentaire, avi.note, avi.user.username);


                avisDiv.appendChild(avisElement);
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

async function commander() {

    const client = JSON.parse(localStorage.getItem("client"));
    const service = SERVICE;

    console.log("client : ", client);
    console.log("service : ", service);

    let orderStatus = {
        prestataireId: service.prestataire.id,
        clientId: client.id,
        status: ORDER_STATUS_PAYED,
        description: service.description + " " + service.prix + "€" + ", the " + formatTimestamp(Date.now())
    }

    console.log(orderStatus);

    // const response = fetch("api/orderstatus", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(orderStatus)
    // }).then(res => res.json())
    //     .then(data => {
    //         localStorage.setItem("orderToCancel", JSON.stringify(data))
    //         console.log("data : " + data)}
    //     )
    //     .catch(err => console.error(err));

    localStorage.setItem("currentOrder", JSON.stringify(orderStatus));

    let price = service.prix;
    let priceId = "prod_SJEYCIGmASM2Cj"

    switch (price) {
        case 50 :
            priceId = "prod_SJEYCIGmASM2Cj";
            break;
        case 100 :
            priceId = "prod_SUvALa08OHxLBV";
            break;
        case 150 :
            priceId = "prod_SUvBCKdEE8sxTG";
            break;
        case 200 :
            priceId = "prod_SUvI5qWoF3LgXw";
            break;
        case 250 :
            priceId = "prod_SUvK4HYGEHIjC0";
            break;
        case 300 :
            priceId = "prod_SUvMbf5chbohRH";
            break;
        default:
            break;
    }


    const checkoutRes = await fetch("/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({productId: priceId})
    });

    const result = await checkoutRes.json();
    console.log("Stripe session:", result);

    if (result.url) {
        window.location.href = result.url;
    } else {
        console.error("No URL in Stripe response");
    }

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

class AvisCard extends HTMLElement {
    constructor(texte = "", etoiles = 0, username = "Anonyme") {
        super();
        this.attachShadow({ mode: "open" });

        // Create star rating HTML
        const etoilesHtml = "★".repeat(etoiles) + "☆".repeat(5 - etoiles);

        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                .card {
                    margin-bottom: 10px;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    background-color: #fff;
                }

                .username {
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                .etoiles {
                    color: #f5c518; /* gold color */
                    font-size: 1.2em;
                    margin-bottom: 10px;
                }

                .texte {
                    font-style: italic;
                }
            </style>

            <div class="card">
                <div class="username">${username}</div>
                <div class="etoiles">${etoilesHtml}</div>
                <div class="texte">${texte}</div>
            </div>
        `;
    }
}

customElements.define("avis-card", AvisCard);
