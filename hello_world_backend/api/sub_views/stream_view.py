from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination

from api.models import Stream
from api.serializers import StreamSerializer
from api.permissions import IsAdminOrReadOnly

class VideoPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100000

class StreamViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = VideoPagination
    queryset = Stream.objects.all().order_by('-id')
    serializer_class = StreamSerializer