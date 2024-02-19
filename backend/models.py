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

class GamesModel(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    # genre = db.Column(db.String(128), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    platform = db.Column(db.String(128), nullable=False)

    def __init__(self, name, year, platform):
        self.name = name
        # self.genre = genre
        self.year = year
        self.platform = platform

    def __repr__(self):
        return f'<Game {self.id}>'


class OffersModel(db.Model):
    __tablename__ = 'offers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    def __init__(self, user_id, game_id):
        self.user_id = user_id
        self.game_id = game_id

    def __repr__(self):
        return f'<Offer {self.id}>'


class WishesModel(db.Model):
    __tablename__ = 'wishes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    def __init__(self, user_id, game_id):
        self.user_id = user_id
        self.game_id = game_id

    def __repr__(self):
        return f'<Wish {self.id}>'

class ExchangesModel(db.Model):
    __tablename__ = 'exchanges'

    id = db.Column(db.Integer, primary_key=True)
    user_1_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_2_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_1_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    game_2_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    status = db.Column(db.String(128), nullable=False) # pending, accepted, rejected

    def __init__(self, user_1_id, user_2_id, game_1_id, game_2_id, status):
        self.user_1_id = user_1_id
        self.user_2_id = user_2_id
        self.game_1_id = game_1_id
        self.game_2_id = game_2_id
        self.status = status

    def __repr__(self):
        return f'<Exchange {self.id}>'
