import pyrebase
import pprint
import json

config = {
  "apiKey": "AIzaSyCpWhOZ61WYCRCa0FYEQ3ZIVTjffUFKmLY",
  "authDomain": "textmd-30fe0.firebaseapp.com",
  "databaseURL": "https://textmd-30fe0.firebaseio.com",
  "storageBucket": "textmd-30fe0.appspot.com",
  "serviceAccount": "./TextMD-27e12d50db79.json"
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
user = auth.sign_in_with_email_and_password("wl.wailau@gmail.com", "fakePass")
token = user['idToken']
db = firebase.database()

def remove(number):
    return db.child("patients").child(number).remove(user['idToken'])

def get_from_db(number):
    return db.child("patients").child(number).get(user['idToken']).val()

def put_in_db(number, context):
    entry = {
        'user_info': {
            'name':context['name'],
            'age':context['age'],
            'sex':context['sex']
        },
        'doc_ready':context['doc_ready'],
        'category':context['category']
    }
    db.child("patients").child(number).set(entry, user['idToken'])

def doc_ready(number):
    db.child("patients").child(number).child('doc_ready').set(True, user['idToken'])

def doc_unready(number):
    db.child("patients").child(number).child('doc_ready').set(False, user['idToken'])

def get_doc_ready_json(category):
    patients = db.child("patients")\
        .order_by_child('category')\
        .equal_to(category)\
        .get(user['idToken'])\
        .val()
    query = {}
    for n in patients:
        if patients[n]['doc_ready']:
            query[n] = patients[n]
    return json.dumps(query)

def add_doc_response(number, response):
    db.child("patients").child(number).child('doc_response').set(response, user['idToken'])
