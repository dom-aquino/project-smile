from flask_wtf import FlaskForm
from wtforms import DateField, StringField, TimeField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length

class AppointmentForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(),
                                                       Length(min=2, max=32)])
    last_name = StringField('Last Name', validators=[DataRequired(),
                                                     Length(min=2, max=32)])
    contact_number = StringField('Contact Number', validators=[DataRequired(),
                                                               Length(min=11, max=11)])
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

