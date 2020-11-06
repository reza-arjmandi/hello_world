from rest_framework.generics import ListAPIView
from rest_framework.generics import RetrieveAPIView

from django.contrib.auth.models import User

from api.serializers import UserSerializer

class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer