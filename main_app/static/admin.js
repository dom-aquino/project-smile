function initializeTable() {
    let selectedAppointmentId = "";
    const table = document.getElementById('schedule-table');
    table.querySelectorAll('tbody tr').forEach(row => {
        row.addEventListener('click', function(){
            table.querySelectorAll('tbody tr').forEach(
                row => row.classList.remove('is-selected',
                    'is-link', 'has-text-white')
            );
            this.classList.add('is-selected', 'is-link', 'has-text-white');
            selectedAppointmentId = this.dataset.id;
        });

        row.querySelectorAll('td').forEach(cell => {
            cell.addEventListener('dblclick', function() {
                openModal(row.dataset.id);
            });
        });
    });
}

function openModal(id) {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.add('is-active');
        console.log("Opening modal for id:", id);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTable();
});

