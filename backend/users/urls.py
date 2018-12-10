# -*- coding:utf-8 -*-
from django.urls import path
from .views import *

app_name = 'users'

urlpatterns = [
    path('v1/register/', UserRegisterView.as_view()),
]
