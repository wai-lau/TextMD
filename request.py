import json
from flask import Flask, render_template, request, abort
from conversation import ask, backdoor
from flask_cors import CORS, cross_origin
from sms import send_sms
from database import remove, doc_unready
import re
from database import get_doc_ready_json, get_categories

success = json.dumps({'success':True}), 200, {'ContentType':'application/json'}
fail = json.dumps({'success':False}), 500, {'ContentType':'application/json'}

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():
    return render_template("main.html", message="")

@app.route('/sms', methods=['POST'])
def receive_sms():
    number = re.sub(r'[^\d]','',request.form['From'])
    message_body = request.form['Body']
    message = re.sub(r'\s',' ',message_body).encode("utf-8")
    if 'forget me' in str(message).lower() or 'forget it' in str(message).lower():
        backdoor(number)
        remove(number)
        watson_response = "Okay, I've forgotten you. I look forward to meeting you again."
    else:
        watson_response = ask(message, number)
    send_sms(watson_response, number)
    return success

@app.route('/patients/<category>', methods=['GET'])
def getPatients(category):
    return get_doc_ready_json(str(category))

@app.route('/response', methods=['POST'])
def response():
    response = request.get_json()['response']
    number = request.get_json()['id']
    send_sms(response, number)
    doc_unready(number)
    return success

@app.route('/categories', methods=['GET'])
def categories():
    return get_categories()

if __name__ == '__main__':
    app.run()
