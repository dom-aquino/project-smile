from flask import render_template, flash
from main_app import app
from main_app.forms import AppointmentForm

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html", title="Welcome")

@app.route("/appointment", methods=['GET', 'POST'])
def appointment():
    form = AppointmentForm()
    if form.validate_on_submit():
        flash('Appointment has been set successfully. Date: {}, Time: {}'.format(
            form.appt_date.data, form.appt_time.data))
    return render_template("appointment.html", title="Appointment", form=form)

@app.route("/admin")
def admin():
    return render_template("admin.html", title="Admin")

