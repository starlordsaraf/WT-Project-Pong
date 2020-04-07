from flask import Flask, render_template,jsonify,request,abort
from flask_pymongo import PyMongo
import requests
import json
import re
from flask import Response
from bson.json_util import dumps


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/rides"
mongo = PyMongo(app)


@app.route('/login', methods = ['POST'])
def login():
    username = request.form["username"]
    password = request.form["password"]
    print(username,password)
    return "{}"

@app.route('/register', methods = ['POST'])
def register():
    email = request.form["email"]
    username = request.form["username"]
    password = request.form["password"]
    print(username,password)
    return "{}"

if __name__ == '__main__':	
	app.debug=True
	app.run()