from flask import Flask, render_template,jsonify,request,abort,flash, redirect
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
        return redirect('http://localhost:3000/game/'+username)
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
    data = {"email":email, "username":username, "password":password, "stats":[]}
    user_exists = mongo.db.users.find({"username":username}).count()
    if(user_exists):
        return Response("User already exists",status=400, mimetype='application/json')
    else:
        mongo.db.users.insert(data)
        return redirect('http://localhost:3000/login')


@app.route('/scores/<username>', methods=['GET'])
def get_scores(username):
    result = mongo.db.users.find({"username":username},{"stats":1,"_id":0})[0]
    print(dumps(result))
    response = Response(dumps(result),mimetype='application/json')
    response.headers["Access-Control-Allow-Origin"]= "*"
    return response


@app.route('/allscores',methods=['GET'])
def allscores():
    res = mongo.db.users.find({},{"stats":1,"_id":0,"username":1})
    result =[]
    for doc in res:
        for scores in doc.get("stats"):
            data = {"username":doc.get("username"), "neural network":scores.get("neural network"),
                "win": scores.get("win"), "lose": scores.get("lose")}
            result.append(data)

    print(dumps(result))
    response = Response(dumps(result),mimetype='application/json')
    response.headers["Access-Control-Allow-Origin"]= "*"
    return response

if __name__ == '__main__':	
	app.debug=True
	app.run()