from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from models import db
from routes.users_routes import user_routes
from routes.games_routes import games_routes
from routes.wishes_routes import wishes_routes
from routes.offers_routes import offers_routes
from routes.exchanges_routes import exchange_routes


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

app.register_blueprint(user_routes)
app.register_blueprint(games_routes)
app.register_blueprint(wishes_routes)
app.register_blueprint(offers_routes)
app.register_blueprint(exchange_routes)


if __name__ == '__main__':
    app.run()