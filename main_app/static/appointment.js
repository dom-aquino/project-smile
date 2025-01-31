var formData = {
    firstName: '',
    lastName: '',
    contactNumber: '',
    service: '',
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
}

// To be deleted
bindInput('firstName', 'firstName');
bindInput('lastName', 'lastName');
bindInput('contactNumber', 'contactNumber');
bindInput('service', 'service');

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
}

function nextStep() {
    if (stepNumber === 2) {
        return;
    }
    if (stepNumber === 1 && !verifyName()) {
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
        return false;
    } else if (lastName.length < 2) {
        addHighlight('lastName');
        return false;
    }

    removeHighlight('firstName');
    removeHighlight('lastName');

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