from flask import Blueprint, abort, jsonify, request, make_response

from models import GamesModel, UsersModel, ExchangesModel, db

exchange_routes = Blueprint('exchange_routes', __name__)

@exchange_routes.route('/exchanges', methods=['GET'])
def get_exchanges():
  # Logic to get all exchanges
  exchanges = ExchangesModel.query.all()
  # Convert the exchanges to a list of dictionaries
  exchanges_list = [{'user_id': exchange.user_id, 'game_id': exchange.game_id} for exchange in exchanges]
  response_data = {
    "exchanges": exchanges_list
  }
  return make_response(jsonify(response_data), 200)

@exchange_routes.route('/exchanges', methods=['POST'])
def create_exchange():
  # Logic to create an exchange
  if request.is_json:
    data = request.get_json()

    user_1 = UsersModel.query.get(data['user_1_id'])
    user_2 = UsersModel.query.get(data['user_2_id'])
    game_1 = GamesModel.query.get(data['game_1_id'])
    game_2 = GamesModel.query.get(data['game_2_id'])

    if not user_1:
      abort(404, description=f"User 1 with id {data['user_1_id']} does not exist")
    if not user_2:
      abort(404, description=f"User 2 with id {data['user_2_id']} does not exist")
    if not game_1:
      abort(404, description=f"Game 1 with id {data['game_1_id']} does not exist")
    if not game_2:
      abort(404, description=f"Game 2 with id {data['game_2_id']} does not exist")

    new_exchange = ExchangesModel(
                user_1_id=data['user_1_id'],
                user_2_id=data['user_2_id'],
                game_1_id=data['game_1_id'],
                game_2_id=data['game_2_id'],
                status='pending'
              )
    
    db.session.add(new_exchange)
    db.session.commit()
    response_data = {
      "message": f"Exchange {new_exchange.id} has been created successfully."
    }
    return make_response(jsonify(response_data), 201)
  else:
    abort(400, description="The request payload is not in JSON format")

@exchange_routes.route('/exchanges/<id>', methods=['GET', 'PUT', 'DELETE'])
def handle_exchange(id):
  exchange = ExchangesModel.query.get(id)
  if exchange:

    if request.method == 'GET':
      # Logic to get a single exchange
      response_data = {
        "user_1_id": exchange.user_1_id,
        "user_2_id": exchange.user_2_id,
        "game_1_id": exchange.game_1_id,
        "game_2_id": exchange.game_2_id,
        "status": exchange.status
      }
      return make_response(jsonify(response_data), 200)
    
    elif request.method == 'PUT':
      # Logic to update an exchange
      data = request.get_json()
      if 'status' in data:
          exchange.status = data['status']
          db.session.commit()
          response_data = {
            "message": f"Exchange {exchange.id} has been updated successfully."
          }
          return make_response(jsonify(response_data), 200)
      elif 'status' not in data:
          abort(400, description="The request payload does not contain the desired data.")

    elif request.method == 'DELETE':
      # Logic to delete an exchange
      db.session.delete(exchange)
      db.session.commit()
      response_data = {
        "message": f"Exchange {exchange.id} has been deleted successfully."
      }
      return make_response(jsonify(response_data), 200)
    
  elif not exchange:
    abort(404, description=f"Exchange with the id:{id} not found")