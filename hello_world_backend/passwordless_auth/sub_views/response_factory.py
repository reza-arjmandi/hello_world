from rest_framework.response import Response
from rest_framework.status import HTTP_408_REQUEST_TIMEOUT
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.status import HTTP_201_CREATED

class ResponseFactory:

    def create_auth_token_response(token):
        content = {"token" : str(token)}
        return Response(content, status=HTTP_201_CREATED)

    def create_login_token_response():
        return ResponseFactory.__create_detail_response__(
            "A login token has been sent to your email.", HTTP_201_CREATED)

    def create_invalid_login_email_response():
        return ResponseFactory.__create_detail_response__(
            "Login email is not valid.", HTTP_400_BAD_REQUEST)

    def create_login_token_does_not_exist_response():
        return ResponseFactory.__create_detail_response__(
            "Login token does not exist.", HTTP_404_NOT_FOUND)

    def create_invalid_login_token_response():
        return ResponseFactory.__create_detail_response__(
            "Login token is not valid.", HTTP_400_BAD_REQUEST)

    def create_login_token_expired_response():
        return ResponseFactory.__create_detail_response__(
            "The token is expired.", HTTP_408_REQUEST_TIMEOUT)

    def __create_detail_response__(message, status_):
        content = {"detail" : message}
        return Response(content, status=status_)