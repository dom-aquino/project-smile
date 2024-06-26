"""Initial commit

Revision ID: d0571401b687
Revises: 
Create Date: 2024-04-05 14:59:47.942548

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd0571401b687'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('appointment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=32), nullable=False),
    sa.Column('last_name', sa.String(length=32), nullable=False),
    sa.Column('contact_number', sa.String(length=11), nullable=False),
    sa.Column('service', sa.String(length=64), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('schedule',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('appt_date', sa.Date(), nullable=False),
    sa.Column('appt_time', sa.Integer(), nullable=False),
    sa.Column('appt_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['appt_id'], ['appointment.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('schedule')
    op.drop_table('appointment')
    # ### end Alembic commands ###
