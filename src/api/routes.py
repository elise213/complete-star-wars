"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Resource, Favorites
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

# Create flask app
api = Blueprint('api', __name__)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET')
jwt = JWTManager(app)

@api.route('/token', methods=['POST'])
def create_token():
    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }
    return jsonify(response_body), 200


@api.route("/login", methods = ["POST"])
def create_token():
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        name = request.json.get("name", None)
        if not email: 
            return jsonify({"message": "Email is required"}), 400
        if not password: 
            return jsonify({"message": "Password is required"}), 400
        user = User.query.filter_by(email=email).first()
        if not user: 
            return jsonify({"message": "email is incorrect"}), 401
        if not check_password_hash(user.password, password):
            return jsonify({"message": "password is incorrect"}), 401
        favorites = getFavoritesByUserId(user.id)
        icons = []
        for favorite in favorites:
            resource = Resource.query.filter_by(name = favorite["name"]).first()
            icons.append(resource.icon)
        expiration = datetime.timedelta(days=3)
        access_token = create_access_token(identity = user.id, expires_delta=expiration)
        return jsonify(access_token=access_token, avatar=user.avatar, name=user.name, favorites=favorites)
    
@api.route("/createUser", methods = ["POST"])
def create_user():
        request_body = request.get_json()
        if not request_body["name"]:
            return jsonify({"message": "Name is required"}), 400
        if not request_body["email"]:
            return jsonify({"message": "Email is required"}), 400
        if not request_body["password"]:
            return jsonify({"message": "Password is required"}), 400
        user = User.query.filter_by(email=request_body["email"]).first()
        if user: 
            return jsonify({"message": "email already exists"}), 400
        user = User(
            name = request_body["name"],
            email = request_body["email"],
            password = generate_password_hash(request_body["password"]),
            avatar = request_body['userAvatar']
            )
        db.session.add(user)
        db.session.commit()
        return jsonify({"created": "Thank you for registering", "status": "true"}), 200
    
    # add favorite resource
@api.route('/addFavorite', methods=['POST'])
@jwt_required()
def addFavorite():
    userId = get_jwt_identity()
    request_body = request.get_json()
    fav = Favorites.query.filter_by(userId=userId, name=request_body["name"]).first()
    if fave : 
        return jsonify(message="favorite already exists")
    favorite = Favorites(
        userId=userId,
        name=request_body["name"],
    )
    print(request_body["name"])
    print("Request body:", request_body)
    db.session.add(favorite)
    db.session.commit()
    return jsonify(message="okay")
    
# remove favorite resource
@api.route('/removeFavorite', methods=['DELETE'])
@jwt_required()
def removeFavorite():
    userId = get_jwt_identity()
    request_body = request.get_json()
    Favorites.query.filter_by(userId=userId, name=request_body["name"]).delete()
    db.session.commit()
    return jsonify(message="okay")
    
# get all favorites
@api.route('/getFavorites', methods=['GET'])
@jwt_required()
def getFavorites():
    userId = get_jwt_identity()
    favorites = getFavoritesByUserId(userId)
    return jsonify(favorites=favorites)
def getFavoritesByUserId(userId):
    favorites = Favorites.query.filter_by(userId=userId).all()
    serialized_favorites = [fave.serialize() for fave in favorites]
    return serialized_favorites
