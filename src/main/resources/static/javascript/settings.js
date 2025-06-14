let USER = {}
let GEOLOCATION = ""

function loadUser() {

    USER = JSON.parse(localStorage.getItem("user"));
    console.log(USER);

    const inputUsername = document.getElementById("input-username");
    const inputEmail = document.getElementById("input-email");
    const inputPassword = document.getElementById("input-password");

    inputUsername.value = USER.username;
    inputEmail.value = USER.email;
    inputPassword.value = USER.password;

}

function changeUsername() {
    const inputUsername = document.getElementById("input-username");

    USER.username = inputUsername.value;

    const result = fetch("api/users/" + USER.id, {
        method : "PUT",
        headers : {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(USER)
    }).then(res => res.json())
        .then(updated => {
            USER = updated;
            localStorage.setItem("user", JSON.stringify(USER))
        })

}

function changePassword() {
    const inputPassword = document.getElementById("input-password");

    USER.password = inputPassword.value;

    const result = fetch("api/users/" + USER.id, {
        method : "PUT",
        headers : {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(USER)
    }).then(res => res.json())
        .then(updated => {
            USER = updated;
            localStorage.setItem("user", JSON.stringify(USER))
        })

}

function changeEmail() {
    const inputEmail = document.getElementById("input-email");

    USER.email = inputEmail.value;

    const result = fetch("api/users/" + USER.id, {
        method : "PUT",
        headers : {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(USER)
    }).then(res => res.json())
        .then(updated => {
            USER = updated;
            localStorage.setItem("user", JSON.stringify(USER))
        })

}

function getGeolocation(event) {

    event.preventDefault();

    navigator.geolocation.getCurrentPosition((position) => {
        const location = position.coords.longitude + ", " + position.coords.latitude;
        window.localStorage.setItem("location", location);

        GEOLOCATION = location;

    }, () => {
        alert("Échec de la géolocalisation.");
    });


    const result = fetch("api/users/" + USER.id, {
        method : "PUT",
        headers : {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(USER)
    }).then(res => res.json())
        .then(updated => {
            USER = updated;
            localStorage.setItem("user", JSON.stringify(USER))
        })
}