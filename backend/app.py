from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, UsersModel


# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Ardie678@localhost:5432/gamestrading'
db.init_app(app)
migrate = Migrate(app, db)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')





if __name__ == '__main__':
    app.run()