from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.exceptions import APIException

from api.models import ProfileInfo
from api.serializers import ProfileInfoSerializer
from api.permissions import IsAdminOrOwner

class ClassIsFull(APIException):
    status_code = 400
    default_detail = 'The class is full'
    default_code = 'bad_request'

class ProfileInfoViewSet(
    ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrOwner]
    
    queryset = ProfileInfo.objects.all()
    serializer_class = ProfileInfoSerializer
    
    def get_queryset(self):
        if self.request.user.is_superuser:
            return ProfileInfo.objects.all()
        return self.request.user.ProfileInfo.all()

    def perform_update(self, serializer):
        if "classes" in serializer.validated_data:
            for _class in serializer.validated_data["classes"]:
                if _class.capacity == 0:
                    raise ClassIsFull()
                _class.capacity = _class.capacity - 1
                _class.save() 
        serializer.save()