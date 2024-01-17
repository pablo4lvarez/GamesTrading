from flask import Blueprint, jsonify, request

from models import UsersModel, db

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/users', methods=['GET'])
def get_users():
  #logic to get all users
  pass

@user_routes.route('/users', methods=['POST'])
def create_user():
  #logic to create a user
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

@user_routes.route('/users/<id>', methods=['GET'])
def get_user(id):
  #logic to get a single user
  pass

