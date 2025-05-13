from datetime import datetime
from flask import request, jsonify
from main_app.models import db, Appointment, Schedule
from main_app.api import bp
from main_app.helpers import TIME_SLOTS_DICT

@bp.route("/create-appointment", methods=['POST'])
def create_appointment():
    """
    try:
        appointment = Appointment(first_name=request.json['first_name'],
                                  last_name=request.json['last_name'],
                                  contact_number=request.json['contact_number'],
                                  service=request.json['service'])
        db.session.add(appointment)

        schedule = Schedule(appt_date=datetime.strptime(request.json['appt_date'],
                                                        "%Y-%m-%d").date(),
                            appt_time=request.json['appt_time'],
                            appointment=appointment)
        db.session.add(schedule)
        db.session.commit()
    except KeyError as e:
        error_message = f'Missing key: {e.args[0]}'
        db.session.flush()
        return jsonify({'error': error_message}), 400
    except Exception as e:
        error_message = str(e)
        db.session.flush()
        return jsonify({'error': error_message}), 500
    """
    return jsonify({'success': 'Appointment has been created.'}), 201


@bp.route("/get-available-time", methods=['GET'])
def get_available_time():
    date = request.args.get('selected_date')
    schedules = Schedule.query.filter_by(appt_date=date).all()
    appt_times = [schedule.appt_time for schedule in schedules]
    output = TIME_SLOTS_DICT.copy()
    output = {key:value for key, value in output.items() if key not in appt_times}

    return jsonify({'available-time': output})

@bp.route("/test-api", methods=['GET'])
def test_api():
    return jsonify({'message': 'API is working.'})

