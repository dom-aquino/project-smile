from datetime import datetime
from flask import json, request, jsonify
from main_app import db
from main_app.models import Schedule
from main_app.api import bp

@bp.route("/create-times", methods=['POST'])
def create_times():
    #request_date = datetime.strptime(request.json['date'], "%Y-%m-%d").date()
    #for time in [1, 2, 3, 4, 5, 6, 7, 8]:
    #    date = Schedule.query.filter_by(appt_date=request_date,
    #                                    appt_time=time).first()
    #    if not date:
    #        new_schedule = Schedule(appt_date=request_date, appt_time=time,
    #                                status=False)
    #        db.session.add(new_schedule)
    #        db.session.commit()

    return {'message': "This is a test"}


@bp.route("/get-booked-times", methods=['GET'])
def get_booked_times():
    date = request.args.get('current_date')
    booked_schedules = Schedule.query.filter_by(appt_date=date,
                                                status=True).all()
    output = [1, 5]
    for schedule in booked_schedules:
        output.append(schedule.appt_time)

    return jsonify(output)

