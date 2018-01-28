import pyrebase
config = {
  "apiKey": "AIzaSyCpWhOZ61WYCRCa0FYEQ3ZIVTjffUFKmLY",
  "authDomain": "textmd-30fe0.firebaseapp.com",
  "databaseURL": "https://textmd-30fe0.firebaseio.com",
  "storageBucket": "textmd-30fe0.appspot.com",
  "serviceAccount": "./TextMD-27e12d50db79.json"
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
#authenticate a user
user = auth.sign_in_with_email_and_password("wl.wailau@gmail.com", "fakePass")
