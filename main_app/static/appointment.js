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
    document.getElementById("step1").style.display = (stepNumber === 1) ? "block" : "none";
    document.getElementById("step2").style.display = (stepNumber === 2) ? "block" : "none";
}

function nextStep() {
    stepNumber++;
    showStep(stepNumber);
}

function previousStep() {
    stepNumber--;
    showStep(stepNumber);
}

showStep(stepNumber);