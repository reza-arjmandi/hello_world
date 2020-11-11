from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication

from api.models import BlogPost
from api.serializers import BlogPostSerializer
from api.permissions import IsAdminOrReadOnly

class BlogPostViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAdminOrReadOnly]
    
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)