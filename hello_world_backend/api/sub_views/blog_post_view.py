from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination

from api.models import BlogPost
from api.serializers import BlogPostSerializer
from api.permissions import IsAdminOrReadOnly

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 10000

class BlogPostViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = LargeResultsSetPagination
    queryset = BlogPost.objects.all().order_by('-id')
    serializer_class = BlogPostSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)