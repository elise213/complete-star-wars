from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import ARRAY
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    email = db.Column(db.String(256), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    avatar = db.Column(db.String(80))

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "avatar": self.avatar,
            # do not serialize the password, its a security breach
        }

class Favorites(db.Model):
    __tablename__ = 'Favorites'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    userId = db.Column(db.Integer, nullable=False)
    typeURL=db.Column(db.String(256))
    index=db.Column(db.Integer)
    
    def __repr__(self):
        return f'<Favorites {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "userId": self.userId,
            "typeURL": self.typeURL,
            "index": self.index
        }