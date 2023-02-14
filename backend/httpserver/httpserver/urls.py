"""httpserver URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path("/login", views.get_login_credentials, name='login'),
    path("/create", views.post_create_user, name='create'),
    path("/locations", views.get_locations, name='locations'),
    path("/friends", views.get_friends, name='friends'),
    path("/user", views.get_user, name='user'),
    path("/sendFriendReq", views.post_friend_request, name='sendFriendReq'),
    path("/respondFriendReq", views.post_request_response, name='respondFriendReq'),
]
