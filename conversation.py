import watson_developer_cloud

username = '5a2ae8b2-0a2d-4ced-a791-f7c75056fa83' # replace with username from service key
password = 'vzYOeQ8rGhY7' # replace with password from service key
version = '2017-05-26'
workspace_id = '9daf1e10-50ee-493a-bbcd-0d852ae63fb8' # replace with workspace ID

convos = {}

def ask(message, number):
    conversation = None
    if number not in convos:
        conversation = watson_developer_cloud.ConversationV1(
            username=username,
            password=password,
            version=version
        )
        convos[number] = conversation
    else:
        conversation = convos[number]
    response = conversation.message(
      workspace_id = workspace_id,
      input = {
        'text': message
      }
    )
    # Print the output from dialog, if any.
    try:
        print(response)
    except Exception as e:
        print(e)
    return response['output']['text'][0]
