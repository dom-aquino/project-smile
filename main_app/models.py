from main_app import db
from main_app.helpers import TIME_SLOTS_DICT, SERVICES_DICT

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(32), nullable=False)
    last_name = db.Column(db.String(32), nullable=False)
    contact_number = db.Column(db.String(11), nullable=False)
    service = db.Column(db.String(64), nullable=False)
    schedule = db.relationship('Schedule', backref='appointment', lazy=True)

    def get_appt_date(self):
        sched = Schedule.query.filter(self.id == Schedule.appt_id).first();
        return sched.appt_date

    def get_appt_time(self):
        sched = Schedule.query.filter(self.id == Schedule.appt_id).first();
        return TIME_SLOTS_DICT[sched.appt_time]

    def get_service(self):
        return SERVICES_DICT[self.service]

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    appt_date = db.Column(db.Date(), nullable=False)
    appt_time = db.Column(db.Integer, nullable=False)
    appt_id = db.Column(db.Integer, db.ForeignKey('appointment.id'),
                        nullable=False)

