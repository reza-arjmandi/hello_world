import os

from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from rest_framework.generics import RetrieveAPIView

from django.contrib.auth.models import User
from django.http import FileResponse

from api.models import Stream
from api.models import ProfileInfo
from api.models import ProfileAvatar
from api.models import BlogPost
from api.serializers import StreamSerializer
from api.serializers import ProfileInfoSerializer
from api.serializers import ProfileAvatarSerializer
from api.serializers import UserSerializer
from api.serializers import BlogPostSerializer
from api.permissions import IsAdminOrReadOnly
from api.permissions import IsAdminOrOwner
from api.permissions import IsAdminOrOwnerProfileAvatar

class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class StreamViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdminOrReadOnly]

    queryset = Stream.objects.all().order_by('-id')
    serializer_class = StreamSerializer

class ProfileInfoViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrOwner]
    
    queryset = ProfileInfo.objects.all()
    serializer_class = ProfileInfoSerializer
    
    def get_queryset(self):
        if self.request.user.is_superuser:
            return ProfileInfo.objects.all()
        return self.request.user.ProfileInfo.all()

class ProfileAvatarViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrOwnerProfileAvatar]
    
    queryset = ProfileAvatar.objects.all()
    serializer_class = ProfileAvatarSerializer

class PhotoDetail(APIView):

    def get(self, request, pk, format=None):
        photo = open(os.path.join(os.getcwd(), 'photos', pk), 'rb')
        return FileResponse(photo)

class BlogPostViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAdminOrReadOnly]
    
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer