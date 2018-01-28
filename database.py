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

def get_from_db(number):
    return db.child("patients").child(number).get(user['idToken']).val()

def put_in_db(number, entry):
    db.child("patients").child(number).set(entry, user['idToken'])

def doc_ready(number):
    db.child("patients").child(number).child('doc_ready').set(True, user['idToken'])

def doc_unready(number):
    db.child("patients").child(number).child('doc_ready').set(False, user['idToken'])

fakeId = '4506713133'
fakeMan = {
    'user_info': {
        'name':'Manti Teo',
        'age':39,
        'sex':'M'
    },
    'doc_ready':True,
    'category':'LIMIC'
}

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

# put_in_db(fakeId, fakeMan)
# print(get_from_db(fakeId))
# print(get_from_db("fakeId"))

doc_unready('4160386032')
print(get_doc_ready_json('bone'))

all_agents = db.child("patients").get(user['idToken']).val()
# pprint.pprint(json.dumps(all_agents))
