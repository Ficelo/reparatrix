function getLocalisation(){
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        let affichage = document.createElement("p")
        affichage.innerText = "lat : " + position.coords.latitude + ", lon : " + position.coords.longitude;
        document.body.appendChild(affichage);
    });
}