
async function redirectAndOrder() {
    let orderStatus = JSON.parse(localStorage.getItem("currentOrder"));

    try {
        const response = await fetch("api/orderstatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderStatus)
        });

        const data = await response.json();
        console.log("data:", data);

        localStorage.removeItem("currentOrder");

        window.location.href = "/profil";

    } catch (err) {
        console.error("Error submitting order:", err);
    }
}
