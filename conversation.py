import watson_developer_cloud
import re
import database

username = '5a2ae8b2-0a2d-4ced-a791-f7c75056fa83' # replace with username from service key
password = 'vzYOeQ8rGhY7' # replace with password from service key
version = '2017-05-26'
workspace_id = '9daf1e10-50ee-493a-bbcd-0d852ae63fb8' # replace with workspace ID
conversation = watson_developer_cloud.ConversationV1(
    username=username,
    password=password,
    version=version
)

contexts = {}

def backdoor(number):
    if number in contexts:
        del contexts[number]

def ask(message, number):
    if number not in contexts:
        print("new convo")
        context = {}
    else:
        context = contexts[number]
    print("{}: {}".format(number, message))
    response = conversation.message(
      workspace_id = workspace_id,
      input = {'text': message},
      context = context
    )
    # print(response['context'])
    if 'doc_ready' in response['context'] and response['context']['doc_ready']:
        database.put_in_db(number, response['context'], response['context'])
        print("added new entry to database")
    context = response['context']
    contexts[number] = context
    try:
        print("Watson: " + response['output']['text'][0])
        return response['output']['text'][0]
    except Exception as e:
        print("Error! " + e)
        return "Error! " + str(e)
