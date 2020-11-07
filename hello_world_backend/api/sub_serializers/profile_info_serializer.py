from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.serializers import ReadOnlyField

from api.models import ProfileInfo

class ProfileInfoSerializer(HyperlinkedModelSerializer):

    owner = ReadOnlyField(source='owner.username')

    class Meta:
        model = ProfileInfo
        fields = ['url', 'id', 'owner', 'user_type', 
            'timezone', 'skype_link', 'is_completed', 'avatar']