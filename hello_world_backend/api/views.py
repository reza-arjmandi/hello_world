from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django.core.mail import send_mail
from django.http import FileResponse

from api.models import Stream
from api.models import HomePage

from api.serializers import StreamSerializer
from api.serializers import HomePageSerializer
from api.serializers import LoginTokenSerializer

import os
import random

class LoginTokenView(APIView):
    def post(self, request, format=None):
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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StreamViewSet(ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Stream.objects.all().order_by('-id')
    serializer_class = StreamSerializer

class HomePageViewSet(ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    queryset = HomePage.objects.all()
    serializer_class = HomePageSerializer

class PhotoDetail(APIView):

    def get(self, request, pk, format=None):
        photo = open(os.path.join(os.getcwd(), 'photos', pk), 'rb')
        return FileResponse(photo)