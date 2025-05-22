async function loadAllAvis(){
    try {
        const response = await fetch('/api/avis') ;
        if (!response.ok) {
            throw new Error('Erreur pour fetch les avis') ;
        }
        const avis = await response.json() ;
        displayAvis(avis) ;
    } catch (error) {
        console.error('Error loading avis :', error) ;
    }
}

function displayAvis(avis){
    const tableBody = document.getElementById('avisTable') ;
    tableBody.innerHTML = '' ;

    avis.forEach(avis => {
        const row = document.createElement('tr') ;
        row.innerHTML = `
            <td>${avis.id}</td>
            <td>${avis.note}</td>
            <td>${avis.commentaire}</td>
            <td>${avis.user_id}</td>
            <td>${avis.service_id}</td>
            <td>
                <button class="modifier-button">Modifier</button>
                <button class="supprimer-button">Supprimer</button>
            </td>
        `;
        tableBody.appendChild(row) ;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadAllAvis() ;
});