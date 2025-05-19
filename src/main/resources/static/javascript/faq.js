let originalFAQs = [];

async function loadInitialFAQs(){
    const faqContainer = document.getElementById('faq-container');

    try {
        const response = await fetch('http://localhost:8080/api/faq');
        if (!response.ok) throw new Error('HTTP error ' + response.status);

        const allFaqs = await response.json();
        originalFAQs = allFaqs.filter(faq => [3,4,6,7,8].includes(faq.id_faq));
        displayFAQs(originalFAQs);
    } catch (error) {
        console.error('Error loading FAQs:', error);
        faqContainer.innerHTML = '<div class="faq-box"><h2>La FAQ ne se charge pas, veuillez réessayer plus tard.</h2></div>';
    }
}

function displayFAQs(faqs) {
    const faqContainer = document.getElementById('faq-container');
    faqContainer.innerHTML = '';

    if (faqs.length === 0) {
        faqContainer.innerHTML = '<div class="faq-box"><h2>Aucune question-réponse trouvée</h2></div>';
        return;
    }

    faqs.forEach(faq => {
        const faqBox = document.createElement('div');
        faqBox.className = 'faq-box';

        const questionElement = document.createElement('h1');
        questionElement.textContent = faq.question;

        const answerElement = document.createElement('h2');
        answerElement.textContent = faq.reponse;

        faqBox.appendChild(questionElement);
        faqBox.appendChild(answerElement);
        faqContainer.appendChild(faqBox);
    });
}

async function searchFAQs(keyword) {
    try {
        const response = await fetch(`http://localhost:8080/api/faq/search?query=${encodeURIComponent(keyword)}`);
        if (!response.ok) throw new Error('HTTP error ' + response.status);

        const searchResults = await response.json();
        displayFAQs(searchResults);
    } catch (error) {
        console.error('Search error:', error);
        document.getElementById('faq-container').innerHTML =
            '<div class="faq-box"><h2>Erreur lors de la recherche</h2></div>';
    }
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resetButton = document.getElementById('reinitialiser-button');

    searchButton.addEventListener('click', () => {
        const keyword = searchInput.value.trim();
        if (keyword) {
            searchFAQs(keyword);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const keyword = searchInput.value.trim();
            if (keyword) {
                searchFAQs(keyword);
            }
        }
    });

    resetButton.addEventListener('click', () => {
        searchInput.value = '';
        displayFAQs(originalFAQs);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadInitialFAQs();
    setupSearch();
});