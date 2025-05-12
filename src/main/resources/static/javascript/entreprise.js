async function loadEntreprise() {

    const titre = document.getElementById("titre-page");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("entreprise");
    const prestataire = await getPrestataire(id);
    const services = await getServices(id);
    console.log(prestataire);

    const servicesDiv = document.getElementById("services");

    services.map(service => {
        console.log(service)
        const serv = new ServiceCard(service.description, service.prix, prestataire.profession, service.id);
        servicesDiv.appendChild(serv);
    });

    titre.innerText = "Entreprise : " + prestataire.entreprise;
}

async function getPrestataire(id){
    const response = await fetch('/api/prestataires/' + id);
    if (!response.ok) throw new Error("HTTP error " + response.status);
    return await response.json();
}

async function getServices(idPrestataire){
    const response = await fetch('/api/services/prestataireId/' + idPrestataire);
    if (!response.ok) throw new Error("HTTP error " + response.status);
    return await response.json();
}

class ServiceCard extends HTMLElement {

    constructor(description, prix, profession, id) {
        super();
        this.attachShadow({mode: "open"});

        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
            <style>
                .card {
                    margin-bottom: 5px;
                }
                .entreprise-affichage {
                    display: flex;
                    flex-direction: row;
                }
                
                img {
                    width: 200px;
                    height: auto;
                    border-radius: 10px;
                    object-fit: cover;
                    margin-right: 20px;
                }
                
            </style>
                <div class="card" onclick="window.location = 'service?service=${id}'">
                    <div class="card-body entreprise-affichage">
                        <img alt="image métier" src="../images/professions/${profession}.png"/>
                        <div>
                            <p>${description}</p>
                            <p>Prix : <span id="prix">${prix} €</span></p>
                        </div>
                   </div>
               </div>      
            `;
    }

}
customElements.define("service-card", ServiceCard);