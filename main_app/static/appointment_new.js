const { createApp } = Vue

createApp({
    delimeters: ['[[', ']]'],

    mounted() {
        this.updateDateSelection();
        this.updateTimeSelection();
    },

    data() {
        return {
            date: null
        }
    },

    methods: {
        updateDateSelection() {
            let dateNow = new Date();
            let minDate = this.getMinDate(dateNow);
            let maxDate = this.getMaxDate(minDate);
            const dateControl = document.querySelector('input[name="appt_date"]');
            dateControl.value = dateControl.min = this.date = minDate;
            dateControl.max = maxDate;
        },

        updateTimeSelection() {
            this.getBookedTimes(this.date);
        },

        getMinDate(dateNow) {
            let month = String(dateNow.getMonth() + 1).padStart(2, '0');
            let day = String(dateNow.getDate()).padStart(2, '0');
            let year = dateNow.getFullYear();
            let minDate = year + '-' + month + '-' + day;
            return minDate;
        },

        getMaxDate(minDate) {
            let dateAfterOneMonth = this.addMonths(new Date(minDate), 3);
            let month = String(dateAfterOneMonth.getMonth() + 1).padStart(2, '0');
            let day = String(dateAfterOneMonth.getDate()).padStart(2, '0');
            let year = dateAfterOneMonth.getFullYear();
            let maxDate = year + '-' + month + '-' + day;
            return maxDate;
        },

        addMonths(date, count) {
          if (date && count) {
            var m, d = (date = new Date(+date)).getDate();
            date.setMonth(date.getMonth() + count, 1);
            m = date.getMonth();
            date.setDate(d);
            if (date.getMonth() !== m) date.setDate(0);
          }
          return date;
        },

        getBookedTimes(date) {
            fetch("api/get-booked-times?current_date=" + date, {
                method: "GET",
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("Response is not okay!");
                } else {
                    return response.json();
                }
            }).then(data => {
                this.refreshTimeSlots();
                if (data.length != 0) {
                    this.disableBookedTimeSlots(data);
                }
            });
        },

        refreshTimeSlots() {
            const selectTimeElement = document.getElementById("appt_time");
            for (var i = 0; i < selectTimeElement.options.length; ++i) {
                selectTimeElement.options[i].disabled = false;
            }
        },

        disableBookedTimeSlots(bookedTimeSlots) {
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
        },

    }
}).mount('#app')

