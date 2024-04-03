from datetime import datetime
from flask import request, jsonify
from main_app.models import db, Appointment, Schedule
from main_app.api import bp

@bp.route("/create-appointment", methods=['POST'])
def create_appointment():
    try:
        appointment = Appointment(first_name=request.json['first_name'],
                                  last_name=request.json['last_name'],
                                  contact_number=request.json['contact_number'],
                                  service=request.json['service'])
        db.session.add(appointment)

        schedule = Schedule(appt_date=datetime.strptime(request.json['appt_date'], "%Y-%m-%d").date(),
                            appt_time=request.json['appt_time'],
                            status=True, appointment=appointment)
        db.session.add(schedule)
        db.session.commit()
    except KeyError as e:
        error_message = f'Missing key: {e.args[0]}'
        return jsonify({'error': error_message}), 400
    except Exception as e:
        error_message = str(e)
        db.session.flush()
        return jsonify({'error': error_message}), 500

    return jsonify({'success': 'Appointment has been created.'}), 201


@bp.route("/get-booked-times", methods=['GET'])
def get_booked_times():
    date = request.args.get('current_date')
    booked_schedules = Schedule.query.filter_by(appt_date=date,
                                                status=True).all()
    output = [schedule.appt_time for schedule in booked_schedules]

    return jsonify(output)

