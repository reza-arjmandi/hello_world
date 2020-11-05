from rest_framework.serializers import ModelSerializer

from passwordless_auth.models import LoginToken

class LoginTokenSerializer(ModelSerializer):
    
    class Meta:
        model = LoginToken
        fields = ['email', 'token']