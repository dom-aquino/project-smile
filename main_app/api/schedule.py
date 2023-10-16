from flask import request
from main_app.api import bp

@bp.route("/view-appointments", methods=['POST'])
def view_appointments():
    print("Viewing appointments...")
    return {'message': "This is a test"}

