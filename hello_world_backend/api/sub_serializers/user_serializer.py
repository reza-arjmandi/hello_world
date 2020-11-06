from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.serializers import HyperlinkedRelatedField
from django.contrib.auth.models import User

from api.models import ProfileInfo

class UserSerializer(HyperlinkedModelSerializer):
    ProfileInfo = HyperlinkedRelatedField(
        many=True, 
        queryset=ProfileInfo.objects.all(), 
        view_name="profileinfo-detail")

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'ProfileInfo']