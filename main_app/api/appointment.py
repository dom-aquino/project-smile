from datetime import datetime
from flask import request
from main_app import db
from main_app.models import Schedule
from main_app.api import bp

@bp.route("/create-times", methods=['POST'])
def create_times():
    request_date = datetime.strptime(request.json['date'], "%Y-%m-%d").date()
    for hour in [1, 2, 3, 4, 5, 6, 7, 8]:
        date = Schedule.query.filter_by(appt_date=request_date,
                                        appt_hour=hour).first()
        if not date:
            new_schedule = Schedule(appt_date=request_date, appt_hour=hour,
                                    status=False)
            db.session.add(new_schedule)
            db.session.commit()

    return {'message': "This is a test"}


@bp.route("/get-times", methods=['GET'])
def get_times():
    date = request.args.get('current_date')
    request_date = datetime.strptime(request.args.get('current_date'), "%Y-%m-%d").date()
    available_times = Schedule.query.filter_by(appt_date=request_date,
                                               status=False).all()
    for time in available_times:
        print(time.appt_date, time.appt_hour, time.status)

    return {'message': "This is a test too"}

