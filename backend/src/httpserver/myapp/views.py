from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse


def post_create_user(request):
    """
    Handles the /create endpoint.
    """
    if request.method == 'POST':
        data = request.POST
    return HttpResponse('Thanks for submitting your data')


def get_login_credentials(request):
    """
    Handles the /login endpoint.
    """
    if request.method == 'GET':
        data = request.GET
    return HttpResponse('Thanks for submitting your data')


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
