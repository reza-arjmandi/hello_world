from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.serializers import ReadOnlyField

from api.models import Membership

class MembershipSerializer(HyperlinkedModelSerializer):

    owner = ReadOnlyField(source='profile_info.owner.username')

    class Meta:
        model = Membership
        fields = ['url', 'id', 'profile_info', 
        'english_class', 'date_joined', 'owner']