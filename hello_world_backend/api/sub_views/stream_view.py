from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication

from api.models import Stream
from api.serializers import StreamSerializer
from api.permissions import IsAdminOrReadOnly

class StreamViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAdminOrReadOnly]

    queryset = Stream.objects.all().order_by('-id')
    serializer_class = StreamSerializer