let dateNow = new Date();
let month = String(dateNow.getMonth() + 1).padStart(2, '0');
let day = String(dateNow.getDate()).padStart(2, '0');
let year = dateNow.getFullYear();
let dateToday = year + '-' + month + '-' + day;
 
const dateControl = document.querySelector('input[type="date"]');
dateControl.value = dateControl.min = dateToday;

