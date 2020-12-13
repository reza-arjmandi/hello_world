from rest_framework.test import APITestCase

from django.urls import reverse

from hamcrest import assert_that

from api.integration_tests.utils import Utils as TestsUtils
from api.integration_tests.matchers.users_equal_to import UsersEqualTo

class TestUser(APITestCase):

    def get_user_list_url(sel):
        return reverse('user-list') 

    def generate_some_users_and_choose_one(self):
        (email_list, creds) = \
            TestsUtils.create_random_users_credentials(self.client)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_user_list_url(),
            authenticate_with_admin=True)
        json = response.json()
        return json['results'][0]
        
    def test_creating_user_without_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.create_res(
                self.client, self.get_user_list_url(),data={})
        TestsUtils.assert_is_unauthorized(response)

    def test_creating_user_with_auth_must_be_failed(self):
        (email_list, credentials) = \
            TestsUtils.create_random_users_credentials(self.client, 1)
        (response, admin_user) = TestsUtils.create_res(
            self.client, self.get_user_list_url(),
            data={}, token=credentials[0])
        TestsUtils.assert_method_is_not_allowed(response)

    def test_creating_user_with_admin_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.create_res(
            self.client, self.get_user_list_url(),
            data={}, authenticate_with_admin=True)
        TestsUtils.assert_method_is_not_allowed(response)

    def test_retrieving_user_list_witout_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_user_list_url())
        TestsUtils.assert_is_unauthorized(response)

    def test_retrieving_user_list_with_owner_auth(self):
        (emails, credentials) = \
            TestsUtils.create_random_users_credentials(self.client, 1)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_user_list_url(), token=credentials[0])
        TestsUtils.assert_is_ok(response)
        assert_that(emails, UsersEqualTo(response))

    def test_retrieving_user_list_without_owner_auth_must_be_failed(self):
        (emails, credentials) = \
            TestsUtils.create_random_users_credentials(self.client)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_user_list_url(), token=credentials[0])
        TestsUtils.assert_is_ok(response)
        assert_that([emails[0]], UsersEqualTo(response))

    def test_retrieving_user_list_with_admin_auth(self):
        (email_list, creds) = \
            TestsUtils.create_random_users_credentials(self.client)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_user_list_url(),
            authenticate_with_admin=True)
        email_list.append(admin_user.username)
        TestsUtils.assert_is_ok(response)
        assert_that(email_list, UsersEqualTo(response))

    def test_deleting_user_witout_auth_must_be_failed(self):
        selected_user = self.generate_some_users_and_choose_one()
        response = TestsUtils.delete_res(self.client, selected_user['url'])
        TestsUtils.assert_is_unauthorized(response)
    
    def test_deleting_user_with_auth_must_be_failed(self):
        selected_user = self.generate_some_users_and_choose_one()
        (email_list, credentials) = \
            TestsUtils.create_random_users_credentials(self.client, 1)
        response = TestsUtils.delete_res(
            self.client, url=selected_user['url'], token=credentials[0])
        TestsUtils.assert_method_is_not_allowed(response)

    def test_deleting_user_with_admin_auth_must_be_failed(self):
        selected_user = self.generate_some_users_and_choose_one()
        response = TestsUtils.delete_res(
            self.client, url=selected_user['url'], 
           authenticate_with_admin=True)
        TestsUtils.assert_method_is_not_allowed(response)

    def test_patching_user_with_auth_must_be_failed(self):
        selected_user = self.generate_some_users_and_choose_one()
        (email_list, credentials) = \
            TestsUtils.create_random_users_credentials(self.client, 1)
        response = TestsUtils.patch_res(
            self.client, url=selected_user['url'], data={},
            token=credentials[0])
        TestsUtils.assert_method_is_not_allowed(response)

    def test_patching_user_witout_auth_must_be_failed(self):
        selected_user = self.generate_some_users_and_choose_one()
        response = TestsUtils.patch_res(self.client, selected_user['url'], {})
        TestsUtils.assert_is_unauthorized(response)

    def test_patching_user_with_admin_auth_must_be_failed(self):
        selected_user = self.generate_some_users_and_choose_one()
        response = TestsUtils.patch_res(self.client,url=selected_user['url'], 
           data={}, authenticate_with_admin=True)
        TestsUtils.assert_method_is_not_allowed(response)
        