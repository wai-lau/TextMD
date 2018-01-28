from twilio.rest import Client

# Find these values at https://twilio.com/user/account
account_sid = "AC625b5404f523c1779b80dee9ce29c792"
auth_token = "776942db6784975ebe81d40914ea946c"

client = Client(account_sid, auth_token)

client.api.account.messages.create(
    to="+15147990173",
    from_="+15149000472",
    body="Help!",
    media_url="https://climacons.herokuapp.com/clear.png")
