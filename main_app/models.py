from main_app import db

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    contact_number = db.Column(db.String(11))
    appt_date = db.Column(db.Date())
    appt_time = db.Column(db.Time())
    service = db.Column(db.String(64))

