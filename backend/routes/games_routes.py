from flask import Blueprint, jsonify, request, abort

from models import GamesModel, db

games_routes = Blueprint('games_routes', __name__)


@games_routes.route('/games', methods=['POST'])
def create_game():
  if request.is_json:
    data = request.get_json()
    if type(data['year']) != int:
      casted_year = int(data['year'])
    elif type(data['year']) == int:
      casted_year = data['year']

    new_game = GamesModel(
                name=data['name'],
                genre=data['genre'],
                year=casted_year,
                platform=data['platform']
              )
    
    db.session.add(new_game)
    db.session.commit()
    return jsonify({"message": f"Game {new_game.name} for {new_game.platform} has been created successfully."})
  else:
    abort(400, description="The request payload is not in JSON format")

@games_routes.route('/games/<id>', methods=['GET', 'DELETE'])
def handle_game(id):
  game = GamesModel.query.get(id)
  if request.method == 'GET':
    if game:
      return jsonify({"name": game.name, "genre": game.genre, "year": game.year, "platform": game.platform})
    else:
      abort(404, description="The game does not exist")
  
  elif request.method == 'DELETE':
    db.session.delete(game)
    db.session.commit()
    return jsonify({"message": f"Game {game.name} for {game.platform} with id {game.id} has been deleted successfully."})

