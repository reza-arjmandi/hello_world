from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAdminUser
from django.contrib.auth.models import User

from api.serializers import UserSerializer

class UserViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
