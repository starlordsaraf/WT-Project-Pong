from flask import Flask, render_template, jsonify, request, abort, flash, redirect
from flask_pymongo import PyMongo
import requests
import json
import re
from flask import Response
from bson.json_util import dumps


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/pong"
mongo = PyMongo(app)


@app.route('/login', methods=['POST'])
def login():
    username = request.form["username"]
    password = request.form["password"]
    data = {"username": username, "password": password}
    user_pwd_exists = mongo.db.users.find(data).count()
    if(user_pwd_exists):
        return redirect('http://localhost:3000/game/'+username)
    else:
        user_exists = mongo.db.users.find({"username": username}).count()
        if(user_exists):
            return Response("Incorrect Password", status=400, mimetype='application/json')
        else:
            return Response("Invalid User", status=400, mimetype='application/json')


@app.route('/register', methods=['POST'])
def register():
    email = request.form["email"]
    username = request.form["username"]
    password = request.form["password"]
    data = {"email": email, "username": username,
            "password": password, "stats": []}
    user_exists = mongo.db.users.find({"username": username}).count()
    if(user_exists):
        return Response("User already exists", status=400, mimetype='application/json')
    else:
        mongo.db.users.insert(data)
        return redirect('http://localhost:3000/login')


@app.route('/scores/<username>', methods=['GET'])
def get_scores(username):
    result = mongo.db.users.find({"username": username}, {
                                 "stats": 1, "_id": 0})[0]
    print(dumps(result))
    response = Response(dumps(result), mimetype='application/json')
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.route('/allscores', methods=['GET'])
def allscores():
    res = mongo.db.users.find({}, {"stats": 1, "_id": 0, "username": 1})
    result = []
    for doc in res:
        for scores in doc.get("stats"):
            data = {"username": doc.get("username"), "neural network": scores.get("neural network"),
                    "win": scores.get("win"), "lost": scores.get("lost")}
            result.append(data)

    print(dumps(result))
    response = Response(dumps(result), mimetype='application/json')
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

@app.route('/setscore', methods=['POST'])
def set_score():
    data = request.get_json()
    username = data.get("username")
    nn_name = data.get("neural network")
    win = data.get("win")
    lost = data.get("lost")

    playerstats = mongo.db.users.find_one({ "username": username }, {'stats':1})
    playerstats = playerstats["stats"]

    updated = 0
    for doc in playerstats:
        if(doc.get("neural network") == nn_name):
            doc["win"] += win
            doc["lost"] += lost
            updated = 1
            break
    
    if updated == 0:
        playerstats.append(
            {
                "neural network": nn_name,
                "win": win,
                "lost": lost
            }
        )

    mongo.db.users.update_one({ 'username': username }, {
        '$set': { 'stats': playerstats }
    })

    return Response({}, 204)

@app.route('/saveNN', methods=['POST'])
def save_nn():
    requestNN = request.get_json()
    nncollection = mongo.db.nn
    res = nncollection.update_one(
        {'name': requestNN.get('name')},
        {
            '$set': {
                'nn': requestNN.get('nn')
            }
        },
        upsert=True
    )
    print(res)
    return Response({}, status=204)

@app.route('/getNN/<nnName>', methods=['GET'])
def get_nn(nnName):
    res = mongo.db.nn.find_one({'name':nnName})
    return Response(dumps(res['nn']), mimetype='application/text')

@app.route('/listNN', methods=['GET'])
def list_nn():
    res = mongo.db.nn.find({}, {'name':1})
    nnNames = []
    for doc in res:
        nnNames.append(doc.get('name'))
    return Response(dumps(nnNames))

if __name__ == '__main__':
    app.debug = True
    app.run()
