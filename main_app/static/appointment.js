function addMonths(date, count) {
  if (date && count) {
    var m, d = (date = new Date(+date)).getDate();
    date.setMonth(date.getMonth() + count, 1);
    m = date.getMonth();
    date.setDate(d);
    if (date.getMonth() !== m) date.setDate(0);
  }
  return date;
}

function getMinDate(dateNow) {
    let month = String(dateNow.getMonth() + 1).padStart(2, '0');
    let day = String(dateNow.getDate()).padStart(2, '0');
    let year = dateNow.getFullYear();
    let minDate = year + '-' + month + '-' + day;
    return minDate;
}

function getMaxDate(minDate) {
    let dateAfterOneMonth = addMonths(new Date(minDate), 3);
    let month = String(dateAfterOneMonth.getMonth() + 1).padStart(2, '0');
    let day = String(dateAfterOneMonth.getDate()).padStart(2, '0');
    let year = dateAfterOneMonth.getFullYear();
    let maxDate = year + '-' + month + '-' + day;
    return maxDate;
}

function updateDateSelection() {
    let dateNow = new Date();
    let minDate = getMinDate(dateNow);
    let maxDate = getMaxDate(minDate);
    const dateControl = document.querySelector('input[name="appt_date"]');
    dateControl.value = dateControl.min = minDate;
    dateControl.max = maxDate;
}

function updateTimeSelection() {
    let selectedDate = document.querySelector('input[name="appt_date"]');
    getBookedTimes(selectedDate);
}

// The selected attribute is not being cleared even after date change
// Looking for solution...
function refreshTimeSlots() {
    const selectTimeElement = document.getElementById("appt_time");
    for (var i = 0; i < selectTimeElement.options.length; ++i) {
        selectTimeElement.options[i].disabled = false;
    }
}

function disableBookedTimeSlots(bookedTimeSlots) {
    const selectTimeElement = document.getElementById("appt_time");
    let isMinValueSet = false;
    for (var i = 0; i < selectTimeElement.options.length; ++i) {
        var option = selectTimeElement.options[i];
        if (bookedTimeSlots.includes(option.value*1)) {
            option.disabled = true;
        } else {
            if (isMinValueSet == false) {
                selectTimeElement.value = option.value*1;
                isMinValueSet = true;
            }
        }
    }
}

function getBookedTimes(date) {
    fetch("api/get-booked-times?current_date=" + date.value, {
        method: "GET",
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Response is not okay!");
        } else {
            return response.json();
        }
    }).then(data => {
        refreshTimeSlots();
        if (data.length != 0) {
            disableBookedTimeSlots(data);
        }
    });
}

function onDateChange(date) {
    fetch("api/create-times", {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            date: date.value
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Response is not okay!");
        } else {
            return response.json();
        }
    }).then(data => {
        getBookedTimes(date);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    updateDateSelection();
    updateTimeSelection();
});

