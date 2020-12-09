import os

from rest_framework.test import APITestCase

from hamcrest import assert_that

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

    def test_creating_membership_without_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.create_res(
                self.client, TestsUtils.get_membership_list_url(),data={})
        TestsUtils.assert_is_unauthorized(response)

    def test_creating_membership_with_auth_must_not_be_failed(self):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        (res, english_classes) = TestsUtils.generate_random_english_classes(
            self.client, self.temp_images, number=1)

        data = {
            'profile_info': profile_info['url'],
            'english_class' : english_classes[0]['url']
        }

        (membership_res, admin_user) = TestsUtils.create_res(
            self.client, TestsUtils.get_membership_list_url(),
            data=data, token=token)
        TestsUtils.assert_is_created(membership_res)
        assert_that(membership_res.json(), MembershipEqualTo(data))

        (english_class_response, admin_user) = TestsUtils.retrieve_res(
            self.client, english_classes[0]['url'])
        assert_that([english_class_response.json()], 
            EnglishClassMembersEqualTo([membership_res.json()]))
        assert_that(english_class_response.json(), 
           EnglishClassCapacityIsDecreased(english_classes[0]))

    def test_retrieving_membership_list_without_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_membership_list_url())
        TestsUtils.assert_is_unauthorized(response)

    def test_retrieving_membership_list_with_auth_must_not_be_failed(self):
        (token, profile_info_1) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        (res, english_classes) = TestsUtils.generate_random_english_classes(
            self.client, self.temp_images, number=1)

        data_1 = {
            'profile_info': profile_info_1['url'],
            'english_class' : english_classes[0]['url']
        }

        (membership_res, admin_user) = TestsUtils.create_res(
            self.client, TestsUtils.get_membership_list_url(),
            data=data_1, token=token)

        TestsUtils.assert_is_created(membership_res)
        assert_that(membership_res.json(), MembershipEqualTo(data_1))


        #2
        (token, profile_info_2) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        (res, english_classes) = TestsUtils.generate_random_english_classes(
            self.client, self.temp_images, number=1)

        data_2 = {
            'profile_info': profile_info_2['url'],
            'english_class' : english_classes[0]['url']
        }

        (membership_res, admin_user) = TestsUtils.create_res(
            self.client, TestsUtils.get_membership_list_url(),
            data=data_2, token=token)

        TestsUtils.assert_is_created(membership_res)
        assert_that(membership_res.json(), MembershipEqualTo(data_2))

        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, TestsUtils.get_membership_list_url(), token=token)

        TestsUtils.assert_is_ok(response)

        assert_that([data_2], MembershipsEqualTo(response))



