import pyrebase
import pprint
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

put_in_db(fakeId, fakeMan)
print(get_from_db(fakeId))
print(get_from_db("fakeId"))

all_agents = db.child("patients").get(user['idToken']).val()
pprint.pprint(all_agents)
