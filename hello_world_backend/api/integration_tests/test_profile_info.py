import random
import os

from rest_framework.test import APITestCase

from hamcrest import assert_that

from utils.test.random_generator import RandomGenerator
from api.integration_tests.utils import Utils as TestsUtils
from api.integration_tests.profile_info_equal_to import ProfileInfoEqualTo
from api.integration_tests.profile_info_owner_equal_to import \
    ProfileInfoOwnerEqualTo
from api.integration_tests.english_classes_capacity_is_decreased import \
    EnglishClassesCapacityIsDecreased

class TestProfileInfo(APITestCase):
    
    def setUp(self):
        self.random_generator = RandomGenerator()
        self.temp_images=[]

    def tearDown(self):
        for image in self.temp_images:
            path = os.path.join('photos', image)
            if os.path.exists(path): 
                os.remove(path)

    def update_profile_info_with_random_data(self, profile_info_json):
        (ex, classes_result) = TestsUtils.generate_random_english_classes(
            self.client, self.temp_images)
        profile_info_json['user_type'] = \
            random.choice(['learner', 'teacher'])
        profile_info_json['timezone'] = \
            self.random_generator.generate_string(2,10)
        profile_info_json['skype_link'] = \
            self.random_generator.generate_url()
        profile_info_json['is_completed'] = \
            self.random_generator.generate_bool()
        profile_info_json['classes'] = [elem['url'] for elem in classes_result]
        del profile_info_json['avatar']
        return (profile_info_json, classes_result)

    def retrieve_and_update_a_profile_info(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        (updated_profile_info, classes_result) = \
            self.update_profile_info_with_random_data(profile_info)
        return (token, updated_profile_info, classes_result)

    def test_creating_profile_info_without_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.create_res(
            self.client, TestsUtils.get_profile_info_list_url(), {})
        TestsUtils.assert_is_unauthorized(response)

    def test_creating_profile_info_with_auth_must_be_failed(self):
        (email_list, credentials) = \
            TestsUtils.create_random_users_credentials(self.client, 1)
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
            TestsUtils.create_random_users_credentials(self.client, 3)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_profile_info_list_url(),
            token=credentials[0])
        TestsUtils.assert_is_ok(response)
        assert_that([emails[0]], ProfileInfoOwnerEqualTo(response.json()))

    def test_retrieving_profile_info_list_with_admin_auth(self):
        (email_list, creds) = \
            TestsUtils.create_random_users_credentials(self.client)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_profile_info_list_url(),
            authenticate_with_admin=True)
        TestsUtils.assert_is_ok(response)
        assert_that(email_list, ProfileInfoOwnerEqualTo(response.json()))
    
    def test_patching_profile_info_without_auth_must_be_failed(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        response = TestsUtils.patch_res(self.client,
            url=profile_info['url'], data=profile_info)
        TestsUtils.assert_is_unauthorized(response)

    def test_patching_profile_info_with_auth(self):
        (token, updated_profile_info, classes_result) =\
            self.retrieve_and_update_a_profile_info() 
        response = TestsUtils.patch_res(self.client,
            url=updated_profile_info['url'], 
            data=updated_profile_info, token=token)
        TestsUtils.assert_is_ok(response)
        assert_that(updated_profile_info, ProfileInfoEqualTo(response.json()))
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_english_class_list_url())
        assert_that(classes_result, 
           EnglishClassesCapacityIsDecreased(response.json()))

    def test_patching_profile_info_with_admin_auth(self):
        (token, updated_profile_info, classes_result) =\
            self.retrieve_and_update_a_profile_info() 
        response = TestsUtils.patch_res(self.client,
            url=updated_profile_info['url'], 
            data=updated_profile_info, authenticate_with_admin=True)
        TestsUtils.assert_is_ok(response)
        assert_that(updated_profile_info, ProfileInfoEqualTo(response.json()))
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_english_class_list_url())
        assert_that(classes_result, 
            EnglishClassesCapacityIsDecreased(response.json()))

    def test_subscribe_in_a_class_with_no_capacity_must_be_failed(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        (ex, classes_result) = TestsUtils.generate_random_english_classes(
            self.client, self.temp_images, capacity=0)
        profile_info['classes'] = [elem['url'] for elem in classes_result]
        del profile_info['avatar']
        response = TestsUtils.patch_res(self.client,
            url=profile_info['url'], 
            data=profile_info, token=token)
        TestsUtils.assert_is_bad_request(response)

    def test_deleting_profile_info_witout_auth_must_be_failed(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        response = TestsUtils.delete_res(
            self.client, url=profile_info['url'], token=token)
        TestsUtils.assert_method_is_not_allowed(response)

    def test_deleting_profile_info_with_auth(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        response = TestsUtils.delete_res(
            self.client, url=profile_info['url'], token=token)
        TestsUtils.assert_method_is_not_allowed(response)

    def test_deleting_profile_info_with_admin_auth(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        response = TestsUtils.delete_res(
            self.client, url=profile_info['url'], authenticate_with_admin=True)
        TestsUtils.assert_method_is_not_allowed(response)
    