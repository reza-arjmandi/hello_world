from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.serializers import ReadOnlyField

from api.models import EnglishClass

from api.sub_serializers.membership_serializer import MembershipSerializer

class EnglishClassSerializer(HyperlinkedModelSerializer):

    owner = ReadOnlyField(source='owner.username')
    memberships = MembershipSerializer(
        source="membership_set", many=True, read_only=True)

    class Meta:
        model = EnglishClass
        fields = [
            'url', 'id', 'owner', 'title', 
            'description', 'created', 'date_time', 
            'skype_link', 'image', 'capacity', 'members', 'memberships']