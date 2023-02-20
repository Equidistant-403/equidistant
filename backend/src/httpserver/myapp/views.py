from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse

def post_create_user(request):
    if request.method == 'POST':
        data = request.POST
    return HttpResponse('Thanks for submitting your data')

def get_login_credentials(request):
    if request.method == 'GET':
        data = request.GET
    return HttpResponse('Thanks for submitting your data')

def get_locations(request):
    if request.method == 'GET':
        data = request.GET
    return HttpResponse('Thanks for submitting your data')

def get_friends(request):
    if request.method == 'GET':
        data = request.GET
    return HttpResponse('Thanks for submitting your data')

def get_user(request):
    if request.method == 'GET':
        data = request.GET
    return HttpResponse('Thanks for submitting your data')

def post_friend_request(request):
    if request.method == 'POST':
        data = request.POST
    return HttpResponse('Thanks for submitting your data')

def post_friend_request_response(request):
    if request.method == 'POST':
        data = request.POST
    return HttpResponse('Thanks for submitting your data')
