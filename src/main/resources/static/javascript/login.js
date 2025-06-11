async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userReponse = getUserByEmail(email);

    // ça vérifie pas grand chose pour l'instant c'est juste pour tester
    userReponse.then(async (user) => {
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("user in localstorage", JSON.parse(localStorage.getItem("user")));
        try {
            await getClientByUserId(user.id);
        } catch (error) {
            console.warn("Failed to get client:", error);
        }

        try {
            await getPrestataireByUserId(user.id);
        } catch (error) {
            console.warn("Failed to get prestataire:", error);
        }
        window.location.href = "/";
    })

}

async function getUserByEmail(email) {
    const response = await fetch('/api/users/email/' + email);
    if (!response.ok) throw new Error("Http error" + response.status);
    return await response.json();
}

async function getPrestataireByUserId(userId) {
    const response = await fetch('/api/prestataires/userId/' + userId);
    if (!response.ok) throw new Error("Http error" + response.status);
    const presta = await response.json();
    console.log(presta);

    presta.forEach( pre => {
        localStorage.setItem("prestataire", JSON.stringify(pre));
    })
}

async function getClientByUserId(userId) {
    const response = await fetch("/api/clients/userId/" + userId);
    if (!response.ok) throw new Error("Http error " + response.status);
    const client = await response.json();
    console.log(client);

    client.forEach(cli => {
        localStorage.setItem("client", JSON.stringify(cli));
    });
}

// Vérifier que on est connecté
function checkLoggedIn() {

    const user = localStorage.getItem("user");
    if(user == null) {
        window.location.href = "/login";
    }

}

// remplir si on fait des fonctions d'admin
function checkRights() {

}

// Pas encore testé je regarderai plus tard
function logOut() {
    window.location.reload();
    localStorage.clear();
}