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
    const timeControl = document.querySelector('input[name="appt_time"]');
    timeControl.value = timeControl.min = "09:00";
    timeControl.max = "18:00";
}

function onDateChange(date) {
    fetch("api/create-times", {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            date: date.value
        }),
    }).then((response) => {
        fetch("api/get-times", {
            method: "GET",
        });
    });
    //fetch("api/get-times", {
    //    method: "GET",
    //});
}

document.addEventListener("DOMContentLoaded", function() {
    updateDateSelection();
    updateTimeSelection();
});

