from flask import Blueprint, abort, jsonify, request, make_response

from models import GamesModel, UsersModel, WishesModel, db

wishes_routes = Blueprint('wishes_routes', __name__)

@wishes_routes.route('/wishes', methods=['GET'])
def get_wishes():
  wishes = WishesModel.query.all()
  wishes_list = [{'user_id': wish.user_id, 'game_id': wish.game_id, 'wish_id': wish.id} for wish in wishes]
  response_data = {
    "wishes": wishes_list,
  }
  return make_response(jsonify(response_data), 200)

@wishes_routes.route('/wishes', methods=['POST'])
def create_wish():
  if request.is_json:
    data = request.get_json()
    user = UsersModel.query.get(data['user_id'])
    if user:
      game = GamesModel.query.get(data['game_id'])
      
      if game:
        new_wish = WishesModel(
                    user_id=data['user_id'],
                    game_id=data['game_id']
                  )
        db.session.add(new_wish)
        db.session.commit()
        response_data = {
          "message": f"Wish {new_wish.id} has been created successfully.",
        }
        return make_response(jsonify(response_data), 201)
      
      elif not game:
        abort(404, description=f"The game with the id: {data['game_id']} does not exist")

    elif not user:
      abort(404, description=f"The user with the id: {data['user_id']} does not exist")

  else:
    abort(400, description="The request payload is not in JSON format")

@wishes_routes.route('/wishes/<id>', methods=['GET', 'DELETE'])
def handle_wish(id):
  wish = WishesModel.query.get(id)
  if request.method == 'GET':
    if wish:
      response_data = {
        "user_id": wish.user_id,
        "game_id": wish.game_id,
        "wish_id": wish.id
      }
      return make_response(jsonify(response_data), 200)
    else:
      abort(404, description="The wish does not exist")
  
  elif request.method == 'DELETE':
    if wish:
      db.session.delete(wish)
      db.session.commit()
      response_Data = {
        "message": f"Wish {wish.id} has been deleted successfully."
      }
      return make_response(jsonify(response_Data), 200)
    else:
      abort(404, description="The wish does not exist")