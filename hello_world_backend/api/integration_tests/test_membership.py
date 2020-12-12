import os

from rest_framework.test import APITestCase

from hamcrest import assert_that
from hamcrest import is_in
from hamcrest import not_

from api.integration_tests.utils import Utils as TestsUtils
from api.integration_tests.membership_equal_to import MembershipEqualTo
from api.integration_tests.english_class_members_equal_to import \
    EnglishClassMembersEqualTo
from api.integration_tests.memberships_equal_to import MembershipsEqualTo
from api.integration_tests.english_classes_capacity_is_decreased import \
    EnglishClassCapacityIsDecreased

class TestMembership(APITestCase):

    def setUp(self):
        self.temp_images=[]

    def tearDown(self):
        for image in self.temp_images:
            path = os.path.join('photos', image)
            if os.path.exists(path): 
                os.remove(path)

    def generate_random_membership_data(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        (res, english_classes) = TestsUtils.generate_random_english_classes(
            self.client, self.temp_images, number=1)

        data = {
            'profile_info': profile_info['url'],
            'english_class' : english_classes[0]['url']
        }

        return (token, english_classes[0], data)

    def generate_random_memberships(self, number=1):
        tokens=[]
        data_list = []
        for i in range(number):
            (token, english_class, data) =\
                self.generate_random_membership_data()
            data_list.append(data)
            tokens.append(token)
            (membership_res, admin_user) = TestsUtils.create_res(
                self.client, TestsUtils.get_membership_list_url(),
                data=data, token=token)

            TestsUtils.assert_is_created(membership_res)
            assert_that(membership_res.json(), MembershipEqualTo(data))
        return (tokens, data_list)

    def generate_random_memberships_and_choose_one(self, number=1):
        (tokens, data_list) = self.generate_random_memberships(number)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_membership_list_url(), 
            authenticate_with_admin=True)
        return (tokens[0], response.json()['results'][0])

    def update_membership_with_random_data(self, membership_json):
        (res, english_classes) = TestsUtils.generate_random_english_classes(
            self.client, self.temp_images, number=1)
        membership_json['english_class'] = english_classes[0]['url']
        return membership_json
        
    def test_creating_membership_without_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.create_res(
                self.client, TestsUtils.get_membership_list_url(),data={})
        TestsUtils.assert_is_unauthorized(response)

    def test_creating_membership_with_auth_must_not_be_failed(self):
        (token, english_class, data) =\
            self.generate_random_membership_data()

        (membership_res, admin_user) = TestsUtils.create_res(
            self.client, TestsUtils.get_membership_list_url(),
            data=data, token=token)
        TestsUtils.assert_is_created(membership_res)
        assert_that(membership_res.json(), MembershipEqualTo(data))

        (english_class_response, admin_user) = TestsUtils.retrieve_res(
            self.client, english_class['url'])
        assert_that([english_class_response.json()], 
            EnglishClassMembersEqualTo([membership_res.json()]))
        assert_that(english_class_response.json(), 
           EnglishClassCapacityIsDecreased(english_class))

    def test_retrieving_membership_list_without_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_membership_list_url())
        TestsUtils.assert_is_unauthorized(response)

    def test_retrieving_membership_list_with_auth_must_not_be_failed(self):
        (tokens, data_list) = self.generate_random_memberships(number=3)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_membership_list_url(), token=tokens[0])
        TestsUtils.assert_is_ok(response)
        assert_that([data_list[0]], MembershipsEqualTo(response))

    def test_retrieving_membership_list_with_admin_auth_must_not_be_failed(
        self):
        (tokens, data_list) = self.generate_random_memberships(number=5)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_membership_list_url(), 
            authenticate_with_admin=True)
        TestsUtils.assert_is_ok(response)
        assert_that(data_list, MembershipsEqualTo(response))

    def test_patching_membership_without_auth_must_be_failed(self):
        (token, membership) = self.generate_random_memberships_and_choose_one(
            number=5)
        response = TestsUtils.patch_res(
            self.client, membership['url'], {})
        TestsUtils.assert_is_unauthorized(response)

    def test_patching_membership_with_owner_auth_must_not_be_failed(self):
        (token, membership) =\
            self.generate_random_memberships_and_choose_one(number=5)
        updated_json = self.update_membership_with_random_data(
            membership)
        response = TestsUtils.patch_res(
            self.client,
            url=updated_json['url'], 
            data=updated_json, 
            token=token)
        TestsUtils.assert_is_ok(response)
        assert_that(response.json(), MembershipEqualTo(updated_json))

    def test_patching_membership_without_owner_auth_must_be_failed(self):
        (token, membership) =\
            self.generate_random_memberships_and_choose_one(number=5)
        updated_json = self.update_membership_with_random_data(
            membership)
        (token2, membership) =\
            self.generate_random_memberships_and_choose_one(number=1)
        response = TestsUtils.patch_res(
            self.client,
            url=updated_json['url'], 
            data=updated_json, 
            token=token2)
        TestsUtils.assert_is_not_found(response)

    def test_patching_membership_with_admin_auth_must_not_be_failed(self):
        (token, membership) =\
            self.generate_random_memberships_and_choose_one(number=5)
        updated_json = self.update_membership_with_random_data(
            membership)
        response = TestsUtils.patch_res(
            self.client,
            url=updated_json['url'], 
            data=updated_json, 
            authenticate_with_admin=True)
        TestsUtils.assert_is_ok(response)
        assert_that(response.json(), MembershipEqualTo(updated_json))

    def test_deleting_membership_witout_auth_must_be_failed(self):
        (token, membership) =\
            self.generate_random_memberships_and_choose_one(number=5)
        response = TestsUtils.delete_res(
            self.client, membership['url'])
        TestsUtils.assert_is_unauthorized(response)

    def test_deleting_membership_with_admin_auth_must_not_be_failed(self):
        (token, membership) =\
            self.generate_random_memberships_and_choose_one(number=5)
        response = TestsUtils.delete_res(
            self.client,
           url=membership['url'], 
           authenticate_with_admin=True)
        TestsUtils.assert_is_deleted(response)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_membership_list_url(), token=token)
        memberships = response.json()['results']
        assert_that(membership, not_(is_in(memberships)))

    def test_deleting_membership_with_owner_auth_must_not_be_failed(self):
        (token, membership) =\
            self.generate_random_memberships_and_choose_one(number=5)
        response = TestsUtils.delete_res(
            self.client,
           url=membership['url'], 
           token=token)
        TestsUtils.assert_is_deleted(response)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_membership_list_url(), token=token)
        memberships = response.json()['results']
        assert_that(membership, not_(is_in(memberships)))

    def test_deleting_membership_without_owner_auth_must_be_failed(self):
        (token, membership) =\
            self.generate_random_memberships_and_choose_one(number=5)
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        response = TestsUtils.delete_res(
            self.client,
           url=membership['url'], 
           token=token)
        TestsUtils.assert_is_not_found(response)

