from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.parsers import JSONParser

from django.urls import reverse
from django.core import mail 
from django.utils import timezone

from hamcrest import equal_to
from hamcrest import assert_that

from freezegun import freeze_time

from passwordless_auth.integration_tests.utils import Utils
from utils.test.random_generator import RandomGenerator

class TestToken(APITestCase):

    def setUp(self):
        self.json_parser = JSONParser()
        self.random_generator = RandomGenerator()
    
    def assert_token_is_created(self, result):
        assert_that(result['response'].status_code, 
            equal_to(status.HTTP_201_CREATED))
        assert_that(len(result['json_content']['token']), equal_to(40))

    def assert_token_is_not_found(self, result):
        assert_that(result['response'].status_code, 
            equal_to(status.HTTP_404_NOT_FOUND))
        assert_that(result['json_content']['detail'], 
            equal_to('Login token does not exist.'))

    def assert_token_is_expired(self, result):
        assert_that(result['response'].status_code, 
            equal_to(status.HTTP_408_REQUEST_TIMEOUT))
        assert_that(result['json_content']['detail'], 
            equal_to('The token is expired.'))

    def assert_login_token_is_invalid(self, result):
        assert_that(result['response'].status_code, 
            equal_to(status.HTTP_400_BAD_REQUEST))
        assert_that(result['json_content']['detail'], 
            equal_to('Login token is not valid.'))

    def test_create_token(self):
        (email, login_token) = Utils.submit_an_email(self.client)
        response = Utils.create_auth_token(self.client, email, login_token)
        self.assert_token_is_created(response)

    def test_create_token_without_login(self):
        invalid_email = self.random_generator.generate_email()
        invalid_login_token = self.random_generator.generate_string(40,41) 
        response = Utils.create_auth_token(
            self.client, invalid_email, invalid_login_token)
        self.assert_token_is_not_found(response)

    def test_login_token_expiration(self):
        (email, login_token) = Utils.submit_an_email(self.client)
        next_15_min = timezone.now() + timezone.timedelta(minutes=16)
        freezer = freeze_time(next_15_min)
        freezer.start()
        response = Utils.create_auth_token(self.client, email, login_token)
        freezer.stop()
        self.assert_token_is_expired(response)

    def test_login_token_with_invalid_token(self):
        (email, login_token) = Utils.submit_an_email(self.client)
        invalid_login_token = self.random_generator.generate_string(40,41) 
        response = Utils.create_auth_token(
            self.client, email, invalid_login_token)
        self.assert_login_token_is_invalid(response)
