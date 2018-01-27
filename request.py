import json
import md5
import random
import datetime
from flask import Flask, render_template, request


app = Flask(__name__)

@app.route('/')
def main():
    return render_template("main.html", message="")
