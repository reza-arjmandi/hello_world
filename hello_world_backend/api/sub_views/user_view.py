from rest_framework.viewsets import ReadOnlyModelViewSet

from django.contrib.auth.models import User

from api.serializers import UserSerializer

class UserViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
