from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User, Group

from django.core.mail import send_mail
from django.http import FileResponse

from api.models import Stream
from api.models import HomePage

from api.serializers import StreamSerializer
from api.serializers import HomePageSerializer
from api.serializers import LoginTokenSerializer
from api.models import LoginToken
from rest_framework import status

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.utils import timezone

import os
import random
import datetime

class LoginEmailView(APIView):
    def post(self, request, format=None):
        if LoginToken.objects.filter(email=request.data['email']).exists():
            login_token = LoginToken.objects.get(email=request.data['email'])
            token = str(random.randint(100000, 999999))
            login_token.token = token
            login_token.created = timezone.now()
            login_token.save()
            send_mail(
                    'Your Login Token',
                    'Use this code to log in: ' + token,
                    'HelloWorld@halloenglish.com',
                    [request.data['email']],
                    fail_silently=False,
                )
            result = {"detail" : "A login token has been sent to your email."}
            return Response(result, status=status.HTTP_200_OK)
        else:
            token = str(random.randint(100000, 999999))
            email = request.data['email']
            _data = {
                'email' : email,
                'token': token }
            serializer = LoginTokenSerializer(data=_data)
            if serializer.is_valid():
                send_mail(
                    'Your Login Token',
                    'Use this code to log in: ' + token,
                    'HelloWorld@halloenglish.com',
                    [email],
                    fail_silently=False,
                )
                serializer.save()
                result = {"detail" : "A login token has been sent to your email."}
                return Response(result, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TokenView(APIView):
    def post(self, request, format=None):
        try:
            token = LoginToken.objects.get(email=request.data['email'])
            now = timezone.now()
            duration = (now - token.created).seconds
            if duration > 15 * 60:
                result = {"detail" : "The token is expired."}
                return Response(result, 
                    status=status.HTTP_408_REQUEST_TIMEOUT)

            if User.objects.filter(username=token.email).exists():
                if token.token != request.data['token']:
                    result = {"detail" : "Login token is not valid."}
                    return Response(result, status=status.HTTP_400_BAD_REQUEST)

                user_ = User.objects.get(username=token.email)
                created_token = Token.objects.get_or_create(user=user_)
                result = {"token" : str(created_token[0])}
                return Response(result, status=status.HTTP_200_OK)

            if token.token == request.data['token']:
                created_user = User.objects.create_user(
                    token.email, 
                    email=token.email, 
                    password=User.objects.make_random_password())
                created_token = Token.objects.create(user=created_user)
                result = {"token" : str(created_token)}
                return Response(result, status=status.HTTP_200_OK)
            result = {"detail" : "Login token is not valid."}
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        except LoginToken.DoesNotExist:
            result = {"detail" : "Login token does not exist."}
            return Response(result, status=status.HTTP_404_NOT_FOUND)
        

class StreamViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Stream.objects.all().order_by('-id')
    serializer_class = StreamSerializer

class HomePageViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    queryset = HomePage.objects.all()
    serializer_class = HomePageSerializer

class PhotoDetail(APIView):

    def get(self, request, pk, format=None):
        photo = open(os.path.join(os.getcwd(), 'photos', pk), 'rb')
        return FileResponse(photo)