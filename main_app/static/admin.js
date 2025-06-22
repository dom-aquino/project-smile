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

let selectedAppointmentId = "";
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
editButton.addEventListener('click', async function(){
    try {
        const response = await fetch('/api/view-appointment?selected_appointment=' + selectedAppointmentId);
        const result = await response.json();
        if (!response.ok) {
            throw new Error('HTTP error, status = ' + response.status);
        }
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

document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        closeAllModals();
    }
});

});
