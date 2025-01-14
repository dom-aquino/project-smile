var formData = {
    firstName: '',
    lastName: '',
    contactNumber: '',
    emailAddress: '',
    service: '',
};

function bindInput(id, key) {
    var element = document.getElementById(id);
    element.addEventListener('input', function() {
        formData[key] = element.value;
        updateDisplay();
    });
}

function updateDisplay() {
    document.getElementById('displayFirstName').innerText = formData.firstName;
}

bindInput('firstName', 'firstName');

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