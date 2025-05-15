GEOLOCATION = "";

// La fonction est mega ghetto mais ça marche donc osef y'a pas le temps
async function createAccountValidation(event) {
    event.preventDefault();

    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    const passwordConfirm = document.getElementById("password-confirm");
    const radioEntreprise = document.getElementById("radio-entreprise");
    const entreprise = document.getElementById("entreprise");
    const profession = document.getElementById("profession");
    const siret = document.getElementById("siret");

    if (GEOLOCATION === "") {
        alert("Veuillez activer la géolocalisation.");
        return false;
    }

    if (!nom.value.trim() || !prenom.value.trim() || !password.value.trim() || !passwordConfirm.value.trim() || !email.value.trim()) {
        alert("Veuillez remplir tous les champs.");
        return false;
    }

    if (password.value !== passwordConfirm.value) {
        alert("Les mots de passe ne correspondent pas.");
        return false;
    }

    if (radioEntreprise.checked) {
        if (
            !entreprise.value.trim() ||
            !profession.value.trim() ||
            !siret.value.trim()
        ) {
            alert("Veuillez remplir tous les champs d'information sur l'entreprise.");
            return false;
        }

        if (!/^\d{14}$/.test(siret.value)) {
            alert("Le numéro SIRET doit contenir exactement 14 chiffres.");
            return false;
        }
    }

    const user = {
        username: nom.value + " " + prenom.value,
        password: password.value,
        email: email.value,
        role: "user"
    };

    try {
        // Save user
        const userResponse = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!userResponse.ok) {
            throw new Error("Erreur lors de la création de l'utilisateur.");
        }

        const userFetchResponse = await fetch("/api/users/email/" + encodeURIComponent(user.email));
        if (!userFetchResponse.ok) {
            throw new Error("Erreur lors de la récupération de l'utilisateur.");
        }

        const savedUser = await userFetchResponse.json();

        if (radioEntreprise.checked) {
            const prestataire = {
                profession: profession.value,
                localisation: GEOLOCATION,
                entreprise: entreprise.value,
                note: 0,
                siret: siret.value,
                user: savedUser
            };

            const prestaResponse = await fetch("/api/prestataires", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(prestataire)
            });

            if (!prestaResponse.ok) {
                throw new Error("Erreur lors de la création du prestataire.");
            }

        } else {
            const client = {
                nom: nom.value,
                localisation: GEOLOCATION,
                user: savedUser
            };

            const clientResponse = await fetch("/api/clients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(client)
            });

            if (!clientResponse.ok) {
                throw new Error("Erreur lors de la création du client.");
            }
        }

        alert("Compte créé avec succès !");
        return true;

    } catch (error) {
        console.error(error);
        alert("Une erreur est survenue lors de la création du compte.");
        return false;
    }
}

function getGeolocation(event) {

    event.preventDefault();

    navigator.geolocation.getCurrentPosition((position) => {
        const location = position.coords.longitude + ", " + position.coords.latitude;
        window.localStorage.setItem("location", location);

        GEOLOCATION = location;

        const createButton = document.getElementById("create-button");
        createButton.disabled = false;
    }, () => {
        alert("Échec de la géolocalisation.");
    });
}

function toggleEntrepriseFields() {
    const radioEntreprise = document.getElementById("radio-entreprise");
    const entrepriseFields = document.getElementById("entreprise-fields");

    entrepriseFields.style.display = radioEntreprise.checked ? "flex" : "none";
}




