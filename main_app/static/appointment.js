var formData = {
    firstName: '',
    lastName: '',
    contactNumber: '',
    service: '',
    schedule: '',
};

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
    document.getElementById('displaySchedule').innerText = formData.schedule;
}

// To be deleted
bindInput('firstName', 'firstName');
bindInput('lastName', 'lastName');
bindInput('contactNumber', 'contactNumber');
bindInput('service', 'service');
bindInput('schedule', 'schedule');

function chooseService(service, button) {
    formData.service = service;
    updateDisplay();

    var buttons = document.querySelectorAll('.service-button');
    buttons.forEach(function(btn) {
        btn.classList.remove('selected-service');
    });

    button.classList.add('selected-service');
}

var stepNumber = 1;

function showStep(stepNumber) {
    document.getElementById("step1").style.display = (stepNumber == 1) ? "block" : "none";
    document.getElementById("step2").style.display = (stepNumber == 2) ? "block" : "none";
    document.getElementById("step3").style.display = (stepNumber == 3) ? "block" : "none";
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

showStep(stepNumber);

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