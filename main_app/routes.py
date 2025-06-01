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
                            appointment=appointment)
        db.session.add(schedule)
        db.session.commit()

        flash('Appointment has been set successfully. Date: {}, Time: {}'.format(
            form.appt_date.data, form.appt_time.data))

    return render_template("index.html", title="Welcome", form=form)


@app.route("/book-online", methods=['GET'])
def book_online():
    return render_template("book_online.html", title="Schedule an Appointment")


@app.route("/meet-the-doctors", methods=['GET'])
def meet_the_doctors():
    return render_template("meet_the_doctors.html", title="Meet the Doctors")


@app.route("/faqs", methods=['GET'])
def faqs():
    return render_template("faqs.html", title="FAQs")


@app.route("/locations", methods=['GET'])
def locations():
    return render_template("locations.html", title="Locations")


@app.route("/contact-us", methods=['GET'])
def contact_us():
    return render_template("contact_us.html", title="Contact Us")


@app.route("/admin", methods=['GET'])
def admin():
    appts = Appointment.query.all()
    for appt in appts:
        print("Appointment Date: ", appt.get_appt_date())

    return render_template("admin.html", title="Admin", appts=appts)

