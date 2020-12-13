from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication

from api.models import EnglishClass
from api.serializers import EnglishClassSerializer
from api.permissions import IsTeacherOrReadOnly


class EnglishClassViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsTeacherOrReadOnly]
    
    queryset = EnglishClass.objects.all().order_by('-id')
    serializer_class = EnglishClassSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        owner = self.request.query_params.get('owner', None)
        if owner is not None:
            return EnglishClass.objects.filter(
                owner__username=owner).order_by('-id')
        else:
            return EnglishClass.objects.all().order_by('-id')
