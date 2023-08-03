from main_app import db

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    contact_number = db.Column(db.String(64))
    app_date = db.Column(db.Date())
    app_time = db.Column(db.Time())
    service = db.Column(db.String(64))

