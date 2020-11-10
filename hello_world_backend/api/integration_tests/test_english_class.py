import random
import os

from rest_framework.test import APITestCase
from rest_framework import status

from django.urls import reverse
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_naive
from django.core.files.uploadedfile import SimpleUploadedFile
from django.http import FileResponse

from hamcrest import assert_that
from hamcrest import equal_to
from hamcrest import contains_inanyorder
from hamcrest import is_in
from hamcrest import not_

from hamcrest.core.base_matcher import BaseMatcher

from api.integration_tests.utils import Utils as TestsUtils

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
        self.temp_images=[]

    def tearDown(self):
        for image in self.temp_images:
            path = os.path.join('photos', image)
            if os.path.exists(path): 
                os.remove(path)

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
        TestsUtils.assert_is_ok(response)
        json = response.json()
        assert_that(json['count'], equal_to(numbers))
        ownsers = [ element['owner'] for element in json['results']]
        assert_that(ownsers, contains_inanyorder(*email_list))

    def retrieve_a_random_profile_info(self):
        (emails, credentials) = \
            TestsUtils.create_random_users_credentials(
                self.client, 1)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_profile_info_list_url(),
            token=credentials[0])
        self.assert_profile_infos_owners(response, 1, emails)
        return (credentials[0], 
            response.json()['results'][0])

    def assert_english_class(self, response, expected_data):
        json = response.json()
        assert_that(json['title'], equal_to(expected_data['title']))
        assert_that( make_naive(parse_datetime(json['date_time'])), 
            equal_to(expected_data['date_time']))
        assert_that(json['skype_link'], equal_to(expected_data['skype_link']))
        assert_that(json['capacity'], equal_to(expected_data['capacity']))
        assert_that(json['description'], 
            equal_to(expected_data['description']))

    def assert_english_classes(self, response, expected_data):
        json = response.json()
        assert_that(json['count'], equal_to(len(expected_data)))
        matchers = [english_class_matcher(data) for data in expected_data]
        assert_that(json['results'], contains_inanyorder(*matchers))

    def generate_random_english_class_data(self):
        img_path = \
            f'{TestsUtils.random_generator.generate_string(2, 10)}.jpg'
        self.temp_images.append(img_path)
        img_content = open(os.path.join('photos', '0.jpg'), 'rb').read()
        return  {
            'title': TestsUtils.random_generator.generate_string(2, 20),
            'date_time' : TestsUtils.random_generator.generate_date_time(),
            'skype_link' : TestsUtils.random_generator.generate_string(10, 20),
            'image' : SimpleUploadedFile(name=img_path, content=img_content),
            'capacity': random.randint(2, 5),
            'description': \
                TestsUtils.random_generator.generate_string(10, 100),
            }

    def generate_random_english_classes(self, number=random.randint(2,6)):
        result = []
        for i in range(number):
            data= self.generate_random_english_class_data()
            (response, admin_user) = TestsUtils.create_res(
                self.client, self.get_english_class_list_url(),
                data=data, authenticate_with_admin=True)
            result.append(data)
        return result

    def generate_some_english_classes_and_choose_one(self):
        self.generate_random_english_classes()
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_english_class_list_url())
        return response.json()['results'][0]

    def update_english_class_with_random_data(self, english_class_json):
        english_class_json['title'] = \
            TestsUtils.random_generator.generate_string(2, 20)
        english_class_json['date_time'] = \
            TestsUtils.random_generator.generate_date_time()
        english_class_json['skype_link'] = \
            TestsUtils.random_generator.generate_string(10, 20)
        english_class_json['capacity'] = random.randint(2,10)
        english_class_json['description'] = \
            TestsUtils.random_generator.generate_string(10, 100)
        if 'image' in english_class_json:
            del english_class_json['image']
        return english_class_json

    def test_creating_english_class_without_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.create_res(
                self.client, self.get_english_class_list_url(),data={})
        TestsUtils.assert_is_unauthorized(response)

    def test_creating_english_class_with_learner_auth_must_be_failed(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        self.update_profile_info_user_type(profile_info, 'learner')
        (response, admin_user) = TestsUtils.create_res(
                self.client, self.get_english_class_list_url(),
            data={}, token=token)
        TestsUtils.assert_is_forbidden(response)

    def test_creating_english_class_with_teacher_auth_must_not_be_failed(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        updated_profile_info = self.update_profile_info_user_type(
            profile_info, 'teacher')
        response = TestsUtils.patch_res(self.client,
            url=profile_info['url'], data=updated_profile_info, token=token)
        data = self.generate_random_english_class_data()
        (response, admin_user) = TestsUtils.create_res(
                self.client, self.get_english_class_list_url(),
            data=data, token=token)
        TestsUtils.assert_is_created(response)
        self.assert_english_class(response, data)

    def test_retrieving_english_class_list_witout_auth_must_not_be_failed(
        self):
        expected = self.generate_random_english_classes()
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_english_class_list_url())
        TestsUtils.assert_is_ok(response)
        self.assert_english_classes(response, expected)

    def test_patching_english_class_witout_auth_must_be_failed(self):
        selected_class = self.generate_some_english_classes_and_choose_one()
        response = TestsUtils.patch_res(
            self.client, selected_class['url'], {})
        TestsUtils.assert_is_unauthorized(response)

    def test_patching_english_class_with_auth_must_not_be_failed(self):
        (token, profile_info) = self.retrieve_a_random_profile_info()
        updated_profile_info = self.update_profile_info_user_type(
            profile_info, 'teacher')
        TestsUtils.patch_res(self.client,
            url=profile_info['url'], data=updated_profile_info, token=token)

        data= self.generate_random_english_class_data()
        (response, admin_user) = TestsUtils.create_res(
            self.client, self.get_english_class_list_url(),
            data=data, token=token)
        updated_json = self.update_english_class_with_random_data(
            response.json())

        json = response.json()
        response = TestsUtils.patch_res(
            self.client,
            url=updated_json['url'], 
            data=updated_json, 
            token=token)
        TestsUtils.assert_is_ok(response)
        self.assert_english_class(response, updated_json)

    def test_patching_english_class_with_admin_auth_must_not_be_failed(self):
        selected_english_class = \
            self.generate_some_english_classes_and_choose_one()
        updated_json = self.update_english_class_with_random_data(
            selected_english_class)
        response = TestsUtils.patch_res(
            self.client,
            url=selected_english_class['url'], 
            data=updated_json, 
            authenticate_with_admin=True)
        TestsUtils.assert_is_ok(response)
        self.assert_english_class(response, updated_json)

    def test_deleting_english_class_witout_auth_must_be_failed(self):
        selected_english_class = \
            self.generate_some_english_classes_and_choose_one()
        response = TestsUtils.delete_res(
            self.client, selected_english_class['url'])
        TestsUtils.assert_is_unauthorized(response)

    def test_deleting_english_class_with_auth_must_be_failed(self):
        data= self.generate_random_english_class_data()
        (token, profile_info) = self.retrieve_a_random_profile_info()
        updated_profile_info = self.update_profile_info_user_type(
            profile_info, 'teacher')
        TestsUtils.patch_res(self.client,
            url=profile_info['url'], data=updated_profile_info, token=token)
        (response, admin_user) = TestsUtils.create_res(
            self.client, self.get_english_class_list_url(),
            data=data, token=token)
        json = response.json()
        response = TestsUtils.delete_res(
            self.client,
            url=json['url'], 
            token=token)
        assert_that(response.status_code, equal_to(status.HTTP_204_NO_CONTENT))

    def test_deleting_english_class_with_admin_auth_must_not_be_failed(self):
        selected_english_class =\
            self.generate_some_english_classes_and_choose_one()
        response = TestsUtils.delete_res(
            self.client,
           url=selected_english_class['url'], 
           authenticate_with_admin=True)
        assert_that(response.status_code, equal_to(status.HTTP_204_NO_CONTENT))
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_english_class_list_url())
        posts = response.json()['results']
        assert_that(selected_english_class, not_(is_in(posts)))
