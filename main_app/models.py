from main_app import db

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    contact_number = db.Column(db.String(11))
    appt_date = db.Column(db.Date())
    appt_time = db.Column(db.Time())
    service = db.Column(db.String(64))

class Schedule(db.Model):
    date = db.Column(db.Date(), primary_key=True)
    time_slot_9 = db.Column(db.Integer)
    time_slot_10 = db.Column(db.Integer)
    time_slot_11 = db.Column(db.Integer)
    time_slot_12 = db.Column(db.Integer)
    time_slot_13 = db.Column(db.Integer)
    time_slot_14 = db.Column(db.Integer)
    time_slot_15 = db.Column(db.Integer)
    time_slot_16 = db.Column(db.Integer)
    time_slot_17 = db.Column(db.Integer)
    time_slot_18 = db.Column(db.Integer)

