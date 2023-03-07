import os

import secrets
import hashlib

from django.http import JsonResponse
from django.http import HttpResponse
from myapp.models import Bearer
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
                return JsonResponse({'email': email, 'address': address}, status=201)
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
            friend_list = db.db_query(f'SELECT {DB_FRIENDS}.user1, {DB_USERS}.address, '
                                      f'{DB_FRIENDS}.status FROM {DB_FRIENDS} '
                                      f'JOIN {DB_USERS} '
                                      f'ON {DB_USERS}.email = {DB_FRIENDS}.user2 '
                                      f'WHERE {DB_USERS}.email = \'{email}\' '
                                      f'AND ({DB_FRIENDS}.status = 0 OR {DB_FRIENDS}.status = 1) '
                                      f'UNION ALL '
                                      f'SELECT {DB_FRIENDS}.user2, {DB_USERS}.address, '
                                      f'{DB_FRIENDS}.status FROM {DB_FRIENDS} '
                                      f'JOIN {DB_USERS} '
                                      f'ON {DB_USERS}.email = {DB_FRIENDS}.user1 '
                                      f'WHERE {DB_USERS}.email = \'{email}\' '
                                      f'AND ({DB_FRIENDS}.status = 0)')
            friends = []
            friend_reqs = []
            for friend_tuple in friend_list:
                if int(friend_tuple[2]) == 0:
                    friends.append({'email': friend_tuple[0], 'address': friend_tuple[1]})
                else:
                    friend_reqs.append({'email': friend_tuple[0], 'address': friend_tuple[1]})

            user_token = secrets.token_hex(16)
            bearer = Bearer(token=user_token, value=email)
            bearer.save()
            return JsonResponse({'bearer': user_token,
                                 'user': {
                                     'email': email,
                                     'address': address
                                 },
                                 'friends': friends,
                                 'friend_reqs': friend_reqs
                                 })
        else:
            return HttpResponse(status=404)
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
    try:
        if request.method == 'GET':
            data = request.GET
            if 'HTTP_AUTHORIZATION' not in  request.META:
                return JsonResponse({'error': 'access forbidden'}, status=401)
            authentication = request.META['HTTP_AUTHORIZATION'][7:]  # starts with "Bearer "
            email = data['email']
            bearer_manager = Bearer.objects
            if bearer_manager.verify_token(authentication, email):
                db = BitdotioDB(os.getenv(token))
                # Authentication bearer should guarantee that user exists
                friend_list = db.db_query(f'SELECT {DB_FRIENDS}.user1, {DB_USERS}.address, '
                                          f'{DB_FRIENDS}.status FROM {DB_FRIENDS} '
                                          f'JOIN {DB_USERS} '
                                          f'ON {DB_USERS}.email = {DB_FRIENDS}.user2 '
                                          f'WHERE {DB_USERS}.email = \'{email}\' '
                                          f'AND ({DB_FRIENDS}.status = 0 OR {DB_FRIENDS}.status = 1) '
                                          f'UNION ALL '
                                          f'SELECT {DB_FRIENDS}.user2, {DB_USERS}.address, '
                                          f'{DB_FRIENDS}.status FROM {DB_FRIENDS} '
                                          f'JOIN {DB_USERS} '
                                          f'ON {DB_USERS}.email = {DB_FRIENDS}.user1 '
                                          f'WHERE {DB_USERS}.email = \'{email}\' '
                                          f'AND ({DB_FRIENDS}.status = 0)')
                friends = []
                friend_reqs = []
                for friend_tuple in friend_list:
                    if int(friend_tuple[2]) == 0:
                        friends.append({'email': friend_tuple[0], 'address': friend_tuple[1]})
                    else:
                        friend_reqs.append({'email': friend_tuple[0], 'address': friend_tuple[1]})
                return JsonResponse({'friends': friends,
                                     'friend_requests': friend_reqs
                                     })
            else:
                return JsonResponse({'error': 'access forbidden'}, status=401)
        else:
            return HttpResponse(status=404)
    except:
        return HttpResponse(status=500)


