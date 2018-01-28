import json
from flask import Flask, render_template, request, abort
from conversation import ask
from flask_cors import CORS, cross_origin
from sms import send_sms
import re

success = json.dumps({'success':True}), 200, {'ContentType':'application/json'}
fail = json.dumps({'success':False}), 500, {'ContentType':'application/json'}

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():
    return render_template("main.html", message="")

@app.route('/sms', methods=['POST'])
def receive_sms():
    number = request.form['From']
    message_body = request.form['Body']
    message = re.sub(r'\s',' ',message_body).encode("utf-8")
    watson_response = ask(message, number)
    send_sms(watson_response, number)
    return success

@app.route('/test', methods=['GET'])
def test():
    return success

if __name__ == '__main__':
    app.run()
