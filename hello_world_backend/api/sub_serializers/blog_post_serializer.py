from rest_framework.serializers import HyperlinkedModelSerializer

from api.models import BlogPost

class BlogPostSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = BlogPost
        fields = [
            'url', 'id', 'owner', 'title', 
            'date', 'image', 'snippet', 'content']