let SERVICE = null;


function postAvis() {
    // TODO : faire un check pour vérifier que tout est bien rempli
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const commentaireInput = document.getElementById("commentaire");
    const commentaire = commentaireInput.value;
    let selectedRating;

    ratingInputs.forEach(input => {
        if (input.checked) {
            selectedRating = input.value;
        }
    });

    let avisData = {
        commentaire: commentaire,
        note: parseInt(selectedRating),
        service: SERVICE,
        user : { // test faudra mettre le vrai après
            "id": 1,
            "username": "username A",
            "password": "1234",
            "email": "testuser@gmail.com",
            "role": "user"
        }
    }

    const response = fetch("/api/avis",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(avisData)
    });
}

async function loadService() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("service");
    const service = getService(id);

    const serviceDiv = document.getElementById("service");
    const avisDiv = document.getElementById("avis");


    service.then((serv) => {
        console.log(serv);
        SERVICE = serv;
        const srv = document.createElement("p");
        srv.innerText = "id : " + serv.id + ", order id : " + serv.order_id + ", description : " + serv.description;
        serviceDiv.appendChild(srv);

        const avis = getAvis(serv.id);

        avis.then((response) => {
            response.map((avi) => {
                console.log(avi);
                const aviP = document.createElement("p");
                aviP.innerText = "id : " + avi.id + ", note : " + avi.note + ", commentaire : " + avi.commentaire;
                avisDiv.appendChild(aviP);
            })
        })

    });


}

async function getService(id) {
    const response = await fetch('/api/services/' + id);
    if (!response.ok) throw new Error("HTTP error " + response.status);
    return await response.json();
}

async function getAvis(serviceId){
    const response = await fetch('/api/avis/service/' + serviceId);
    if (!response.ok) throw new Error("HttP error " + response.status);
    return await response.json();
}