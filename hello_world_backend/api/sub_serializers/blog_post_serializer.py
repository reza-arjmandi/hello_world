from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.serializers import ReadOnlyField

from api.models import BlogPost

class BlogPostSerializer(HyperlinkedModelSerializer):

    owner = ReadOnlyField(source='owner.username')

    class Meta:
        model = BlogPost
        fields = [
            'url', 'id', 'owner', 'title', 
            'date', 'image', 'snippet', 'content']