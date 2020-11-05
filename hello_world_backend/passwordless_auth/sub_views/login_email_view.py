import random

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.utils import timezone
from django.core.mail import send_mail

from passwordless_auth.models import LoginToken
from passwordless_auth.serializers import LoginTokenSerializer

class LoginEmailView(APIView):

    def __generate_random_token__(self):
        return str(random.randint(100000, 999999))

    def __mail_token__(self, email, token):
        send_mail(
            'Your Login Token',
            'Use this code to log in: ' + token,
            'HelloWorld@halloenglish.com',
            [email],
            fail_silently=False,
        )

    def __get_response__(self):
        content = {"detail" : "A login token has been sent to your email."}
        return Response(content, status=status.HTTP_201_CREATED)

    def __update_login_token__(self, email_):
        login_token = LoginToken.objects.get(email=email_)
        token = self.__generate_random_token__()
        login_token.token = token
        login_token.created = timezone.now()
        login_token.save()
        self.__mail_token__(email_, token)
        return self.__get_response__()

    def __create_login_token__(self, email):
        token = self.__generate_random_token__()
        _data = {
            'email' : email,
            'token': token }
        serializer = LoginTokenSerializer(data=_data)
        if serializer.is_valid():
            self.__mail_token__(email, token)
            serializer.save()
            return self.__get_response__()
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def __is_login_token_exists__(self, email):
        return LoginToken.objects.filter(email=email).exists()

    def post(self, request, format=None):
        email = request.data['email']
        if not self.__is_login_token_exists__(email):
            return self.__create_login_token__(email)

        return self.__update_login_token__(email)