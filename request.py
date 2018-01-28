import json
import random
import datetime
from flask import Flask, render_template, request, abort
from twilio.rest import Client
from conversation import ask

# Find these values at https://twilio.com/user/account
account_sid = "AC625b5404f523c1779b80dee9ce29c792"
auth_token = "776942db6784975ebe81d40914ea946c"
success = json.dumps({'success':True}), 200, {'ContentType':'application/json'}
fail = json.dumps({'success':False}), 500, {'ContentType':'application/json'}
client = Client(account_sid, auth_token)

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("main.html", message="")

@app.route('/sms', methods=['POST'])
def sms():
    number = request.form['From']
    message_body = request.form['Body']
    print(message_body)
    watson_response = ask(message_body, number)
    client.api.account.messages.create(
        to=number,
        from_="+15149000472",
        body=watson_response)
    return success

if __name__ == '__main__':
    app.run()
