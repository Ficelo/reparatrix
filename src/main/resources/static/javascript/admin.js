let USER = {}


function checkIfAdmin() {

    USER = JSON.parse(localStorage.getItem("user"));

    if (!USER || USER.role !== "admin") {
        window.location.href = "/profil";
        return;
    }

    fetch("/api/users")
        .then(response => response.json())
        .then(users => {
            const table = document.querySelector("table");

            users.forEach(user => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteUser(${user.id}, this)">Supprimer</button>
                    </td>
                `;

                table.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
        });
}

function deleteUser(userId, buttonElement) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;

    fetch(`/api/users/${userId}`, {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                const row = buttonElement.closest("tr");
                row.remove();
            } else {
                alert("Erreur lors de la suppression de l'utilisateur.");
            }
        })
        .catch(error => {
            console.error("Erreur réseau :", error);
        });
}
