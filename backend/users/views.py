# -*- coding:utf-8 -*-
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.serializer import *


UserModel = get_user_model()


class UserRegisterView(APIView):
    def post(self, request):
        t = UserModel.objects.all()[0]
        print(t.username)
        print(t.email)
        return Response(status=status.HTTP_200_OK)
