from flask_wtf import FlaskForm
from wtforms import DateField, StringField, TimeField, SubmitField, SelectField
from wtforms.validators import DataRequired

class AppointmentForm(FlaskForm):
    name = StringField('Customer Name', validators=[DataRequired()])
    appt_date = DateField('Appointment Date', validators=[DataRequired()],
                          render_kw={"class": "appt_date"})
    appt_time = TimeField('Appointment Time', validators=[DataRequired()],
                          render_kw={"class": "appt_time"})
    service = SelectField('Type of Service', choices=[
        ('consultation', 'Consultation'),
        ('teeth_whitening', 'Teeth Whitening'),
        ('teeth_braces', 'Teeth Braces'),
        ('root_canal', 'Root Canal'),
        ('teeth_extraction', 'Teeth Extraction'),
        ('dental_filling', 'Dental Filling (Pasta)'),
        ('oral-propylaxis', 'Oral Propylaxis (Cleaning)')
    ])
    submit = SubmitField('Submit')

