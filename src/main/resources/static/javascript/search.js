function searchForProfession(inputId) {

    let input = document.getElementById(inputId);
    const resultats = document.getElementById("results")

    fetch('/api/prestataires/profession/' + input.value)
        .then(reponse => reponse.json())
        .then(prestas => {
            const prestaList = document.createElement('ul');
            resultats.appendChild(prestaList);
               prestas.forEach(presta => {
                   const li = document.createElement('li');
                   console.log(presta)
                   console.log(presta.user)
                   li.textContent = `id : ${presta.id}, profession : ${presta.profession}, localisation : ${presta.localisation}, username : ${presta.user.username}`;
                   prestaList.appendChild(li);
               });
        })
        .catch( err => console.error('Error fetching prestataires:', err))

}