from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.serializers import HyperlinkedRelatedField
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ReadOnlyField
from django.contrib.auth.models import User

from api.models import Stream
from api.models import HomePage
from api.models import LoginToken
from api.models import ProfileInfo
from api.models import ProfileAvatar
from api.models import BlogPost

class UserSerializer(HyperlinkedModelSerializer):
    ProfileInfo = HyperlinkedRelatedField(many=True, queryset=ProfileInfo.objects.all(), view_name="profileinfo-detail")

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'ProfileInfo']

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

class ProfileInfoSerializer(HyperlinkedModelSerializer):

    Avatar = HyperlinkedRelatedField(many=True, queryset=ProfileAvatar.objects.all(), view_name="profileavatar-detail")
    owner = ReadOnlyField(source='owner.username')

    class Meta:
        model = ProfileInfo
        fields = ['url', 'id', 'owner', 'user_type', 
            'timezone', 'skype_link', 'is_completed', 'Avatar']

class ProfileAvatarSerializer(HyperlinkedModelSerializer):
    
    class Meta:
        model = ProfileAvatar
        fields = ['url', 'id', 'avatar']

class BlogPostSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = BlogPost
        fields = [
            'url', 'id', 'owner', 'title', 
            'date', 'image', 'snippet', 'content']

