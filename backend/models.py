from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class UsersModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    lastname = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False)
    phone = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    location = db.Column(db.String(128), nullable=False)

    def __init__(self, name, lastname, email, phone, password, location):
        self.name = name
        self.lastname = lastname
        self.email = email
        self.phone = phone
        self.password = password
        self.location = location

    def __repr__(self):
        return f'<User {self.id}>'
