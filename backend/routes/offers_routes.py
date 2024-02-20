from flask import Blueprint, abort, jsonify, request, make_response

from models import GamesModel, UsersModel, OffersModel, db

offers_routes = Blueprint('offers_routes', __name__)

@offers_routes.route('/offers', methods=['GET'])
def get_offers():
  offers = OffersModel.query.all()
  offers_list = [{'user_id': offer.user_id, 'game_id': offer.game_id, 'offer_id': offer.id} for offer in offers]
  response_data = {
    "offers": offers_list,
  }
  return make_response(jsonify(response_data), 200)

@offers_routes.route('/offers', methods=['POST'])
def create_offer():
  if request.is_json:
    data = request.get_json()
    user = UsersModel.query.get(data['user_id'])
    if user:
      game = GamesModel.query.get(data['game_id'])
      
      if game:
        new_offer = OffersModel(
                    user_id=data['user_id'],
                    game_id=data['game_id']
                  )
        db.session.add(new_offer)
        db.session.commit()
        response_data = {
          "message": f"Offer {new_offer.id} has been created successfully.",
        }
        return make_response(jsonify(response_data), 201)
      
      elif not game:
        abort(404, description=f"The game with the id: {data['game_id']} does not exist")

    elif not user:
      abort(404, description=f"The user with the id: {data['user_id']} does not exist")

  else:
    abort(400, description="The request payload is not in JSON format")

@offers_routes.route('/offers/<id>', methods=['GET', 'DELETE'])
def handle_offers(id):
  offer = OffersModel.query.get(id)
  if request.method == 'GET':
    if offer:
      response_data = {
        "user_id": offer.user_id,
        "game_id": offer.game_id,
        "offer_id": offer.id
      }
      return make_response(jsonify(response_data), 200)
    else:
      abort(404, description="The offer does not exist")
  
  elif request.method == 'DELETE':
    if offer:
      db.session.delete(offer)
      db.session.commit()
      response_data = {
        "message": f"Offer {offer.id} has been deleted successfully.",
      }
      return make_response(jsonify(response_data), 200)
    else:
      abort(404, description="The offer does not exist")

