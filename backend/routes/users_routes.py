from flask import Blueprint, jsonify, request, abort, make_response

from models import UsersModel, db

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/users', methods=['GET'])
def get_users():
  # Logic to get all users
  users = UsersModel.query.all()
  # Convert the users to a list of dictionaries
  users_list = [{'name': user.name, 'lastname': user.lastname, 'email': user.email, 'phone': user.phone, 'location': user.location} for user in users]
  return jsonify({"users": users_list})


@user_routes.route('/users', methods=['POST'])
def create_user():
  # Logic to create a user
  # TO DO: Add validation to the request payload
  if request.is_json:
    data = request.get_json()
    new_user = UsersModel(
                name=data['name'],
                lastname=data['lastname'], 
                email=data['email'], 
                phone=data['phone'], 
                password=data['password'], 
                location=data['location']
              )
    
    db.session.add(new_user)
    db.session.commit()
    response_data = {
      "message": f"User {new_user.name} has been created successfully.",
    }
    return make_response(jsonify(response_data), 201)
  else:
    abort(400, description="The request payload is not in JSON format")

@user_routes.route('/users/<id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(id):
  user = UsersModel.query.get(id)
  if request.method == 'GET':
    # Logic to get a single user
    if user:
      response_data = {
        "name": user.name,
        "lastname": user.lastname,
        "email": user.email,
        "phone": user.phone,
        "location": user.location
      }
      return make_response(jsonify(response_data), 200)
    else:
      abort(404, description="The user does not exist")
  
  elif request.method == 'PUT':
    # Logic to update a user
    data = request.get_json()
    if 'name' in data:
        user.name = data['name']
    if 'lastname' in data:
        user.lastname = data['lastname']
    if 'email' in data:
        user.email = data['email']
    if 'phone' in data:
        user.phone = data['phone']
    if 'password' in data:
        user.password = data['password']
    if 'location' in data:
        user.location = data['location']
    db.session.commit()
    response_data = {
      "message": f"User {user.name} successfully updated"
    }
    return make_response(jsonify(response_data), 200)

  elif request.method == 'DELETE':
    # Logic to delete a user
    db.session.delete(user)
    db.session.commit()
    response_data = {
      "message": f"User {user.name} successfully deleted."
    }
    return make_response(jsonify(response_data), 200)


@user_routes.route('/users/login', methods=['POST'])
def login_user():
  # Logic to login a user
  if request.is_json:
    data = request.get_json()
    user = UsersModel.query.filter_by(email=data['email']).first()
    if user and user.password == data['password']:
      user_data = {
        "id": user.id,
        "name": user.name,
        "lastname": user.lastname,
        "location": user.location,
        "email": user.email,
        "phone": user.phone
      }
      response_data = {
        "data": user_data
      }

      return make_response(jsonify(response_data), 200)
    else:
      abort(401, description="Invalid username or password")
  else:
    abort(400, description="The request payload is not in JSON format")

