from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.serializers import ModelSerializer

from api.models import Stream
from api.models import HomePage
from api.models import LoginToken

class StreamSerializer(HyperlinkedModelSerializer):
    
    class Meta:
        model = Stream
        fields = ['url', 'id', 'title', 'description', 'stream_url']


class LoginTokenSerializer(ModelSerializer):
    
    class Meta:
        model = LoginToken
        fields = ['email', 'token']

class HomePageSerializer(HyperlinkedModelSerializer):
    
    class Meta:
        model = HomePage
        fields = [
            'url', 'id', 'background_image', 
            'introduction_video_url', 'introduction_video_title', 
            'introduction_video_description']
