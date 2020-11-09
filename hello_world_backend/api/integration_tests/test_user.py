import random

from rest_framework.test import APITestCase

from django.urls import reverse

from hamcrest import assert_that
from hamcrest import equal_to
from hamcrest import contains_inanyorder

from api.integration_tests.utils import Utils as IntegrationTestsUtils
from utils.test.utils import Utils

class TestUser(APITestCase):

    def get_user_list_url(sel):
        return reverse('user-list') 

    def assert_users(self, response, email_list):
        IntegrationTestsUtils.assert_is_ok(response)
        json = Utils.to_json(response.content)
        assert_that(json['count'], equal_to(len(email_list)))
        usernames = [ element['username'] for element in json['results']]
        assert_that(usernames, contains_inanyorder(*email_list))

    def generate_some_users_and_choose_one(self):
        (email_list, creds) = \
            IntegrationTestsUtils.create_random_users_credentials(self.client, 
            random.randint(2,6))
        (response, admin_user) = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_user_list_url(),
            authenticate_with_admin=True)
        json = Utils.to_json(response.content)
        return json['results'][0]
        
    def test_creating_user_without_auth_must_be_failed(self):
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_user_list_url(),data={})
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_creating_user_with_auth_must_be_failed(self):
        (email_list, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_user_list_url(),
            data={}, token=credentials[0]['json_content']['token'])
        IntegrationTestsUtils.assert_method_is_not_allowed(response)

    def test_creating_user_with_admin_auth_must_be_failed(self):
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_user_list_url(),
            data={}, authenticate_with_admin=True)
        IntegrationTestsUtils.assert_method_is_not_allowed(response)

    def test_retrieving_user_list_witout_auth_must_be_failed(self):
        (response, admin_user) = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_user_list_url())
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_retrieving_user_list_with_auth(self):
        (emails, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        (response, admin_user) = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_user_list_url(),
            token=credentials[0]['json_content']['token'])
        self.assert_users(response, emails)

    def test_retrieving_user_list_with_admin_auth(self):
        (email_list, creds) = \
            IntegrationTestsUtils.create_random_users_credentials(self.client, 
            random.randint(2,6))
        (response, admin_user) = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_user_list_url(),
            authenticate_with_admin=True)
        email_list.append(admin_user.username)
        self.assert_users(
            response, email_list)

    def test_deleting_user_witout_auth_must_be_failed(self):
        selected_user = self.generate_some_users_and_choose_one()
        response = IntegrationTestsUtils.delete_res(
            self.client, selected_user['url'])
        IntegrationTestsUtils.assert_is_unauthorized(response)
    
    def test_deleting_user_with_auth_must_be_failed(self):
        selected_user = self.generate_some_users_and_choose_one()
        (email_list, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        response = IntegrationTestsUtils.delete_res(
            self.client,
            url=selected_user['url'], 
            token=credentials[0]['json_content']['token'])
        IntegrationTestsUtils.assert_method_is_not_allowed(response)

    def test_deleting_user_with_admin_auth_must_be_failed(self):
        selected_user = self.generate_some_users_and_choose_one()
        response = IntegrationTestsUtils.delete_res(
            self.client,
           url=selected_user['url'], 
           authenticate_with_admin=True)
        IntegrationTestsUtils.assert_method_is_not_allowed(response)

    def test_patching_user_with_auth_must_be_failed(self):
        selected_user = self.generate_some_users_and_choose_one()
        (email_list, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        response = IntegrationTestsUtils.patch_res(
            self.client,
            url=selected_user['url'], 
            data={}, 
            token=credentials[0]['json_content']['token'])
        IntegrationTestsUtils.assert_method_is_not_allowed(response)

    def test_patching_user_witout_auth_must_be_failed(self):
        selected_user = self.generate_some_users_and_choose_one()
        response = IntegrationTestsUtils.patch_res(
            self.client, selected_user['url'], {})
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_patching_user_with_admin_auth_must_be_failed(self):
        selected_user = self.generate_some_users_and_choose_one()
        response = IntegrationTestsUtils.patch_res(
            self.client,
           url=selected_user['url'], 
           data={}, 
           authenticate_with_admin=True)
        IntegrationTestsUtils.assert_method_is_not_allowed(response)
        