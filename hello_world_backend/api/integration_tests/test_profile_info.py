import random

from rest_framework.test import APITestCase

from django.urls import reverse

from hamcrest import assert_that
from hamcrest import contains_inanyorder
from hamcrest import equal_to

from utils.test.random_generator import RandomGenerator
from utils.test.utils import Utils
from api.integration_tests.utils import Utils as IntegrationTestsUtils

class TestProfileInfo(APITestCase):
    
    def setUp(self):
        self.random_generator = RandomGenerator()

    def get_profile_info_list_url(self):
        return reverse('profileinfo-list')

    def assert_profile_infos_owners(self, response, numbers, email_list):
        IntegrationTestsUtils.assert_is_ok(response)
        json = Utils.to_json(response.content)
        assert_that(json['count'], equal_to(numbers))
        ownsers = [ element['owner'] for element in json['results']]
        assert_that(ownsers, contains_inanyorder(*email_list))

    def create_profile_info(self, data):
        url = self.get_profile_info_list_url()
        response = self.client.post(url, data, format='json')
        return response

    def patch_profile_info_list(self, data, token=None):
        IntegrationTestsUtils.clear_client_auth_h(self.client)
        self.client.logout()
        if token:
            IntegrationTestsUtils.set_client_auth_h(self.client, token)
        url = self.get_profile_info_list_url()
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
        IntegrationTestsUtils.assert_is_ok(response)
        json = Utils.to_json(response.content)
        assert_that(json['user_type'], 
            equal_to(expected_profile_info['user_type']))
        assert_that(json['timezone'], 
            equal_to(expected_profile_info['timezone']))
        assert_that(json['skype_link'], 
            equal_to(expected_profile_info['skype_link']))
        assert_that(json['is_completed'], 
            equal_to(expected_profile_info['is_completed']))

    def retrieve_a_random_profile_info(self):
        (emails, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        response = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_profile_info_list_url(),
            token=credentials[0]['json_content']['token'])
        self.assert_profile_infos_owners(response, 1, emails)
        return (credentials[0]['json_content']['token'], 
            Utils.to_json(response.content)['results'][0])

    def test_creating_profile_info_without_auth_must_be_failed(self):
        (response, admin_user) = IntegrationTestsUtils.create_res(
            self.client, self.get_profile_info_list_url(), {})
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_creating_profile_info_with_auth_must_be_failed(self):
        (email_list, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_profile_info_list_url(),
            data={}, token=credentials[0]['json_content']['token'])
        IntegrationTestsUtils.assert_method_is_not_allowed(response)

    def test_creating_profile_info_with_admin_auth_must_be_failed(self):
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_profile_info_list_url(),
            data={}, authenticate_with_admin=True)
        IntegrationTestsUtils.assert_method_is_not_allowed(response)

    def test_retrieving_profile_info_list_without_auth_must_be_failed(self):
        response = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_profile_info_list_url())
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_retrieving_profile_info_list_with_auth(self):
        (emails, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        response = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_profile_info_list_url(),
            token=credentials[0]['json_content']['token'])
        self.assert_profile_infos_owners(response, 1, emails)

    def test_retrieving_profile_info_list_with_admin_auth(self):
        (email_list, creds) = \
            IntegrationTestsUtils.create_random_users_credentials(self.client)
        response = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_profile_info_list_url(),
            authenticate_with_admin=True)
        self.assert_profile_infos_owners(
            response, len(email_list), email_list)
    
    def test_patching_profile_info_without_auth_must_be_failed(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        response = IntegrationTestsUtils.patch_res(self.client,
            url=profile_info['url'], data=profile_info)
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_patching_profile_info_with_auth(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        updated_profile_info = \
            self.update_profile_info_with_random_data(profile_info)
        response = IntegrationTestsUtils.patch_res(self.client,
            url=profile_info['url'], data=updated_profile_info, token=token)
        self.assert_profile_info(response, updated_profile_info)

    def test_patching_profile_info_with_admin_auth(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        updated_profile_info = \
            self.update_profile_info_with_random_data(profile_info)
        response = IntegrationTestsUtils.patch_res(self.client,
            url=profile_info['url'], 
            data=updated_profile_info, authenticate_with_admin=True)
        self.assert_profile_info(response, updated_profile_info)

    def test_deleting_profile_info_witout_auth_must_be_failed(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        response = IntegrationTestsUtils.delete_res(
            self.client,
            url=profile_info['url'], token=token)
        IntegrationTestsUtils.assert_method_is_not_allowed(response)

    def test_deleting_profile_info_with_auth(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        response = IntegrationTestsUtils.delete_res(
            self.client,
            url=profile_info['url'], token=token)
        IntegrationTestsUtils.assert_method_is_not_allowed(response)

    def test_deleting_profile_info_with_admin_auth(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        response = IntegrationTestsUtils.delete_res(
            self.client,
            url=profile_info['url'], authenticate_with_admin=True)
        IntegrationTestsUtils.assert_method_is_not_allowed(response)
    