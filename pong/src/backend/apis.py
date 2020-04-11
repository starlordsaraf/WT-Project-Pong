from flask import Flask, render_template,jsonify,request,abort,flash
from flask_pymongo import PyMongo
import requests
import json
import re
from flask import Response
from bson.json_util import dumps


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/pong"
mongo = PyMongo(app)


@app.route('/login', methods = ['POST'])
def login():
    username = request.form["username"]
    password = request.form["password"]
    data = {"username":username, "password":password}
    user_pwd_exists = mongo.db.users.find(data).count()
    if(user_pwd_exists):
        return "Valid User"
    else:
        user_exists = mongo.db.users.find({"username":username}).count()
        if(user_exists):
            return Response("Incorrect Password", status=400, mimetype='application/json')
        else:
            return Response("Invalid User",status=400, mimetype='application/json')

@app.route('/register', methods = ['POST'])
def register():
    email = request.form["email"]
    username = request.form["username"]
    password = request.form["password"]
    data = {"email":email, "username":username, "password":password}
    user_exists = mongo.db.users.find({"username":username}).count()
    if(user_exists):
        return Response("User already exists",status=400, mimetype='application/json')
    else:
        mongo.db.users.insert(data)
        return "New User "+username+" created"

if __name__ == '__main__':	
	app.debug=True
	app.run()