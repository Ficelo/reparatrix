async function cancelOrder() {

    localStorage.removeItem("currentOrder");
    window.location.href = "/profil";

}