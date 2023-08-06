from flask_wtf import FlaskForm
from wtforms import DateField, StringField, TimeField, SubmitField, SelectField
from wtforms.validators import DataRequired

class AppointmentForm(FlaskForm):
    name = StringField('Customer Name', validators=[DataRequired()])
    contact_number = StringField('Contact Number', validators=[DataRequired()])
    appt_date = DateField('Appointment Date', validators=[DataRequired()],
        render_kw={"class": "appt_date"})
    appt_time = TimeField('Appointment Time', validators=[DataRequired()],
        render_kw={"class": "appt_time"})
    service = SelectField('Type of Service', choices=[('Consultation'),
                                                      ('Teeth Whitening'),
                                                      ('Teeth Braces'),
                                                      ('Root Canal'),
                                                      ('Teeth Extraction'),
                                                      ('Dental Filling (Pasta)'),
                                                      ('Oral Propylaxis (Cleaning)')])
    submit = SubmitField('Submit')

