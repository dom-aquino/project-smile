const viewAppointmentsButton = document.querySelector('#viewAppointments');

viewAppointmentsButton.addEventListener("click", function() {
    console.log("View appointments button is clicked.");
    fetch("api/view-appointments", {
        method: "POST",
    });
});
