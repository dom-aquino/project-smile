from flask import render_template
from main_app import app
from main_app.forms import AppointmentForm

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html", title="Welcome")

@app.route("/appointment")
def appointment():
    form = AppointmentForm()
    return render_template("appointment.html", title="Appointment", form=form)

@app.route("/admin")
def admin():
    return render_template("admin.html", title="Admin")

