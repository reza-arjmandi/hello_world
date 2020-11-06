import os

from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.http import FileResponse

from api.models import ProfileAvatar
from api.serializers import ProfileAvatarSerializer
from api.permissions import IsAdminOrOwnerProfileAvatar

class ProfileAvatarViewSet(ModelViewSet):
    authentication_classes = [
        BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrOwnerProfileAvatar]
    
    queryset = ProfileAvatar.objects.all()
    serializer_class = ProfileAvatarSerializer

class PhotoDetail(APIView):

    def get(self, request, pk, format=None):
        photo = open(os.path.join(os.getcwd(), 'photos', pk), 'rb')
        return FileResponse(photo)