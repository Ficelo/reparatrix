async function loadAllPrestataires(){
    try {
        const response = await fetch('/api/prestataires') ;
        if (!response.ok) {
            throw new Error('Erreur pour fetch les prestataires') ;
        }
        const prestataires = await response.json() ;
        displayPrestataires(prestataires) ;
    } catch (error) {
        console.error('Error loading prestataires :', error) ;
    }
}

function displayPrestataires(prestataires){
    const tableBody = document.getElementById('prestatairesTable') ;
    tableBody.innerHTML = '' ;

    prestataires.forEach(prestataire => {
        const row = document.createElement('tr') ;
        row.innerHTML = `
            <td>${prestataire.id}</td>
            <td>${prestataire.entreprise}</td>
            <td>${prestataire.profession}</td>
            <td>${prestataire.localisation}</td>
            <td>${prestataire.siret}</td>
            <td>
                <button class="modifier-button">Modifier</button>
                <button class="supprimer-button">Supprimer</button>
            </td>
        `;
        tableBody.appendChild(row) ;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadAllPrestataires() ;
});