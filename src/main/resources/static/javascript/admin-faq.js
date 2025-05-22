async function loadAllFAQs(){
    try {
        const response = await fetch('/api/faq') ;
        if (!response.ok) {
            throw new Error('Erreur pour fetch la FAQ') ;
        }
        const faqs = await response.json() ;
        displayFAQs(faqs) ;
    } catch (error) {
        console.error('Error loading FAQ :', error) ;
    }
}

function displayFAQs(faqs){
    const tableBody = document.getElementById('faqTable') ;
    tableBody.innerHTML = '' ;

    faqs.forEach(faq => {
        const row = document.createElement('tr') ;
        row.innerHTML = `
            <td>${faq.id_faq}</td>
            <td>${faq.question}</td>
            <td>${faq.reponse}</td>
            <td>
                <button class="modifier-button">Modifier</button>
                <button class="supprimer-button">Supprimer</button>
            </td>
        `;
        tableBody.appendChild(row) ;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadAllFAQs() ;
});