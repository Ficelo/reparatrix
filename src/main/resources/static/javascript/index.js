function goToSearch() {

    const searchbar = document.getElementById("search");

    window.location.href = "/search?s=" + searchbar.value;

}

function searchEnter() {
    if(event.key === 'Enter'){
        goToSearch();
    }
}