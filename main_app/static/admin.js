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
                openEditAppointmentModal(row);
            });
        });
    });
}

function openEditAppointmentModal(row) {
    const firstName = row.dataset.firstName;
    const lastName = row.dataset.lastName;
    const contactNumber = row.dataset.contactNumber;
    const apptDate = row.dataset.apptDate;
    const apptTime = row.dataset.apptTime;
    const service = row.dataset.service;

    document.getElementById('modalFirstName').textContent = firstName;
    document.getElementById('modalLastName').textContent = lastName;
    document.getElementById('modalContactNumber').textContent = contactNumber;

    const date = document.getElementById('modalApptDate');
    const dateInput = document.createElement('input');
    dateInput.className = 'input';
    dateInput.type = 'date';
    dateInput.value = apptDate;
    date.innerHTML = '';
    date.appendChild(dateInput);

    //document.getElementById('modalApptDate').textContent = apptDate;
    document.getElementById('modalApptTime').textContent = apptTime;
    document.getElementById('modalService').textContent = service;

    const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.add('is-active');
    }
}

function closeModal(modal) {
    modal.classList.remove('is-active');
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('is-active');
    });
}

function initializeModals() {
    const closeButtons = document.querySelectorAll('.close-buttons');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    const modalBackgrounds = document.querySelectorAll('.modal-background');
    modalBackgrounds.forEach(background => {
        background.addEventListener('click', function() {
            const modal = background.closest('.modal');
            closeModal(modal);
        });
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeAllModals();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTable();
    initializeModals();
});

