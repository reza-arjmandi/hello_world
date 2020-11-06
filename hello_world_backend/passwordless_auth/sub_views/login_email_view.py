from rest_framework.views import APIView

from passwordless_auth.modules.passwordless_auth import PasswordlessAuth
from passwordless_auth.modules.passwordless_auth import LoginEmailIsNotValid
from passwordless_auth.sub_views.response_factory import ResponseFactory

class LoginEmailView(APIView):

    def post(self, request, format=None):
        email = request.data['email']

        try:
            PasswordlessAuth.create_and_email_login_token(email)
            return ResponseFactory.create_login_token_response()
        except LoginEmailIsNotValid:
            return ResponseFactory.create_invalid_login_email_response()