document.addEventListener('DOMContentLoaded', () => {
    function closeModal(el){
        el.classList.remove('is-active');
    };

    function openModal(el){
        el.classList.add('is-active');
    };

    function closeAllModals(){
        document.querySelectorAll('.modal').forEach(modal => {
            closeModal(modal);
        });
    };

    function populateModalElements(result) {
        document.getElementById('clientName').innerHTML = "Edit Appointment: " 
            + result.firstName + ' ' + result.lastName;
    };

    let selectedAppointmentId = "";
    const table = document.getElementById('schedule-table');
    table.querySelectorAll('tbody tr').forEach(row => {
        row.addEventListener('click', function(){
            table.querySelectorAll('tbody tr').forEach(
                row => row.classList.remove('is-selected', 'is-link', 'has-text-white')
            );
            this.classList.add('is-selected', 'is-link', 'has-text-white');
            selectedAppointmentId = this.dataset.id;
        });
    });

    const editButton = document.getElementById('editButton');
    editButton.addEventListener('click', async function(){
        try {
            const response = await fetch('/api/view-appointment?selected_appointment=' + selectedAppointmentId);
            const result = await response.json();
            if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status);
            }
            console.log(result);
            populateModalElements(result);
            const editModal = document.getElementById('editModal');
            openModal(editModal);
        } catch (error) {
            console.error("Error.");
            throw error;
        }
    });

    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', function(){
        console.log('Delete button');
    });

    function checkAppointmentSelected() {
        console.log('Checking appointment selected');
        const selectedRow = table.querySelector('tbody tr.is-selected');
        if (selectedRow) {
            editButton.disabled = false;
            deleteButton.disabled = false;
        } else {
            editButton.disabled = true;
            deleteButton.disabled = true;
        }
    }

    table.addEventListener('click', checkAppointmentSelected);

    checkAppointmentSelected();

    const serviceDropDown = document.getElementById('dropdown-trigger');
    serviceDropDown.addEventListener('click', function() {
        const dropdown = document.getElementsByClassName('dropdown')[0];
        dropdown.classList.toggle('is-active');
    });

    const cancelButtons = document.querySelectorAll('.cancel-buttons');
    cancelButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });

});

