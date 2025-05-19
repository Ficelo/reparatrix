let SENDER = {};
let RECEIVER = {};

let messages = [];

function onLoad() {
    SENDER = JSON.parse(window.localStorage.getItem("user"));
    const params = new URLSearchParams(window.location.search);
    const id = params.get("u");
    const response = getUserById(id).then(
        value => {
            RECEIVER = value;
            console.log("SENDER", SENDER);
            console.log("RECEIVER", RECEIVER);
            fetchMessages();
        }
    )

}

async function getUserById(id) {
    const response = await fetch('/api/users/' + id);
    if (!response.ok) throw new Error("Http error" + response.status);
    return await response.json();
}

async function fetchMessages() {
    const response = await fetch('/api/messages');
    if (!response.ok) {
        console.error("Failed to fetch messages");
        return;
    }

    const data = await response.json();

    const relevantMessages = data.filter(msg =>
        (msg.expediteur.id === SENDER.id && msg.destinataire.id === RECEIVER.id) ||
        (msg.expediteur.id === RECEIVER.id && msg.destinataire.id === SENDER.id)
    );

    if (JSON.stringify(relevantMessages) !== JSON.stringify(messages)) {
        messages = relevantMessages;
        console.log(messages)
        renderMessages(messages);
    }
}

// temporel avant que je fasse un composant custom
function renderMessages(msgs) {
    const container = document.querySelector('.chat-container');
    container.innerHTML = '';
    msgs.forEach(msg => {
        const div = document.createElement('div');
        div.classList.add('chat-message');
        div.classList.add(msg.expediteur.id === SENDER.id ? 'sent' : 'received');
        div.innerText = msg.texte;
        container.appendChild(div);
    });

    container.scrollTop = container.scrollHeight;
}

function sendMessage() {

    const messageContainer = document.getElementById("message-bar");


    let message = {
        date: new Date(),
        texte : messageContainer.value,
        destinataire : RECEIVER,
        expediteur : SENDER
    };

    const response = fetch("/api/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(message)
    }).then( () => {
            messageContainer.value = "";
        }
    )

}

setInterval(fetchMessages, 2000);
