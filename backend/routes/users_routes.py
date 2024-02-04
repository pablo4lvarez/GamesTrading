from flask import Blueprint, jsonify, request

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
    return jsonify({"message": f"User {new_user.name} has been created successfully."})
  else:
    return jsonify({"error": "The request payload is not in JSON format"})

@user_routes.route('/users/<id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(id):
  user = UsersModel.query.get(id)
  if request.method == 'GET':
    # Logic to get a single user
    if user:
      return jsonify({"name": user.name, "lastname": user.lastname, "email": user.email, "phone": user.phone, "location": user.location})
    else:
      return jsonify({"error": "The user does not exist"})
  
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
    return jsonify({"message": f"User {user.name} successfully updated"})

  elif request.method == 'DELETE':
    # Logic to delete a user
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"User {user.name} successfully deleted."})


