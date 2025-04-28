function searchForProfession(inputId) {

    let input = document.getElementById(inputId);
    let distanceMax = document.getElementById("distanceRange")
    let noteMin = document.getElementById("noteRange")
    const resultats = document.getElementById("results")

    fetch('/api/prestataires?profession=' + input.value + "&noteMin=" + noteMin.value + "&distanceMax=" + distanceMax.value)
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

function updateSearchValueDisplay(displayId, rangeId, suffix) {



    const display = document.getElementById(displayId);
    console.log(display.innerText)
    const range = document.getElementById(rangeId);

    let innerText = display.innerText.split(":")
    display.innerText = innerText[0] + " : " + range.value + suffix;

    //console.log(range.value)

}