from flask import render_template, flash
from main_app import app
from main_app.forms import AppointmentForm
from main_app.models import db, Appointment, Schedule

@app.route("/")
@app.route("/index", methods=['GET', 'POST'])
def index():
    form = AppointmentForm()
    if form.validate_on_submit():
        appointment = Appointment(first_name=form.first_name.data,
                                  last_name=form.last_name.data,
                                  contact_number=form.contact_number.data,
                                  service=form.service.data)
        db.session.add(appointment)

        schedule = Schedule(appt_date=form.appt_date.data,
                            appt_time=form.appt_time.data,
                            status=True, appointment=appointment)
        db.session.add(schedule)
        db.session.commit()

        flash('Appointment has been set successfully. Date: {}, Time: {}'.format(
            form.appt_date.data, form.appt_time.data))

    return render_template("index.html", title="Welcome", form=form)


@app.route("/appointment", methods=['GET', 'POST'])
def appointment():
    form = AppointmentForm()
    if form.validate_on_submit():
        appointment = Appointment(first_name=form.first_name.data,
                                  last_name=form.last_name.data,
                                  contact_number=form.contact_number.data,
                                  service=form.service.data)
        db.session.add(appointment)

        schedule = Schedule(appt_date=form.appt_date.data,
                            appt_time=form.appt_time.data,
                            status=True, appointment=appointment)
        db.session.add(schedule)
        db.session.commit()

        flash('Appointment has been set successfully. Date: {}, Time: {}'.format(
            form.appt_date.data, form.appt_time.data))

    return render_template("appointment.html", title="Appointment", form=form)


@app.route("/admin", methods=['GET', 'POST'])
def admin():
    appts = Appointment.query.all()
    return render_template("admin.html", title="Admin", appts=appts)

