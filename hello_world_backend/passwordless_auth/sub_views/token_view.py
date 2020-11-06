from rest_framework.views import APIView

from passwordless_auth.modules.passwordless_auth import LoginTokenDoesNotExist
from passwordless_auth.modules.passwordless_auth import LoginTokenIsExpired
from passwordless_auth.modules.passwordless_auth import LoginTokenIsNotValid
from passwordless_auth.modules.passwordless_auth import PasswordlessAuth
from passwordless_auth.sub_views.response_factory import ResponseFactory

class TokenView(APIView):

    def post(self, request, format=None):
        email = request.data['email']
        emailed_login_token = request.data['token']

        try:
            auth_token = PasswordlessAuth.create_auth_token(
                email, emailed_login_token)
            return ResponseFactory.create_auth_token_response(auth_token)
        except LoginTokenDoesNotExist:
            return ResponseFactory.create_login_token_does_not_exist_response()
        except LoginTokenIsExpired:
            return ResponseFactory.create_login_token_expired_response()
        except LoginTokenIsNotValid:
            return ResponseFactory.create_invalid_login_token_response()
