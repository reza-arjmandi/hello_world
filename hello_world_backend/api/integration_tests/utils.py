import random

from rest_framework import status

from hamcrest import assert_that
from hamcrest import equal_to
from hamcrest import has_length

from utils.test.random_generator import RandomGenerator
from passwordless_auth.integration_tests.utils import Utils as \
    PasswordlessAuthUtils

class Utils:

    random_generator = RandomGenerator()

    def create_random_users_credentials(
        client, number_of_users=random.randint(2, 6)):
        email_list = []
        credentials = []
        for i in range(number_of_users):
            (email, login_token) = PasswordlessAuthUtils.submit_an_email(
                client)
            result = PasswordlessAuthUtils.create_auth_token(
                client, email, login_token)
            email_list.append(email)
            credentials.append(result)
            assert_that(result['response'].status_code, 
            equal_to(status.HTTP_201_CREATED))
            assert_that(result['json_content']['token'], has_length(40))
        return (email_list, credentials)

    def clear_client_auth_h(client):
        client.credentials(HTTP_AUTHORIZATION='')

    def set_client_auth_h(client, token):
        client.credentials(HTTP_AUTHORIZATION='Token ' + token)

    def authenticate_with_a_user(client, is_admin=False):
        user = Utils.random_generator.generate_admin_user() if is_admin \
            else Utils.random_generator.generate_user()
        client.force_authenticate(user=user)
        return user

    def assert_is_unauthorized(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_401_UNAUTHORIZED))

    def assert_is_forbidden(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_403_FORBIDDEN))

    def assert_is_created(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_201_CREATED))

    def assert_is_ok(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_200_OK))
    
    def assert_method_is_not_allowed(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_405_METHOD_NOT_ALLOWED))
