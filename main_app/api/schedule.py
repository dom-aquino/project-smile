from flask import request
from main_app.api import bp

@bp.route("/test", methods=['POST'])
def test():
    print("test")
    return {'message': "This is a test"}

