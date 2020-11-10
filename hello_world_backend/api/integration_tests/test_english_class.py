import random

from rest_framework.test import APITestCase
from rest_framework import status

from django.urls import reverse
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_naive

from hamcrest import assert_that
from hamcrest import equal_to
from hamcrest import contains_inanyorder
from hamcrest import is_in
from hamcrest import not_

from hamcrest.core.base_matcher import BaseMatcher

from api.integration_tests.utils import Utils as IntegrationTestsUtils
from utils.test.random_generator import RandomGenerator
from utils.test.utils import Utils

class english_class_matcher(BaseMatcher):

    def __init__(self, expected):
        self.expected = expected

    def _matches(self, item):
        return \
            self.expected['title'] == item['title']\
            and self.expected['description'] == item['description']\
            and self.expected['capacity'] == item['capacity']\
            and self.expected['skype_link'] == item['skype_link']\
            and self.expected['date_time'] == \
                make_naive(parse_datetime(item['date_time']))

    def describe_to(self, description):
        pass

class TestEnglishClass(APITestCase):

    def setUp(self):
        self.random_generator = RandomGenerator()

    def get_english_class_list_url(sel):
        return reverse('englishclass-list')

    def get_profile_info_list_url(self):
        return reverse('profileinfo-list')

    def update_profile_info_user_type(self, profile_info_json, user_type):
        profile_info_json['user_type'] = user_type
        profile_info_json['is_completed'] = True
        del profile_info_json['skype_link']
        del profile_info_json['timezone']
        del profile_info_json['avatar']
        del profile_info_json['classes']
        return profile_info_json
    
    def assert_profile_infos_owners(self, response, numbers, email_list):
        IntegrationTestsUtils.assert_is_ok(response)
        json = Utils.to_json(response.content)
        assert_that(json['count'], equal_to(numbers))
        ownsers = [ element['owner'] for element in json['results']]
        assert_that(ownsers, contains_inanyorder(*email_list))

    def retrieve_a_random_profile_info(self):
        (emails, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        (response, admin_user) = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_profile_info_list_url(),
            token=credentials[0])
        self.assert_profile_infos_owners(response, 1, emails)
        return (credentials[0], 
            Utils.to_json(response.content)['results'][0])

    def assert_english_class(self, response, expected_data):
        json = Utils.to_json(response.content)
        assert_that(json['title'], equal_to(expected_data['title']))
        assert_that( make_naive(parse_datetime(json['date_time'])), 
            equal_to(expected_data['date_time']))
        assert_that(json['skype_link'], equal_to(expected_data['skype_link']))
        assert_that(json['capacity'], equal_to(expected_data['capacity']))
        assert_that(json['description'], 
            equal_to(expected_data['description']))

    def assert_english_classes(self, response, expected_data):
        json = Utils.to_json(response.content)
        assert_that(json['count'], equal_to(len(expected_data)))
        matchers = [english_class_matcher(data) for data in expected_data]
        assert_that(json['results'], contains_inanyorder(*matchers))

    def generate_random_english_class_data(self):
        random_title = self.random_generator.generate_string(2, 20)
        random_datetime = self.random_generator.generate_date_time(2, 10)
        random_skype_link = self.random_generator.generate_string(10, 20)
        random_capacity = random.randint(2, 5)
        random_description = self.random_generator.generate_string(10, 100)
        data = {
            'title': random_title,
            'date_time' : random_datetime,
            'skype_link' : random_skype_link,
            'capacity': random_capacity,
            'description': random_description,
            }
        return data

    def generate_random_english_classes(self, number=random.randint(2,6)):
        result = []
        for i in range(number):
            data= self.generate_random_english_class_data()
            (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_english_class_list_url(),
                data=data, authenticate_with_admin=True)
            result.append(data)
        return result

    def generate_some_english_classes_and_choose_one(self):
        self.generate_random_english_classes()
        (response, admin_user) = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_english_class_list_url())
        return Utils.to_json(response.content)['results'][0]

    def update_english_class_with_random_data(self, english_class_json):
        english_class_json['title'] = \
            self.random_generator.generate_string(2, 20)
        english_class_json['date_time'] = \
            self.random_generator.generate_date_time()
        english_class_json['skype_link'] = \
            self.random_generator.generate_string(10, 20)
        english_class_json['capacity'] = random.randint(2,10)
        english_class_json['description'] = \
            self.random_generator.generate_string(10, 100)
        return english_class_json

    def test_creating_english_class_without_auth_must_be_failed(self):
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_english_class_list_url(),data={})
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_creating_english_class_with_learner_auth_must_be_failed(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        self.update_profile_info_user_type(profile_info, 'learner')
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_english_class_list_url(),
            data={}, token=token)
        IntegrationTestsUtils.assert_is_forbidden(response)

    def test_creating_english_class_with_teacher_auth_must_not_be_failed(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        updated_profile_info = self.update_profile_info_user_type(
            profile_info, 'teacher')
        response = IntegrationTestsUtils.patch_res(self.client,
            url=profile_info['url'], data=updated_profile_info, token=token)
        data = self.generate_random_english_class_data()
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_english_class_list_url(),
            data=data, token=token)
        IntegrationTestsUtils.assert_is_created(response)
        self.assert_english_class(response, data)

    def test_retrieving_english_class_list_witout_auth_must_not_be_failed(
        self):
        expected = self.generate_random_english_classes()
        (response, admin_user) = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_english_class_list_url())
        IntegrationTestsUtils.assert_is_ok(response)
        self.assert_english_classes(response, expected)

    def test_patching_english_class_witout_auth_must_be_failed(self):
        selected_class = self.generate_some_english_classes_and_choose_one()
        response = IntegrationTestsUtils.patch_res(
            self.client, selected_class['url'], {})
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_patching_english_class_with_auth_must_not_be_failed(self):
        data= self.generate_random_english_class_data()
        (token, profile_info) = self.retrieve_a_random_profile_info()
        updated_profile_info = self.update_profile_info_user_type(
            profile_info, 'teacher')
        IntegrationTestsUtils.patch_res(self.client,
            url=profile_info['url'], data=updated_profile_info, token=token)
        (response, admin_user) = IntegrationTestsUtils.create_res(
            self.client, self.get_english_class_list_url(),
            data=data, token=token)
        updated_json = self.update_english_class_with_random_data(data)
        json = Utils.to_json(response.content)
        response = IntegrationTestsUtils.patch_res(
            self.client,
            url=json['url'], 
            data=updated_json, 
            token=token)
        IntegrationTestsUtils.assert_is_ok(response)
        self.assert_english_class(response, updated_json)

    def test_patching_english_class_with_admin_auth_must_not_be_failed(self):
        selected_english_class = \
            self.generate_some_english_classes_and_choose_one()
        updated_json = self.update_english_class_with_random_data(
            selected_english_class)
        del updated_json['image']
        response = IntegrationTestsUtils.patch_res(
            self.client,
            url=selected_english_class['url'], 
            data=updated_json, 
            authenticate_with_admin=True)
        IntegrationTestsUtils.assert_is_ok(response)
        self.assert_english_class(response, updated_json)

    def test_deleting_english_class_witout_auth_must_be_failed(self):
        selected_english_class = \
            self.generate_some_english_classes_and_choose_one()
        response = IntegrationTestsUtils.delete_res(
            self.client, selected_english_class['url'])
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_deleting_english_class_with_auth_must_be_failed(self):
        data= self.generate_random_english_class_data()
        (token, profile_info) = self.retrieve_a_random_profile_info()
        updated_profile_info = self.update_profile_info_user_type(
            profile_info, 'teacher')
        IntegrationTestsUtils.patch_res(self.client,
            url=profile_info['url'], data=updated_profile_info, token=token)
        (response, admin_user) = IntegrationTestsUtils.create_res(
            self.client, self.get_english_class_list_url(),
            data=data, token=token)
        json = Utils.to_json(response.content)
        response = IntegrationTestsUtils.delete_res(
            self.client,
            url=json['url'], 
            token=token)
        assert_that(response.status_code, equal_to(status.HTTP_204_NO_CONTENT))

    def test_deleting_english_class_with_admin_auth_must_not_be_failed(self):
        selected_english_class =\
            self.generate_some_english_classes_and_choose_one()
        response = IntegrationTestsUtils.delete_res(
            self.client,
           url=selected_english_class['url'], 
           authenticate_with_admin=True)
        assert_that(response.status_code, equal_to(status.HTTP_204_NO_CONTENT))
        (response, admin_user) = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_english_class_list_url())
        posts = Utils.to_json(response.content)['results']
        assert_that(selected_english_class, not_(is_in(posts)))
