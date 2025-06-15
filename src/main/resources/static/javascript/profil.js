let USER = {};
let USER_CONVERSATIONS = []
let CURRENT_SERVICE = {};

const ORDER_STATUS_PAYED = "PAYÉ";
const ORDER_STATUS_IN_PROGRESS = "EN COURS";
const ORDER_STATUS_DONE = "DONE";

function onLoad() {
    USER = JSON.parse(window.localStorage.getItem("user"));
    getConversations();
    checkPrestataire();
}

function userAlreadyAdded(user) {
    return USER_CONVERSATIONS.some(existingUser => existingUser.id === user.id);
}

async function checkPrestataire() {

    let presta = JSON.parse(window.localStorage.getItem("prestataire"));

    const ajoutServiceTitle = document.getElementById("ajout-service-title");
    const ajoutServiceDiv = document.getElementById("ajout-service-div");

    const listeServiceTitre = document.getElementById("liste-services-titre");
    const listeService = document.getElementById("liste-service");

    console.log("prestataire", presta);
    if (presta == null) {
        ajoutServiceTitle.remove();
        ajoutServiceDiv.remove();
        listeService.remove();
        listeServiceTitre.remove()

        let client = JSON.parse(localStorage.getItem("client"));

        const commandes = await getOrders(client.id, false);
        createCommandes(commandes);

    } else {
        const services = await getServices(presta.id);
        services.map(service => {
            const serv = new ServiceCardProfile();
            serv.data = {
                ...service,
                profession: presta.profession
            };
            listeService.appendChild(serv);
        });

        const commandes = await getOrders(presta.id, true);
        createCommandes(commandes);

    }

}

function createCommandes(commandes) {
    const commandesTbody = document.getElementById("commandes");
    commandesTbody.innerHTML = ""; // Clear previous rows

    const isPrestataire = JSON.parse(window.localStorage.getItem("prestataire")) !== null;

    commandes.forEach(comm => {
        const row = document.createElement("tr");

        const prestataireCell = document.createElement("td");
        prestataireCell.textContent = comm.prestataire.entreprise;

        const clientCell = document.createElement("td");
        clientCell.textContent = comm.client.nom;

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = comm.description.split(", ")[0];
        console.log(comm.description.split(", "))

        const dateCell = document.createElement("td");
        dateCell.textContent = comm.description.split(", ")[1];

        const statusCell = document.createElement("td");

        if (isPrestataire) {
            const select = document.createElement("select");
            select.classList.add("form-select", "form-select-sm");

            [ORDER_STATUS_PAYED, ORDER_STATUS_IN_PROGRESS, ORDER_STATUS_DONE].forEach(statusOption => {
                const option = document.createElement("option");
                option.value = statusOption;
                option.text = statusOption;
                select.appendChild(option);
            });

            select.value = comm.status;

            select.addEventListener("change", (e) => {
                const newStatus = e.target.value;
                updateOrderStatus(comm.id, newStatus);
            });

            statusCell.appendChild(select);
        } else {
            statusCell.textContent = comm.status;
        }

        row.appendChild(prestataireCell);
        row.appendChild(clientCell);
        row.appendChild(descriptionCell);
        row.appendChild(dateCell);
        row.appendChild(statusCell);

        commandesTbody.appendChild(row);
    });
}

