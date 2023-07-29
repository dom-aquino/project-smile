from flask_wtf import FlaskForm
from wtforms import DateField, StringField, TimeField, SubmitField
from wtforms.validators import DataRequired

class AppointmentForm(FlaskForm):
    name = StringField('Customer Name', validators=[DataRequired()])
    appt_date = DateField('Appointment Date', validators=[DataRequired()],
                          render_kw={"class": "appt_date"})
    appt_time = TimeField('Appointment Time', validators=[DataRequired()],
                          render_kw={"class": "appt_time"})
    service = StringField('Service', validators=[DataRequired()])
    submit = SubmitField('Submit')

