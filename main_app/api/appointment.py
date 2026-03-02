from datetime import datetime
from flask import request, jsonify
from main_app.models import db, Appointment, Schedule
from main_app.api import bp
from main_app.helpers import TIME_SLOTS_DICT, SERVICES_DICT

@bp.route("/create-appointment", methods=['POST'])
def create_appointment():
    try:
        appointment = Appointment(first_name=request.json['firstName'],
                                  last_name=request.json['lastName'],
                                  contact_number=request.json['contactNumber'],
                                  service=request.json['service'])
        db.session.add(appointment)

        schedule = Schedule(appt_date=datetime.strptime(request.json['apptDate'],
                                                        "%Y-%m-%d").date(),
                            appt_time=request.json['apptTime'],
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

    return jsonify({'success': 'Appointment has been created.'}), 201

@bp.route("/delete-appointment", methods=['POST'])
def delete_appointment():
    try:
        data = request.get_json()
        if not data or 'appt_id' not in data:
            return jsonify({'error': 'Missing appointment ID in request.'}), 400

        appointment_id = request.json.get('appt_id')
        if not appointment_id or not isinstance(appointment_id, int):
            return jsonify({'error': 'Invalid appointment ID.'}), 400
        print(f"Received appointment ID for deletion: {appointment_id}")
        appointment = Appointment.query.get(appointment_id)
        schedule = Schedule.query.filter_by(appt_id=appointment_id).first()
        if appointment:
            db.session.delete(schedule)
            print(f"Found appointment: {appointment.first_name} {appointment.last_name}, Service: {appointment.service}")
            db.session.delete(appointment)
            print("Appointment deleted from session.")
            db.session.commit()
            print("Database commit successful.")
            return jsonify({'success': 'Appointment has been deleted.'}), 200
        else:
            return jsonify({'error': 'Appointment not found.'}), 404
    except KeyError as e:
        error_message = f'Missing key: {e.args[0]}'
        return jsonify({'error': error_message}), 400
    except Exception as e:
        error_message = str(e)
        return jsonify({'error': error_message}), 500

@bp.route("/get-available-time", methods=['GET'])
def get_available_time():
    date = request.args.get('selected_date')
    schedules = Schedule.query.filter_by(appt_date=date).all()
    appt_times = [schedule.appt_time for schedule in schedules]
    output = TIME_SLOTS_DICT.copy()
    output = {key:value for key, value in output.items() if key not in appt_times}

    return jsonify({'available-time': output})
