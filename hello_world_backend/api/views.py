from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django.http import FileResponse

from api.models import Stream
from api.models import HomePage

from api.serializers import StreamSerializer
from api.serializers import HomePageSerializer

import os

class StreamViewSet(ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Stream.objects.all().order_by('-id')
    serializer_class = StreamSerializer

class HomePageViewSet(ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    queryset = HomePage.objects.all()
    serializer_class = HomePageSerializer

class PhotoDetail(APIView):

    def get(self, request, pk, format=None):
        photo = open(os.path.join(os.getcwd(), 'photos', pk), 'rb')
        return FileResponse(photo)