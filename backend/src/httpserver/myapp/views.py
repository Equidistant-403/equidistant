import os

import secrets
import hashlib

from django.http import JsonResponse
from django.http import HttpResponse
from httpserver.modules.database.BitdotioDB import BitdotioDB
from httpserver.modules.Constants import DB_USERS, DB_FRIENDS
from django.views.decorators.csrf import csrf_exempt

token = 'BITIO_API_TOKEN'


@csrf_exempt
def post_create_user(request):
    """
    Handles the /create endpoint.
    """
    try:
        if request.method == 'POST':
            data = request.POST
            email = data['email']
            password = data['password']
            address = data['address']
            db = BitdotioDB(os.getenv(token))
            if len(db.db_query(f'SELECT email FROM {DB_USERS} WHERE email = \'{email}\'')) <= 0:
                salt = secrets.token_hex(4)
                hash_pw = hashlib.sha256((password + salt).encode('UTF-8')).hexdigest()
                db.db_query(f'INSERT INTO {DB_USERS} VALUES (\'{email}\', \'{hash_pw}\', \'{salt}\', \'{address}\')')
                return JsonResponse({'email': email, 'address': address})
            else:
                return JsonResponse({'error': 'Cannot make account with provided parameters'}, status=400)
        else:
            return HttpResponse(status=404)
    except:
        return HttpResponse(status=500)


def get_login_credentials(request):
    """
    Handles the /login endpoint.
    """
    try:
        if request.method == 'GET':
            data = request.GET
            email = data['email']
            password = data['password']
            db = BitdotioDB(os.getenv(token))
            if len(db.db_query(f'SELECT address FROM {DB_USERS} WHERE email = \'{email}\'')) <= 0:
                return JsonResponse({'error': 'Invalid login credentials'}, status=401)
            salt = db.db_query(f'SELECT salt FROM {DB_USERS} WHERE email = \'{email}\'')[0][0]
            hash_pw = hashlib.sha256((password + salt).encode('UTF-8')).hexdigest()
            address = db.db_query(f'SELECT address FROM {DB_USERS} '
                                  f'WHERE email = \'{email}\' '
                                  f'AND password = \'{hash_pw}\'')
            if len(address) <= 0:
                return JsonResponse({'error': 'Invalid login credentials'}, status=401)
            # otherwise login is successful, assemble information
            address = address[0][0]
            friend_list = db.db_query(f'SELECT {DB_USERS}.email, {DB_USERS}.address, '
                                      f'{DB_FRIENDS}.status FROM {DB_FRIENDS} '
                                      f'JOIN {DB_USERS} '
                                      f'ON {DB_USERS}.email = {DB_FRIENDS}.user2 '
                                      f'WHERE {DB_USERS}.email = \'{email}\' '
                                      f'AND ({DB_FRIENDS}.status = 0 OR {DB_FRIENDS}.status = 2) '
                                      f'UNION ALL '
                                      f'SELECT {DB_USERS}.email, {DB_USERS}.address, '
                                      f'{DB_FRIENDS}.status FROM {DB_FRIENDS} '
                                      f'JOIN {DB_USERS} '
                                      f'ON {DB_USERS}.email = {DB_FRIENDS}.user1 '
                                      f'WHERE {DB_USERS}.email = \'{email}\' '
                                      f'AND ({DB_FRIENDS}.status = 0 OR {DB_FRIENDS}.status = 1)')
            friends = []
            friend_reqs = []
            for friend_tuple in friend_list:
                if int(friend_tuple[2]) == 0:
                    friends.append({'email': friend_tuple[0], 'address': friend_tuple[1]})
                else:
                    friend_reqs.append({'email': friend_tuple[0], 'address': friend_tuple[1]})

            # TODO: implement bearer
            return JsonResponse({'bearer': 'some_bearer',
                                 'user': {
                                     'email': email,
                                     'address': address
                                 },
                                 'friends': friends,
                                 'friend_reqs': friend_reqs
                                 })
    except:
        return HttpResponse(status=500)


def get_locations(request):
    """
    Handles the /locations endpoint.
    """
    if request.method == 'GET':
        data = request.GET
    return HttpResponse('Thanks for submitting your data')


def get_friends(request):
    """
    Handles the /friends endpoint.
    """
    if request.method == 'GET':
        data = request.GET
    return HttpResponse('Thanks for submitting your data')


def get_user(request):
    """
    Handles the /user endpoint.
    """
    if request.method == 'GET':
        data = request.GET
    return HttpResponse('Thanks for submitting your data')


def post_friend_request(request):
    """
    Handles the /sendFriendReq endpoint.
    """
    if request.method == 'POST':
        data = request.POST
    return HttpResponse('Thanks for submitting your data')


def post_friend_request_response(request):
    """
    Handles the /respondFriendReq endpoint.
    """
    if request.method == 'POST':
        data = request.POST
    return HttpResponse('Thanks for submitting your data')
