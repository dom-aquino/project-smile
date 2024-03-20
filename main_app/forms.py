from flask_wtf import FlaskForm
from wtforms import DateField, StringField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length
from main_app.helpers import TIME_SLOTS

class AppointmentForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(),
                                                       Length(min=2, max=32)])
    last_name = StringField('Last Name', validators=[DataRequired(),
                                                     Length(min=2, max=32)])
    contact_number = StringField('Contact Number', validators=[DataRequired(),
                                                               Length(min=11,
                                                                      max=11)])
    appt_date = DateField('Appointment Date', validators=[DataRequired()],
                          render_kw={"class": "appt_date"})
    appt_time = SelectField('Appointment Time', choices=TIME_SLOTS,
                            render_kw={"id": "appt_time"})
    service = SelectField('Type of Service',
                          choices=[('consultation', 'Consultation'),
                                   ('teeth-whitening', 'Teeth Whitening'),
                                   ('teeth-braces', 'Teeth Braces'),
                                   ('root-canal', 'Root Canal'),
                                   ('teeth-extraction', 'Teeth Extraction'),
                                   ('dental-filling', 'Dental Filling (Pasta)'),
                                   ('cleaning', 'Oral Propylaxis (Cleaning)')],)
    submit = SubmitField('Submit')

