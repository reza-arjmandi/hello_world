import random

from rest_framework.test import APITestCase

from django.urls import reverse

from hamcrest import assert_that
from hamcrest import equal_to

from utils.test.random_generator import RandomGenerator
from api.integration_tests.utils import Utils as TestsUtils

class TestProfileInfo(APITestCase):
    
    def setUp(self):
        self.random_generator = RandomGenerator()

    def create_profile_info(self, data):
        url = TestsUtils.get_profile_info_list_url()
        response = self.client.post(url, data, format='json')
        return response

    def patch_profile_info_list(self, data, token=None):
        TestsUtils.clear_client_auth_h(self.client)
        self.client.logout()
        if token:
            TestsUtils.set_client_auth_h(self.client, token)
        url = TestsUtils.get_profile_info_list_url()
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
        del profile_info_json['classes']
        return profile_info_json

    def assert_profile_info(self, response, expected_profile_info):
        TestsUtils.assert_is_ok(response)
        json = response.json()
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
            TestsUtils.create_random_users_credentials(
                self.client, 1)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_profile_info_list_url(),
            token=credentials[0])
        TestsUtils.assert_profile_infos_owners(response, 1, emails)
        return (credentials[0], 
            response.json()['results'][0])

    def test_creating_profile_info_without_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.create_res(
            self.client, TestsUtils.get_profile_info_list_url(), {})
        TestsUtils.assert_is_unauthorized(response)

    def test_creating_profile_info_with_auth_must_be_failed(self):
        (email_list, credentials) = \
            TestsUtils.create_random_users_credentials(
                self.client, 1)
        (response, admin_user) = TestsUtils.create_res(
                self.client, TestsUtils.get_profile_info_list_url(),
            data={}, token=credentials[0])
        TestsUtils.assert_method_is_not_allowed(response)

    def test_creating_profile_info_with_admin_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.create_res(
                self.client, TestsUtils.get_profile_info_list_url(),
            data={}, authenticate_with_admin=True)
        TestsUtils.assert_method_is_not_allowed(response)

    def test_retrieving_profile_info_list_without_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_profile_info_list_url())
        TestsUtils.assert_is_unauthorized(response)

    def test_retrieving_profile_info_list_with_auth(self):
        (emails, credentials) = \
            TestsUtils.create_random_users_credentials(
                self.client, 1)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_profile_info_list_url(),
            token=credentials[0])
        TestsUtils.assert_profile_infos_owners(response, 1, emails)

    def test_retrieving_profile_info_list_with_admin_auth(self):
        (email_list, creds) = \
            TestsUtils.create_random_users_credentials(self.client)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_profile_info_list_url(),
            authenticate_with_admin=True)
        TestsUtils.assert_profile_infos_owners(
            response, len(email_list), email_list)
    
    def test_patching_profile_info_without_auth_must_be_failed(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        response = TestsUtils.patch_res(self.client,
            url=profile_info['url'], data=profile_info)
        TestsUtils.assert_is_unauthorized(response)

    def test_patching_profile_info_with_auth(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        updated_profile_info = \
            self.update_profile_info_with_random_data(profile_info)
        response = TestsUtils.patch_res(self.client,
            url=profile_info['url'], data=updated_profile_info, token=token)
        self.assert_profile_info(response, updated_profile_info)

    def test_patching_profile_info_with_admin_auth(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        updated_profile_info = \
            self.update_profile_info_with_random_data(profile_info)
        response = TestsUtils.patch_res(self.client,
            url=profile_info['url'], 
            data=updated_profile_info, authenticate_with_admin=True)
        self.assert_profile_info(response, updated_profile_info)

    def test_deleting_profile_info_witout_auth_must_be_failed(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        response = TestsUtils.delete_res(
            self.client,
            url=profile_info['url'], token=token)
        TestsUtils.assert_method_is_not_allowed(response)

    def test_deleting_profile_info_with_auth(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        response = TestsUtils.delete_res(
            self.client,
            url=profile_info['url'], token=token)
        TestsUtils.assert_method_is_not_allowed(response)

    def test_deleting_profile_info_with_admin_auth(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        response = TestsUtils.delete_res(
            self.client,
            url=profile_info['url'], authenticate_with_admin=True)
        TestsUtils.assert_method_is_not_allowed(response)
    