function updateOrderStatus(commId, newStatus) {
    // Example: Send PATCH or POST request to update the status on the server
    fetch(`/api/orderstatus/${commId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
    })
        .then(res => {
            if (!res.ok) throw new Error('Failed to update status');
            return res.json();
        })
        .then(data => {
            console.log('Status updated:', data);
            // Optionally update UI or show success message here
        })
        .catch(err => {
            console.error('Error updating status:', err);
            alert('Could not update order status');
        });
}

async function getServices(idPrestataire){
    const response = await fetch('/api/services/prestataireId/' + idPrestataire);
    if (!response.ok) throw new Error("HTTP error " + response.status);
    return await response.json();
}

async function getOrders(id, presta){
    if(presta) {
        const response = await fetch('/api/orderstatus/prestataire/' + id);
        if (!response.ok) throw new Error("HTTP error " + response.status);
        return await response.json();
    } else {
        const response = await fetch('/api/orderstatus/client/' + id);
        if (!response.ok) throw new Error("HTTP error " + response.status);
        return await response.json();
    }
}

async function getConversations() {

    const conversationDiv = document.getElementById("conversations");

    const response = await fetch("/api/messages");
    if(!response.ok){
        console.log("Failed to fetch messages");
        return;
    }

    const data = await response.json()

    const relevantMessages = data.filter(msg =>
        (msg.expediteur.id === USER.id || msg.destinataire.id === USER.id)
    );

    relevantMessages.map((msg) => {
        if (msg.expediteur.id !== USER.id && !userAlreadyAdded(msg.expediteur)) {
            USER_CONVERSATIONS.push(msg.expediteur);
        }
        if (msg.destinataire.id !== USER.id && !userAlreadyAdded(msg.destinataire)) {
            USER_CONVERSATIONS.push(msg.destinataire);
        }
    });

    for (let user of USER_CONVERSATIONS) {
        const card = document.createElement("div");
        card.classList.add("card", "mb-3", "p-3", "shadow-sm");
        card.style.cursor = "pointer";

        const link = document.createElement("a");
        link.href = "/chat?u=" + user.id;
        link.innerText = "Conversation avec : " + user.username;
        link.style.textDecoration = "none";
        link.style.color = "#282829";
        link.classList.add("h5", "m-0");

        card.addEventListener("click", () => {
            window.location.href = link.href;
        });

        card.appendChild(link);
        conversationDiv.appendChild(card);
    }


    console.log(USER_CONVERSATIONS);

}

async function addService() {

    const presta = JSON.parse(window.localStorage.getItem("prestataire"));

    const serviceDescription = document.getElementById("service-description");
    const servicePrice = document.getElementById("service-price");

    let service = {
        description: serviceDescription.value,
        order_id: 1,
        prix: servicePrice.value.toString(),
        prestataire: presta
    }

    console.log(service);

    const response = await fetch("api/services", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(service)
    })
        .then(async res => {
            let services = await getServices(presta.id);
            const listeService = document.getElementById("liste-service");
            listeService.innerHTML = ""
            services.map(service => {
                const serv = new ServiceCardProfile();
                serv.data = {
                    ...service,
                    profession: presta.profession
                };
                listeService.appendChild(serv);
            });
            serviceDescription.value = "";
            servicePrice.value = "";

        })

    console.log(response);

}

function modifyService(service) {
    document.getElementById("formModal").style.display = "block";
    CURRENT_SERVICE = service;
}

function submitForm() {
    const description = document.getElementById("descriptionInput").value;
    const prix = document.getElementById("prixInput").value;

    if (!description || !prix) {
        alert("Please fill in all fields.");
    } else {
        document.getElementById("formModal").style.display = "none";

        CURRENT_SERVICE.prix = prix;
        CURRENT_SERVICE.description = description;

        const result = fetch("api/services/" + CURRENT_SERVICE.id, {
            method : "PUT",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(CURRENT_SERVICE)
        });

        CURRENT_SERVICE = {};
    }
}

class ServiceCardProfile extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    set data(service) {
        this.render(service);
    }

    render(service) {
        const { description, prix, profession, id } = service;
        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                .card {
                    margin-bottom: 5px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
            <div class="card" onclick="window.location = 'service?service=${id}'">
                <div class="card-body entreprise-affichage">
                    <img alt="image métier" src="../images/professions/${profession}.png"/>
                    <div>
                        <p>${description}</p>
                        <p>Prix : <span id="prix">${prix} €</span></p>
                    </div>
                </div>
            </div>    
            <button class="btn btn-primary" id="modifyBtn">Modifier</button>  
        `;

        this.shadowRoot.querySelector("#modifyBtn").addEventListener("click", () => {
            modifyService(service);
        });
    }
}

customElements.define("service-card-profil", ServiceCardProfile);
