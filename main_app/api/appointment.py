from flask import request, jsonify
from main_app.models import Schedule
from main_app.api import bp

@bp.route("/get-booked-times", methods=['GET'])
def get_booked_times():
    date = request.args.get('current_date')
    booked_schedules = Schedule.query.filter_by(appt_date=date,
                                                status=True).all()
    output = [schedule.appt_time for schedule in booked_schedules]

    return jsonify(output)

