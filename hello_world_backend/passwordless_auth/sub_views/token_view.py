from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.utils import timezone

from freezegun import freeze_time

from passwordless_auth.models import LoginToken

class TokenView(APIView):

    def __is_expired__(self, token):
        now = timezone.now()
        duration = (now - token.created).seconds
        if duration > 15 * 60:
            return True
        else:
            return False

    def __is_token_valid__(self, token, request):
        if token.token != request.data['token']:
            return False
        else:
            return True

    def __get_expire_response__(self):
        content = {"detail" : "The token is expired."}
        return Response(content, status=status.HTTP_408_REQUEST_TIMEOUT)
    
    def __get_invalid_token_response__(self):
        content = {"detail" : "Login token is not valid."}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    def __get_login_token_does_not_exist_response__(self):
        content = {"detail" : "Login token does not exist."}
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    def __create_token_response__(self, token):
        content = {"token" : str(token)}
        return Response(content, status=status.HTTP_201_CREATED)

    def __is_user_exists__(self, email):
        return User.objects.filter(username=email).exists()

    def __create_user__(self, email):
        created_user = User.objects.create_user(
            email,
            email=email, 
            password=User.objects.make_random_password())
        return created_user

    def __create_profile_info__(self, user):
        profile_info = user.ProfileInfo.create(
                    owner=user,
                    user_type="learner", 
                    timezone="invalid", 
                    skype_link="invalid", 
                    is_completed=False
                )
        profile_info.save()
        return profile_info
    
    def __create_avatar__(self, profile_info):
        avatar = profile_info.Avatar.create(avatar="photos/user.png")
        avatar.save()

    def __get_or_create_user__(self, email):
        if self.__is_user_exists__(email):
                return User.objects.get(username=email)
        
        created_user = self.__create_user__(email)
        profile_info = self.__create_profile_info__(created_user)
        self.__create_avatar__(profile_info)
        return created_user

    def __create_token__(self, user):
        return Token.objects.get_or_create(user=user)

    def __is_login_token_exists__(self, email):
        return LoginToken.objects.filter(email=email).exists()

    def __get_login_token__(self, email):
        return LoginToken.objects.get(email=email)

    def post(self, request, format=None):
        email = request.data['email']
        if not self.__is_login_token_exists__(email):
            return self.__get_login_token_does_not_exist_response__()

        login_token = self.__get_login_token__(email)
        if self.__is_expired__(login_token):
            return self.__get_expire_response__()

        if not self.__is_token_valid__(login_token, request):
            return self.__get_invalid_token_response__()

        user = self.__get_or_create_user__(login_token.email)
        auth_token = self.__create_token__(user)
        return self.__create_token_response__(auth_token[0])