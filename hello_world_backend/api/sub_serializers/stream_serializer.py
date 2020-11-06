from rest_framework.serializers import HyperlinkedModelSerializer

from api.models import Stream

class StreamSerializer(HyperlinkedModelSerializer):
    
    class Meta:
        model = Stream
        fields = ['url', 'id', 'title', 'description', 'stream_url']