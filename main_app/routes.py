from main_app.models import db, Appointment
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
        appt = Appointment(first_name=form.first_name.data,
                           last_name=form.last_name.data,
                           contact_number=form.contact_number.data,
                           appt_date=form.appt_date.data,
                           appt_time=form.appt_time.data,
                           service=form.service.data)
        db.session.add(appt)
        db.session.commit()
        flash('Appointment has been set successfully. Date: {}, Time: {}'.format(
            form.appt_date.data, form.appt_time.data))
    return render_template("appointment.html", title="Appointment", form=form)

@app.route("/admin")
def admin():
    appts = Appointment.query.all()
    return render_template("admin.html", title="Admin", appts=appts)

