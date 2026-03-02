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

    document.getElementById('modalApptTime').textContent = apptTime;
    document.getElementById('modalService').textContent = service;

    const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.add('is-active');
    }

    document.getElementById('delete-appt-button').addEventListener('click', function() {
        deleteAppointment(row.dataset.id);
    });

    document.getElementById('save-appt-button').addEventListener('click', function() {
        updateAppointment(row.dataset.id, dateInput.value);
    });
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

async function deleteAppointment(appt_id) {
    const url = '/api/delete-appointment';
    try {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apptId: parseInt(appt_id, 10)
            })
        }).then(response => {
            if (response.ok) {
                location.reload();
            } else {
                console.error("Failed to delete appointment.");
            }
        });
    } catch (error) {
        console.error("Error fetching available times: ", error);
    }
};

async function updateAppointment(appt_id, new_date) {
    const url = '/api/update-appointment';
    try {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apptId: parseInt(appt_id, 10),
                newDate: new_date
            })
        }).then(response => {
            if (response.ok) {
                location.reload();
            } else {
                console.error("Failed to update appointment.");
            }
        });
    } catch (error) {
        console.error("Error fetching available times: ", error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initializeTable();
    initializeModals();
});

