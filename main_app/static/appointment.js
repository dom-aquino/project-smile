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
    showStep(stepNumber);

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
    } catch (error) {
        console.error("Error fetching available times: ", error);
    }
}

function createTimeSlotsButtons(availableTime) {
    const container = document.getElementById('time-slots');
    for (const key of Object.keys(availableTime)) {
        const button = document.createElement('button');
        button.textContent = availableTime[key];
        button.className = "button mt-2 mx-2";
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

function bindInput(id, key) {
    var element = document.getElementById(id);
    element.addEventListener('input', function() {
        formData[key] = element.value;
    });
}

function chooseTimeSlot(key, button) {
    formData.apptTime = key;
    var buttons = document.querySelectorAll('#time-slots button');
    buttons.forEach(function(btn) {
        btn.classList.remove('selected-service');
    });
    button.classList.add('selected-service');
}

function chooseService(service, button) {
    formData.service = service;
    var buttons = document.querySelectorAll('.service-button');
    buttons.forEach(function(btn) {
        btn.classList.remove('selected-service');
    });
    button.classList.add('selected-service');
}

function showStep(stepNumber) {
    document.getElementById("step1").style.display = (stepNumber == 1) ? "block" : "none";
    document.getElementById("step2").style.display = (stepNumber == 2) ? "block" : "none";
    document.getElementById("step3").style.display = (stepNumber == 3) ? "block" : "none";
    showNavButtons(stepNumber);
}

function showNavButtons(stepNumber) {
    clearNavButtons();
    if (stepNumber === 1) {
        const container = document.getElementById("nav-button-two");
        const button = document.createElement("button");
        button.className = "button is-fullwidth";
        button.innerText = "Next";
        button.addEventListener('click', function() {
            nextStep();
        });
        container.appendChild(button);
    } else if (stepNumber === 2) {
        var container = document.getElementById("nav-button-one");
        var button = document.createElement("button");
        button.className = "button is-fullwidth";
        button.innerText = "Previous";
        button.addEventListener('click', function() {
            previousStep();
        });
        container.appendChild(button);

        container = document.getElementById("nav-button-two");
        button = document.createElement("button");
        button.className = "button is-fullwidth";
        button.innerText = "Next";
        button.addEventListener('click', function() {
            nextStep();
        });
        container.appendChild(button);
    } else if (stepNumber === 3) {
        var container = document.getElementById("nav-button-one");
        var button = document.createElement("button");
        button.className = "button is-fullwidth";
        button.innerText = "Previous";
        button.addEventListener('click', function() {
            previousStep();
        });
        container.appendChild(button);

        container = document.getElementById("nav-button-two");
        button = document.createElement("button");
        button.className = "button is-fullwidth";
        button.innerText = "Confirm";
        button.addEventListener('click', function() {
            confirmAppointment();
        });
        container.appendChild(button);
    }
}

function clearNavButtons() {
    const buttons = document.querySelectorAll('#nav-button-one button, #nav-button-two button');
    buttons.forEach(function(button) {
        button.remove();
    });
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

async function confirmAppointment() {
    fetch('/api/create-appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP error, status = ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Appointment confirmed!');
            window.location.href = '/';
        } else {
            alert('Error confirming appointment: ' + data.message);
        }
    })
    .catch(error => {
        console.error("Error confirming appointment: ", error);
        alert('Error confirming appointment. Please try again later.');
    });
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

