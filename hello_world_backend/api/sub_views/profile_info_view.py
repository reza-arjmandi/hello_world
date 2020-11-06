from rest_framework.authentication import SessionAuthentication
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.viewsets import GenericViewSet

from api.models import ProfileInfo
from api.serializers import ProfileInfoSerializer
from api.permissions import IsAdminOrOwner

class ProfileInfoViewSet(
    ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    authentication_classes = [
        BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrOwner]
    
    queryset = ProfileInfo.objects.all()
    serializer_class = ProfileInfoSerializer
    
    def get_queryset(self):
        if self.request.user.is_superuser:
            return ProfileInfo.objects.all()
        return self.request.user.ProfileInfo.all()