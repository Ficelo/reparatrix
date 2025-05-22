async function loadAllUsers(){
    try {
        const response = await fetch('/api/users') ;
        if (!response.ok) {
            throw new Error('Erreur pour fetch les users') ;
        }
        const users = await response.json() ;
        displayUsers(users) ;
    } catch (error) {
        console.error('Error loading users :', error) ;
    }
}

function displayUsers(users){
    const tableBody = document.getElementById('usersTable') ;
    tableBody.innerHTML = '' ;

    users.forEach(user => {
        const row = document.createElement('tr') ;
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="modifier-button">Modifier</button>
                <button class="supprimer-button">Supprimer</button>
            </td>
        `;
        tableBody.appendChild(row) ;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadAllUsers() ;
});