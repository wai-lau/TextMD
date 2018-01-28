from twilio.rest import Client

# Find these values at https://twilio.com/user/account
account_sid = "AC625b5404f523c1779b80dee9ce29c792"
auth_token = "776942db6784975ebe81d40914ea946c"
client = Client(account_sid, auth_token)
from_ = "+15149000472"

def send_sms(message, dest):
    client.api.account.messages.create(
        to=dest,
        from_=from_,
        body=message)
