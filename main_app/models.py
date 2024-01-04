from main_app import db

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(32), nullable=False)
    last_name = db.Column(db.String(32), nullable=False)
    contact_number = db.Column(db.String(11), nullable=False)
    appt_date = db.Column(db.Date(), nullable=False)
    appt_time = db.Column(db.Time(), nullable=False)
    service = db.Column(db.String(64), nullable=False)

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    appt_date = db.Column(db.Date(), nullable=False)
    appt_hour = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Boolean, nullable=False, default=False)

#  9-10am - 1
#  10-11am - 2
#  11-12pm - 3
#  1-2pm - 4
#  2-3pm - 5
#  3-4pm - 6
#  4-5pm - 7
#  5-6pm - 8

