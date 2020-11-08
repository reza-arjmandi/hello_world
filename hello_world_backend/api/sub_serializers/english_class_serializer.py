from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.serializers import ReadOnlyField

from api.models import EnglishClass

class EnglishClassSerializer(HyperlinkedModelSerializer):

    owner = ReadOnlyField(source='owner.username')

    class Meta:
        model = EnglishClass
        fields = [
            'url', 'id', 'owner', 'title', 
            'description', 'created', 'date_time', 
            'skype_link', 'image', 'capacity']