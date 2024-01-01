from flask import Blueprint

bp = Blueprint('api', __name__, url_prefix='/api')

from main_app.api import appointment

