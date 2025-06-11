let USER = {};
let USER_CONVERSATIONS = []

function onLoad() {
    USER = JSON.parse(window.localStorage.getItem("user"));
    getConversations();
    checkPrestataire();
}

function userAlreadyAdded(user) {
    return USER_CONVERSATIONS.some(existingUser => existingUser.id === user.id);
}

function checkPrestataire() {

    let presta = JSON.parse(window.localStorage.getItem("prestataire"));

    const ajoutServiceTitle = document.getElementById("ajout-service-title");
    const ajoutServiceDiv = document.getElementById("ajout-service-div");

    console.log("prestataire", presta);
    if(presta == null){
        ajoutServiceTitle.remove();
        ajoutServiceTitle.remove();
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

    for( let user of USER_CONVERSATIONS) {
        const link = document.createElement("a");
        link.href = "/chat?u=" + user.id;
        link.innerText = "Conversation avec : " + user.username;
        conversationDiv.appendChild(link);
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
    });

    console.log(response);

}