var selectedAppointmentId = "";

const table = document.getElementById('schedule-table');
table.querySelectorAll('tbody tr').forEach(row => {
    row.addEventListener('click', function(){
        table.querySelectorAll('tbody tr').forEach(
            row => row.classList.remove('is-selected', 'is-link', 'has-text-white')
        );
        this.classList.add('is-selected', 'is-link', 'has-text-white');
        selectedAppointmentId = this.dataset.id;
        document.getElementById('displayAppointmentId').innerText = selectedAppointmentId;
    });
});

const editButton = document.getElementById('editButton');
editButton.addEventListener('click', function(){
    console.log('Edit button');
});

const deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', function(){
    console.log('Delete button');
});

