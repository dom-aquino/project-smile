from flask import request
from main_app.api import bp

@bp.route("/create-times", methods=['POST'])
def create_times():
    print("Creating available times for", request.json['date'])
    return {'message': "This is a test"}


@bp.route("/get-times", methods=['GET'])
def get_times():
    print("Getting available times")
    return {'message': "This is a test too"}

