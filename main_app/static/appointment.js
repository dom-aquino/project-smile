// Universal variables
var formData = {
    firstName: '',
    lastName: '',
    contactNumber: '',
    service: '',
    apptDate: '',
    apptTime: ''
};

var stepNumber = 1;

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    getCurrentDate();
    getAvailableTimes();
    updateDisplay(); // To be deleted
    showStep(stepNumber);

    // To be deleted
    bindInput('firstName', 'firstName');
    bindInput('lastName', 'lastName');
    bindInput('contactNumber', 'contactNumber');
    bindInput('service', 'service');
    bindInput('apptDate', 'apptDate');

    document.getElementById('apptDate').addEventListener('change', function(event) {
        getAvailableTimes();
    });
});

// Functions
async function getAvailableTimes() {
    const date = document.getElementById('apptDate').value;
    const url = '/api/get-available-time?selected_date=' + date;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('HTTP error, status = ' + response.status);
        }
        const data = await response.json();
        clearTimeSlotsButtons();
        createTimeSlotsButtons(data['available-time']);
        updateDisplay();
    } catch (error) {
        console.error("Error fetching available times: ", error);
    }
}

function createTimeSlotsButtons(availableTime) {
    const container = document.getElementById('time-slots');
    for (const key of Object.keys(availableTime)) {
        const button = document.createElement('button');
        button.textContent = availableTime[key];
        button.className = "button mt-2 mx-2"; // Ugly hack to make it look decent
        button.setAttribute("data-value", key);
        button.addEventListener('click', function() {
            chooseTimeSlot(key, button);
        });
        container.appendChild(button);
    }
}

function clearTimeSlotsButtons() {
    const buttons = document.querySelectorAll('#time-slots button');
    buttons.forEach(function(button) {
        button.remove();
    });
    formData.apptTime = '';
}

function getCurrentDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var today = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    document.getElementById('apptDate').value = formData.apptDate = today;
}

// To be deleted
// This just shows how to bind an input to a variable
function bindInput(id, key) {
    var element = document.getElementById(id);
    element.addEventListener('input', function() {
        formData[key] = element.value;
        updateDisplay();
    });
}

function updateDisplay() {
    document.getElementById('displayFirstName').innerText = formData.firstName;
    document.getElementById('displayLastName').innerText = formData.lastName;
    document.getElementById('displayContactNumber').innerText = formData.contactNumber;
    document.getElementById('displayService').innerText = formData.service;
    document.getElementById('displaySchedule').innerText = formData.apptDate;
    document.getElementById('displayTime').innerText = formData.apptTime;
}

function chooseTimeSlot(key, button) {
    formData.apptTime = key;
    updateDisplay();

    var buttons = document.querySelectorAll('#time-slots button');
    buttons.forEach(function(btn) {
        btn.classList.remove('selected-service');
    });

    button.classList.add('selected-service');
}

function chooseService(service, button) {
    formData.service = service;
    updateDisplay();

    var buttons = document.querySelectorAll('.service-button');
    buttons.forEach(function(btn) {
        btn.classList.remove('selected-service');
    });

    button.classList.add('selected-service');
}

function showStep(stepNumber) {
    if (stepNumber == 1) {
        document.getElementById('step1').style.display = 'block';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'none';
        document.getElementById('previous-step').style.display = 'none';
        document.getElementById('next-step').style.display = 'block';
        document.getElementById('confirm-booking').style.display = 'none';
    } else if (stepNumber == 2) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
        document.getElementById('step3').style.display = 'none';
        document.getElementById('previous-step').style.display = 'block';
        document.getElementById('next-step').style.display = 'block';
        document.getElementById('confirm-booking').style.display = 'none';
    } else if (stepNumber == 3) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';
        document.getElementById('previous-step').style.display = 'none';
        document.getElementById('next-step').style.display = 'none';
        document.getElementById('confirm-booking').style.display = 'block';
    }
}

function nextStep() {
    if (stepNumber === 3) {
        return;
    }
    if (stepNumber === 1 && !verifyName()) {
        return;
    }
    if (stepNumber === 2 && !verifyService()) {
        return;
    }
    stepNumber++;
    showStep(stepNumber);
}

function previousStep() {
    if (stepNumber === 1) {
        return;
    }
    stepNumber--;
    showStep(stepNumber);
}

function verifyName() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    firstName = firstName.replace(/\s/g, '');
    lastName = lastName.replace(/\s/g, '');

    if (firstName.length < 2) {
        addHighlight('firstName');
        addFlagPatientName();
        return false;
    } else if (lastName.length < 2) {
        addHighlight('lastName');
        addFlagPatientName();
        return false;
    }

    removeHighlight('firstName');
    removeHighlight('lastName');
    removeFlagPatientName();

    return true;
}

function verifyService() {
    return true;
}

function addHighlight(inputId) {
    var input = document.getElementById(inputId);
    input.classList.add('invalid-input');
}

function removeHighlight(inputId) {
    var input = document.getElementById(inputId);
    input.classList.remove('invalid-input');
}

function addFlagPatientName() {
    var patientName = document.getElementById('patient-name');
    patientName.innerText = 'Patient\'s Name (Please enter at least 2 characters)';
    patientName.style.color = 'red';
}

function removeFlagPatientName() {
    var patientName = document.getElementById('patient-name');
    patientName.innerText = 'Patient\'s Name';
    patientName.style.color = 'black';
}

