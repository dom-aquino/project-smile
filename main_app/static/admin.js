document.addEventListener('DOMContentLoaded', () => {
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
    table.addEventListener('click', checkAppointmentSelected);

    const editButton = document.getElementById('editButton');
    editButton.addEventListener('click', async function(){
        try {
            const response = await fetch('/api/view-appointment?selected_appointment=' + selectedAppointmentId);
            const result = await response.json();
            if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status);
            }
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

    checkAppointmentSelected();
});
