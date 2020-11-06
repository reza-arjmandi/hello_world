from rest_framework.serializers import HyperlinkedModelSerializer

from api.models import ProfileAvatar

class ProfileAvatarSerializer(HyperlinkedModelSerializer):
    
    class Meta:
        model = ProfileAvatar
        fields = ['url', 'id', 'avatar']