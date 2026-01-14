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
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('is-active');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTable();
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeAllModals();
        }
    });
});

