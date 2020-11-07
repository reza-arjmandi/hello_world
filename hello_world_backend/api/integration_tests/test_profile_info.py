import io
import random

from rest_framework.test import APITestCase
from rest_framework.parsers import JSONParser
from rest_framework import status

from django.urls import reverse

from hamcrest import assert_that
from hamcrest import contains_inanyorder
from hamcrest import equal_to
from hamcrest import has_length

from api.serializers import UserSerializer
from utils.test.random_generator import RandomGenerator
from passwordless_auth.integration_tests.utils import Utils

class TestProfileInfo(APITestCase):
    
    def setUp(self):
        self.random_generator = RandomGenerator()

    def get_profile_info_list_url(self):
        return reverse('profileinfo-list')

    def to_json(self, str):
        json_parser = JSONParser()
        return json_parser.parse(io.BytesIO(str))

    def assert_is_unauthorized(self, response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_401_UNAUTHORIZED))
    
    def assert_method_is_not_allowed(self, response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_405_METHOD_NOT_ALLOWED))

    def authenticate_with_a_user(self, is_admin=False):
        user = self.random_generator.generate_admin_user() if is_admin \
            else self.random_generator.generate_user()
        self.client.force_authenticate(user=user)

    def assert_ok(self, response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_200_OK))

    def assert_profile_infos_owners(self, response, numbers, email_list):
        self.assert_ok(response)
        json = self.to_json(response.content)
        assert_that(json['count'], equal_to(numbers))
        ownsers = [ element['owner'] for element in json['results']]
        assert_that(ownsers, contains_inanyorder(*email_list))

    def create_random_users_credentials(self, 
        number_of_users=random.randint(2, 6)):
        email_list = []
        credentials = []
        for i in range(number_of_users):
            (email, login_token) = Utils.submit_an_email(self.client)
            result = Utils.create_auth_token(self.client, email, login_token)
            email_list.append(email)
            credentials.append(result)
            assert_that(result['response'].status_code, 
            equal_to(status.HTTP_201_CREATED))
            assert_that(result['json_content']['token'], has_length(40))
        return (email_list, credentials)

    def retrieve_profile_info_list(
        self, token=None, authenticate_with_admin=False):
        self.clear_client_auth_h()
        if token:
            self.set_client_auth_h(token)
        if authenticate_with_admin:
            self.authenticate_with_a_user(is_admin=True)
        url = self.get_profile_info_list_url()
        response = self.client.get(url, format='json')
        return response

    def delete_profile_info_list(self):
        url = self.get_profile_info_list_url()
        response = self.client.delete(url, format='json')
        return response

    def delete_profile_info(
        self, url, token=None, authenticate_with_admin=False):
        self.clear_client_auth_h()
        if token:
            self.set_client_auth_h(token)
        if authenticate_with_admin:
            self.authenticate_with_a_user(is_admin=True)
        response = self.client.delete(url, format='json')
        return response
    
    def create_profile_info(self, data):
        url = self.get_profile_info_list_url()
        response = self.client.post(url, data, format='json')
        return response

    def patch_profile_info_list(self, data, token=None):
        self.clear_client_auth_h()
        if token:
            self.set_client_auth_h(token)
        url = self.get_profile_info_list_url()
        response = self.client.patch(url, data, format='json')
        return response

    def patch_profile_info(
        self, url, data, token=None, authenticate_with_admin=False):
        self.clear_client_auth_h()
        if token:
            self.set_client_auth_h(token)
        if authenticate_with_admin:
            self.authenticate_with_a_user(is_admin=True)
        response = self.client.patch(url, data, format='json')
        return response

    def update_profile_info_with_random_data(self, profile_info_json):
        profile_info_json['user_type'] = \
            random.choice(['learner', 'teacher'])
        profile_info_json['timezone'] = \
            self.random_generator.generate_string(2,10)
        profile_info_json['skype_link'] = \
            self.random_generator.generate_url()
        profile_info_json['is_completed'] = \
            self.random_generator.generate_bool()
        del profile_info_json['avatar']
        return profile_info_json

    def assert_profile_info(self, response, expected_profile_info):
        assert_that(response.status_code, equal_to(status.HTTP_200_OK))
        json = self.to_json(response.content)
        assert_that(json['user_type'], 
            equal_to(expected_profile_info['user_type']))
        assert_that(json['timezone'], 
            equal_to(expected_profile_info['timezone']))
        assert_that(json['skype_link'], 
            equal_to(expected_profile_info['skype_link']))
        assert_that(json['is_completed'], 
            equal_to(expected_profile_info['is_completed']))

    def set_client_auth_h(self, token):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

    def clear_client_auth_h(self):
        self.client.credentials(HTTP_AUTHORIZATION='')

    def retrieve_a_random_profile_info(self):
        (emails, credentials) = self.create_random_users_credentials(1)
        response = self.retrieve_profile_info_list(
            token=credentials[0]['json_content']['token'])
        self.assert_profile_infos_owners(response, 1, emails)
        return (credentials[0]['json_content']['token'], 
            self.to_json(response.content)['results'][0])

    def test_retrieving_profile_info_list_without_auth_must_be_failed(self):
        response = self.retrieve_profile_info_list()
        self.assert_is_unauthorized(response)
        
    def test_creating_profile_info_without_auth_must_be_failed(self):
        response = self.create_profile_info({})
        self.assert_is_unauthorized(response)
    
    def test_deleting_profile_info_list_without_auth_must_be_failed(self):
        response = self.delete_profile_info_list()
        self.assert_is_unauthorized(response)

    def test_patching_profile_list_info_without_auth_must_be_failed(self):
        response = self.patch_profile_info_list({})
        self.assert_is_unauthorized(response)
    
    def test_creating_profile_info_with_auth_must_be_failed(self):
        self.authenticate_with_a_user()
        response = self.create_profile_info({})
        self.assert_method_is_not_allowed(response)

    def test_deleting_profile_info_list_with_auth_must_be_failed(self):
        self.authenticate_with_a_user()
        response = self.delete_profile_info_list()
        self.assert_method_is_not_allowed(response)

    def test_creating_profile_info_with_admin_auth_must_be_failed(self):
        self.authenticate_with_a_user(is_admin=True)
        response = self.create_profile_info({})
        self.assert_method_is_not_allowed(response)

    def test_deleting_profile_info_list_with_auth_must_be_failed(self):
        self.authenticate_with_a_user(is_admin=True)
        response = self.delete_profile_info_list()
        self.assert_method_is_not_allowed(response)

    def test_retrieving_profile_info_list_with_auth(self):
        (emails, credentials) = self.create_random_users_credentials(1)
        response = self.retrieve_profile_info_list(
            token=credentials[0]['json_content']['token'])
        self.assert_profile_infos_owners(response, 1, emails)

    def test_retrieving_profile_info_list_with_admin_auth(self):
        (email_list, creds) = self.create_random_users_credentials()
        response = self.retrieve_profile_info_list(
            authenticate_with_admin=True)
        self.assert_profile_infos_owners(
            response, len(email_list), email_list)

    def test_patching_profile_info_with_auth(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        updated_profile_info = \
            self.update_profile_info_with_random_data(profile_info)
        response = self.patch_profile_info(
            url=profile_info['url'], data=updated_profile_info, token=token)
        self.assert_profile_info(response, updated_profile_info)

    def test_patching_profile_info_without_auth_must_be_failed(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        response = self.patch_profile_info(
            url=profile_info['url'], data=profile_info)
        self.assert_is_unauthorized(response)

    def test_patching_profile_info_with_admin_auth(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        updated_profile_info = \
            self.update_profile_info_with_random_data(profile_info)
        response = self.patch_profile_info(
            url=profile_info['url'], 
            data=updated_profile_info, authenticate_with_admin=True)
        self.assert_profile_info(response, updated_profile_info)

    def test_deleting_profile_info_with_auth(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        response = self.delete_profile_info(
            url=profile_info['url'], token=token)
        self.assert_method_is_not_allowed(response)

    def test_deleting_profile_info_with_admin_auth(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        response = self.delete_profile_info(
            url=profile_info['url'], authenticate_with_admin=True)
        self.assert_method_is_not_allowed(response)
    
