from flask import Blueprint
from main_app.models import Schedule

bp = Blueprint('api', __name__, url_prefix='/api')

