import io
import re

from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.parsers import JSONParser

from django.urls import reverse
from django.core import mail 
from django.utils import timezone

from hamcrest import equal_to
from hamcrest import assert_that

from freezegun import freeze_time

from passwordless_auth.test.utils import Utils
from utils.test.random_generator import RandomGenerator

class TestToken(APITestCase):

    def setUp(self):
        self.json_parser = JSONParser()
        self.random_generator = RandomGenerator()
    
    def get_token_url(self):
        url = reverse('token')
        return url
    
    def get_login_token_from_mailbox(self):
        result = re.findall('\d{6}', mail.outbox[0].body) 
        return result[0]
    
    def submit_an_email(self):
        url = Utils.get_email_url()
        data = Utils.create_email_data()
        response = self.client.post(url, data, format='json')
        Utils.assert_login_token_is_created(response)
        Utils.assert_email_box(1)
        return (data['email'], self.get_login_token_from_mailbox())

    def assert_token_is_created(self, response):
        assert_that(response.status_code, equal_to(status.HTTP_201_CREATED))
        json_response = self.json_parser.parse(io.BytesIO(response.content))
        assert_that(len(json_response['token']), equal_to(40))

    def assert_token_is_not_found(self, response):
        assert_that(response.status_code, equal_to(status.HTTP_404_NOT_FOUND))
        json_response = self.json_parser.parse(io.BytesIO(response.content))
        assert_that(json_response['detail'], 
            equal_to('Login token does not exist.'))

    def assert_token_is_expired(self, response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_408_REQUEST_TIMEOUT))
        json_response = self.json_parser.parse(io.BytesIO(response.content))
        assert_that(json_response['detail'], equal_to('The token is expired.'))

    def assert_login_token_is_invalid(self, response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_400_BAD_REQUEST))
        json_response = self.json_parser.parse(io.BytesIO(response.content))
        assert_that(json_response['detail'], 
            equal_to('Login token is not valid.'))

    def test_create_token(self):
        (email, login_token) = self.submit_an_email()
        url = self.get_token_url()
        data = {
            'email': email,
            'token': login_token
        }
        response = self.client.post(url, data, format='json')
        self.assert_token_is_created(response)

    def test_create_token_without_login(self):
        url = self.get_token_url()
        data = {
            'email': self.random_generator.generate_email(),
            'token': self.random_generator.generate_string(40,41)
        }
        response = self.client.post(url, data, format='json')
        self.assert_token_is_not_found(response)

    def test_login_token_expiration(self):
        (email, login_token) = self.submit_an_email()
        url = self.get_token_url()
        data = {
            'email': email,
            'token': login_token
        }
        next_15_min = timezone.now() + timezone.timedelta(minutes=16)
        freezer = freeze_time(next_15_min)
        freezer.start()
        response = self.client.post(url, data, format='json')
        freezer.stop()
        self.assert_token_is_expired(response)

    def test_login_token_with_invalid_token(self):
        (email, login_token) = self.submit_an_email()
        url = self.get_token_url()
        data = {
            'email': email,
            'token': self.random_generator.generate_string(40,41)
        }
        response = self.client.post(url, data, format='json')
        self.assert_login_token_is_invalid(response)
