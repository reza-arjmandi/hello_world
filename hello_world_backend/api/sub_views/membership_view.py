from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import APIException

from api.models import Membership
from api.models import ProfileInfo
from api.serializers import MembershipSerializer
from api.permissions import IsAdminOrOwner

class ClassIsFull(APIException):
    status_code = 400
    default_detail = 'The class is full'
    default_code = 'bad_request'

class MembershipViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrOwner]

    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ProfileInfo.Membership.objects.all()
        return self.request.user.ProfileInfo.Membership.all()

    def perform_create(self, serializer):
        if "english_class" in serializer.validated_data:
            _class = serializer.validated_data["english_class"]
            if _class.capacity == 0:
                raise ClassIsFull()
            _class.capacity = _class.capacity - 1
            _class.save() 
        serializer.save()
