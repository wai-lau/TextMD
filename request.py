import json
import random
import datetime
from flask import Flask, render_template, request, abort

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("main.html", message="")

@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method == 'POST':
        print(request.json)
        return '', 200
    else:
        abort(400)


if __name__ == '__main__':
    app.run()