def get_user(request):
    """
    Handles the /user endpoint.
    """
    try:
        if request.method == 'GET':
            data = request.GET
            if 'HTTP_AUTHORIZATION' not in  request.META:
                return JsonResponse({'error': 'access forbidden'}, status=401)
            authentication = request.META['HTTP_AUTHORIZATION'][7:]  # starts with "Bearer "
            email = data['email']
            bearer_manager = Bearer.objects
            if bearer_manager.verify_token(authentication, email):
                db = BitdotioDB(os.getenv(token))
                user_info = db.db_query(f'SELECT email, address FROM {DB_USERS} '
                                        f'WHERE email = \'{email}\'')
                return JsonResponse({'email': email,
                                     'address': user_info[0][1]
                                     })
            else:
                return JsonResponse({'error': 'access forbidden'}, status=401)
        else:
            return HttpResponse(status=404)
    except:
        return HttpResponse(status=500)


@csrf_exempt
def post_friend_request(request):
    """
    Handles the /sendFriendReq endpoint.
    """
    try:
        if request.method == 'POST':
            data = request.POST
            if 'HTTP_AUTHORIZATION' not in  request.META:
                return JsonResponse({'error': 'access forbidden'}, status=401)
            authentication = request.META['HTTP_AUTHORIZATION'][7:]  # starts with "Bearer "
            requester = data['requesterEmail']
            receiver = data['receiverEmail']
            bearer_manager = Bearer.objects
            if bearer_manager.verify_token(authentication, requester):
                db = BitdotioDB(os.getenv(token))
                if requester == receiver:
                    return JsonResponse({'error': 'cannot friend yourself'}, status=400)
                receiver_data = db.db_query(f'SELECT email FROM {DB_USERS} '
                                            f'WHERE email = \'{receiver}\'')
                if len(receiver_data) <= 0:
                    return JsonResponse({'error': 'user not found'}, status=404)
                fr_req_data = db.db_query(f'SELECT status FROM {DB_FRIENDS} '
                                          f'WHERE (user1 = \'{requester}\' '
                                          f'AND user2 = \'{receiver}\') '
                                          f'OR (user1 = \'{receiver}\' '
                                          f'AND user2 = \'{requester}\')')
                if len(fr_req_data) > 0:
                    if int(fr_req_data[0][0]) == 0:
                        return JsonResponse({'error': 'already friends with user'}, status=400)
                    else:
                        return JsonResponse({'error': 'pending friend request already exists'}, status=400)
                db.db_query(f'INSERT INTO {DB_FRIENDS} VALUES (\'{requester}\', \'{receiver}\', 1)')
                return HttpResponse(status=201)
            else:
                return JsonResponse({'error': 'access forbidden'}, status=401)
        else:
            return HttpResponse(status=404)
    except:
        return HttpResponse(status=500)


@csrf_exempt
def post_friend_request_response(request):
    """
    Handles the /respondFriendReq endpoint.
    """
    try:
        if request.method == 'POST':
            data = request.POST
            if 'HTTP_AUTHORIZATION' not in  request.META:
                return JsonResponse({'error': 'access forbidden'}, status=401)
            authentication = request.META['HTTP_AUTHORIZATION'][7:]  # starts with "Bearer "
            requester = data['requesterEmail']
            receiver = data['receiverEmail']
            response = data['response']
            bearer_manager = Bearer.objects
            if bearer_manager.verify_token(authentication, receiver):
                db = BitdotioDB(os.getenv(token))
                requester_data = db.db_query(f'SELECT email FROM {DB_USERS} '
                                             f'WHERE email = \'{requester}\'')
                if len(requester_data) <= 0:
                    return JsonResponse({'error': 'friend request not found'}, status=404)
                fr_req_data = db.db_query(f'SELECT COUNT(*) FROM {DB_FRIENDS} '
                                          f'WHERE user1 = \'{requester}\' '
                                          f'AND user2 = \'{receiver}\'')
                if fr_req_data[0][0] <= 0:
                    return JsonResponse({'error': 'no friend request to reply to'})
                if bool(response) is True:
                    db.db_query(f'UPDATE {DB_FRIENDS} SET status = 0 WHERE user1 = \'{requester}\' '
                                f'AND user2 = \'{receiver}\'')

                else:
                    db.db_query(f'DELETE FROM {DB_FRIENDS} WHERE user1 = \'{requester}\' '
                                f'AND user2 = \'{receiver}\'')
                return JsonResponse({'response': response})
            else:
                return JsonResponse({'error': 'access forbidden'}, status=401)
        else:
            return HttpResponse(status=404)
    except:
        return HttpResponse(status=500)
