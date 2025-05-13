async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userReponse = getUserByEmail(email);

    // ça vérifie pas grand chose pour l'instant c'est juste pour tester
    userReponse.then((user) => {
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("user in localstorage", JSON.parse(localStorage.getItem("user")));
        window.location.href = "/";
    })

}

async function getUserByEmail(email) {
    const response = await fetch('/api/users/email/' + email);
    if (!response.ok) throw new Error("Http error" + response.status);
    return await response.json();
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
    localStorage.clear();
}