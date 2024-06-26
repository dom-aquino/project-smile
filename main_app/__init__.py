from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from main_app.api import bp as api_bp
app.register_blueprint(api_bp)

from main_app import routes, models

if __name__ == '__main__':
    app.run(debug=True, port=8080)

