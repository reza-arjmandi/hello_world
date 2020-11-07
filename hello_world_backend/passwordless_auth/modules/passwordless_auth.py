import random

from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.utils import timezone
from django.core.mail import send_mail

from passwordless_auth.models import LoginToken
from passwordless_auth.serializers import LoginTokenSerializer

class LoginEmailIsNotValid(Exception):

    def __init__(self, message):
        self.__message__ = message

class LoginTokenDoesNotExist(Exception):

    def __init__(self, message):
        self.__message__ = message

class LoginTokenIsExpired(Exception):

    def __init__(self, message):
        self.__message__ = message

class LoginTokenIsNotValid(Exception):

    def __init__(self, message):
        self.__message__ = message

class PasswordlessAuth:

    def create_auth_token(email, emailed_login_token):
        if not PasswordlessAuth.__is_login_token_exists__(email):
            raise LoginTokenDoesNotExist("Login token does not exist.")
        login_token = PasswordlessAuth.__get_login_token__(email)
        if PasswordlessAuth.__is_expired__(login_token):
            raise LoginTokenIsExpired("Login token is expired.")
        if not PasswordlessAuth.__is_token_valid__(
            login_token, emailed_login_token):
            raise LoginTokenIsNotValid("Login token is not valid")
        user = PasswordlessAuth.__get_or_create_user__(login_token.email)
        auth_token = PasswordlessAuth.__create_token__(user)
        return auth_token[0]

    def create_and_email_login_token(email):
        if not PasswordlessAuth.__is_login_token_exists__(email):
            PasswordlessAuth.__create_login_token__(email)
            return
        PasswordlessAuth.__update_login_token__(email)

    def __is_login_token_exists__(email):
        return LoginToken.objects.filter(email=email).exists()

    def __get_login_token__(email):
        return LoginToken.objects.get(email=email)

    def __is_expired__(token):
        now = timezone.now()
        duration = (now - token.created).seconds
        if duration > 15 * 60:
            return True
        else:
            return False

    def __is_token_valid__(token, emailed_login_token):
        if token.token != emailed_login_token:
            return False
        else:
            return True
    
    def __is_user_exists__(email):
        return User.objects.filter(username=email).exists()

    def __create_user__(email):
        created_user = User.objects.create_user(
            email,
            email=email, 
            password=User.objects.make_random_password())
        return created_user

    def __create_profile_info__(user):
        profile_info = user.ProfileInfo.create(
                    owner=user,
                    user_type="learner", 
                    timezone="invalid", 
                    skype_link="invalid", 
                    is_completed=False,
                    avatar="photos/user.png"
                )
        profile_info.save()
        return profile_info

    def __get_or_create_user__(email):
        if PasswordlessAuth.__is_user_exists__(email):
                return User.objects.get(username=email)
        
        created_user = PasswordlessAuth.__create_user__(email)
        profile_info = PasswordlessAuth.__create_profile_info__(created_user)
        return created_user

    def __create_token__(user):
        return Token.objects.get_or_create(user=user)

    def __generate_random_login_token__():
        return str(random.randint(100000, 999999))

    def __create_login_token__(email):
        login_token = PasswordlessAuth.__generate_random_login_token__()
        _data = {
            'email' : email,
            'token': login_token }
        serializer = LoginTokenSerializer(data=_data)
        if not serializer.is_valid():
            raise LoginEmailIsNotValid("Login email is not valid.")
        
        PasswordlessAuth.__mail_token__(email, login_token)
        serializer.save()

    def __update_login_token__(email_):
        login_token = PasswordlessAuth.__get_login_token__(email_)
        token = PasswordlessAuth.__generate_random_login_token__()
        login_token.token = token
        login_token.created = timezone.now()
        login_token.save()
        PasswordlessAuth.__mail_token__(email_, token)

    def __mail_token__(email, token):
        send_mail(
            'Your Login Token',
            'Use this code to log in: ' + token,
            'HelloWorld@halloenglish.com',
            [email],
            fail_silently=False,
        )
