from flask_wtf import FlaskForm
from wtforms import DateField, StringField, TimeField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length

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
    appt_time = SelectField('Appointment Time',
                            choices=[(1, '9:00 - 10:00'),
                                     (2, '10:00 - 11:00'),
                                     (3, '11:00 - 12:00'),
                                     (4, '1:00 - 2:00'),
                                     (5, '2:00 - 3:00'),
                                     (6, '3:00 - 4:00'),
                                     (7, '4:00 - 5:00'),
                                     (8, '5:00 - 6:00')],
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

