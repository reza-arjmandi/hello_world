import random

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.utils import timezone
from django.core.mail import send_mail

from passwordless_auth.models import LoginToken
from passwordless_auth.serializers import LoginTokenSerializer

class LoginEmailView(APIView):
    def post(self, request, format=None):
        if LoginToken.objects.filter(email=request.data['email']).exists():
            login_token = LoginToken.objects.get(email=request.data['email'])
            token = str(random.randint(100000, 999999))
            login_token.token = token
            login_token.created = timezone.now()
            login_token.save()
            send_mail(
                    'Your Login Token',
                    'Use this code to log in: ' + token,
                    'HelloWorld@halloenglish.com',
                    [request.data['email']],
                    fail_silently=False,
                )
            result = {"detail" : "A login token has been sent to your email."}
            return Response(result, status=status.HTTP_200_OK)
        else:
            token = str(random.randint(100000, 999999))
            email = request.data['email']
            _data = {
                'email' : email,
                'token': token }
            serializer = LoginTokenSerializer(data=_data)
            if serializer.is_valid():
                send_mail(
                    'Your Login Token',
                    'Use this code to log in: ' + token,
                    'HelloWorld@halloenglish.com',
                    [email],
                    fail_silently=False,
                )
                serializer.save()
                result = {"detail" : "A login token has been sent to your email."}
                return Response(result, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TokenView(APIView):
    def post(self, request, format=None):
        try:
            token = LoginToken.objects.get(email=request.data['email'])
            now = timezone.now()
            duration = (now - token.created).seconds
            if duration > 15 * 60:
                result = {"detail" : "The token is expired."}
                return Response(result, 
                    status=status.HTTP_408_REQUEST_TIMEOUT)

            if User.objects.filter(username=token.email).exists():
                if token.token != request.data['token']:
                    result = {"detail" : "Login token is not valid."}
                    return Response(result, status=status.HTTP_400_BAD_REQUEST)

                user_ = User.objects.get(username=token.email)
                created_token = Token.objects.get_or_create(user=user_)
                result = {"token" : str(created_token[0])}
                return Response(result, status=status.HTTP_200_OK)

            if token.token == request.data['token']:
                created_user = User.objects.create_user(
                    token.email,
                    email=token.email, 
                    password=User.objects.make_random_password())
                
                profile_info = created_user.ProfileInfo.create(
                    owner=created_user,
                    user_type="learner", 
                    timezone="invalid", 
                    skype_link="invalid", 
                    is_completed=False
                )
                profile_info.save()
                     
                avatar = profile_info.Avatar.create(avatar="photos/user.png")
                avatar.save()

                created_token = Token.objects.create(user=created_user)
                result = {"token" : str(created_token)}
                return Response(result, status=status.HTTP_200_OK)
            result = {"detail" : "Login token is not valid."}
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        except LoginToken.DoesNotExist:
            result = {"detail" : "Login token does not exist."}
            return Response(result, status=status.HTTP_404_NOT_FOUND)
        

