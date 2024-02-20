from flask import Blueprint, jsonify, request, abort, make_response

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
            year=casted_year,
            platform=data['platform']
        )

        db.session.add(new_game)
        db.session.commit()

        response_data = {
          "message": f"Game {new_game.name} for {new_game.platform} has been created successfully.",
          "game_id": new_game.id
        }

        # Return a response with code 201 (Created)
        return make_response(jsonify(response_data), 201)
    else:
        abort(400, description="The request payload is not in JSON format")


@games_routes.route('/games/<id>', methods=['GET', 'DELETE'])
def handle_game(id):
  game = GamesModel.query.get(id)
  if request.method == 'GET':
    if game:
      response_data = {
        "name": game.name,
        "year": game.year,
        "platform": game.platform
      }
      return make_response(jsonify(response_data), 200)
    else:
      abort(404, description="The game does not exist")
  
  elif request.method == 'DELETE':
    if game:
      db.session.delete(game)
      db.session.commit()
      response_data = {
        "message": f"Game {game.name} for {game.platform} with id {game.id} has been deleted successfully."
      }
      return make_response(jsonify(response_data), 200)
    else:
      abort(404, description="The game does not exist")


@games_routes.route('/games', methods=['GET'])
def get_all_games():
  games = GamesModel.query.all()
  games_list = [{'id': game.id, 'name': game.name, 'year': game.year, 'platform': game.platform} for game in games]
  response_data = {
    "games": games_list
  }
  return make_response(jsonify(response_data), 200)