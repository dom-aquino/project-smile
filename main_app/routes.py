from main_app import app
from flask import render_template

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html", title="Welcome")

@app.route("/appointment")
def appointment():
    return render_template("appointment.html", title="Appointment")

@app.route("/admin")
def admin():
    return render_template("admin.html", title="Admin")

