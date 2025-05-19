async function loadFAQ(){
    const faqContainer = document.getElementById('faq-container') ;

    try {
        const response = await fetch('http://localhost:8080/api/faq') ;
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status) ;
        }
        const allFaqs = await response.json() ;

        const displayedFaqs = allFaqs.filter(faq => [3,4,6,7,8].includes(faq.id_faq)) ; //choix au hasard

        faqContainer.innerHTML = '' ;

        if (displayedFaqs.length === 0) {
            faqContainer.innerHTML = '<div class="faq-box"><h2>Aucune question-réponse trouvée dans la base de données</h2></div>' ;
            return ;
        }

        displayedFaqs.forEach(faq => {
            const faqBox = document.createElement('div') ;
            faqBox.className = 'faq-box' ;

            const questionElement = document.createElement('h1') ;
            questionElement.textContent = faq.question ;

            const reponseElement = document.createElement('h2') ;
            reponseElement.textContent = faq.reponse ;

            faqBox.appendChild(questionElement) ;
            faqBox.appendChild(reponseElement) ;
            faqContainer.appendChild(faqBox) ;
        });

    } catch (error) {
        console.error('Error fetching FAQs :', error) ;
        faqContainer.innerHTML = '<div class="faq-box"><h2>La FAQ ne se charge pas, veuillez réessayer plus tard.</h2></div>' ;
    }
}

document.addEventListener('DOMContentLoaded', loadFAQ) ;