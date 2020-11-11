import random
import os

from rest_framework.test import APITestCase

from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile

from hamcrest import assert_that
from hamcrest import is_in
from hamcrest import not_

from api.integration_tests.utils import Utils as TestsUtils
from api.integration_tests.english_class_equal_to import EnglishClassEqualTo
from api.integration_tests.english_classes_equal_to import \
    EnglishClassesEqualTo

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

    def update_profile_info_user_type(self, profile_info_json, user_type):
        profile_info_json['user_type'] = user_type
        profile_info_json['is_completed'] = True
        del profile_info_json['skype_link']
        del profile_info_json['timezone']
        del profile_info_json['avatar']
        del profile_info_json['classes']
        return profile_info_json
    
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
            TestsUtils.create_res(
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

    def retrieve_a_random_profile_info(self, user_type):
        (token, profile_info) = TestsUtils.retrieve_a_random_profile_info(
            self.client)
        updated_profile_info = self.update_profile_info_user_type(
            profile_info, user_type)
        response = TestsUtils.patch_res(self.client,
            url=profile_info['url'], data=updated_profile_info, token=token)
        return token

    def create_an_english_class_with_a_teacher(self):
        token = self.retrieve_a_random_profile_info('teacher')
        data= self.generate_random_english_class_data()
        (response, admin_user) = TestsUtils.create_res(
            self.client, self.get_english_class_list_url(),
            data=data, token=token)
        return (token, response)

    def test_creating_english_class_without_auth_must_be_failed(self):
        (response, admin_user) = TestsUtils.create_res(
                self.client, self.get_english_class_list_url(),data={})
        TestsUtils.assert_is_unauthorized(response)

    def test_creating_english_class_with_learner_auth_must_be_failed(self):
        token = self.retrieve_a_random_profile_info('learner')
        (response, admin_user) = TestsUtils.create_res(
                self.client, self.get_english_class_list_url(),
            data={}, token=token)
        TestsUtils.assert_is_forbidden(response)

    def test_creating_english_class_with_teacher_auth_must_not_be_failed(self):
        token = self.retrieve_a_random_profile_info('teacher')
        data = self.generate_random_english_class_data()
        (response, admin_user) = TestsUtils.create_res(
            self.client, self.get_english_class_list_url(),
            data=data, token=token)
        TestsUtils.assert_is_created(response)
        assert_that(response.json(), EnglishClassEqualTo(data))

    def test_retrieving_english_class_list_witout_auth_must_not_be_failed(
        self):
        expected = self.generate_random_english_classes()
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_english_class_list_url())
        TestsUtils.assert_is_ok(response)
        assert_that(expected, EnglishClassesEqualTo(response))

    def test_patching_english_class_witout_auth_must_be_failed(self):
        selected_class = self.generate_some_english_classes_and_choose_one()
        response = TestsUtils.patch_res(
            self.client, selected_class['url'], {})
        TestsUtils.assert_is_unauthorized(response)

    def test_patching_english_class_with_owner_auth_must_not_be_failed(self):
        (token, response) = self.create_an_english_class_with_a_teacher()
        updated_json = self.update_english_class_with_random_data(
            response.json())
        response = TestsUtils.patch_res(
            self.client,
            url=updated_json['url'], 
            data=updated_json, 
            token=token)
        TestsUtils.assert_is_ok(response)
        assert_that(response.json(), EnglishClassEqualTo(updated_json))

    def test_patching_english_class_without_owner_auth_must_be_failed(self):
        (token, response) = self.create_an_english_class_with_a_teacher()
        new_token = self.retrieve_a_random_profile_info('teacher')
        updated_json = self.update_english_class_with_random_data(
            response.json())
        response = TestsUtils.patch_res(
            self.client,
            url=updated_json['url'], 
            data=updated_json, 
            token=new_token)
        TestsUtils.assert_is_forbidden(response)

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
        assert_that(response.json(), EnglishClassEqualTo(updated_json))

    def test_deleting_english_class_witout_auth_must_be_failed(self):
        selected_english_class = \
            self.generate_some_english_classes_and_choose_one()
        response = TestsUtils.delete_res(
            self.client, selected_english_class['url'])
        TestsUtils.assert_is_unauthorized(response)

    def test_deleting_english_class_with_owner_auth_must_be_failed(self):
        (token, response) = self.create_an_english_class_with_a_teacher()
        json = response.json()
        response = TestsUtils.delete_res(
            self.client,
            url=json['url'], 
            token=token)
        TestsUtils.assert_is_deleted(response)

    def test_deleting_english_class_without_owner_auth_must_be_failed(self):
        (token, response) = self.create_an_english_class_with_a_teacher()
        new_token = self.retrieve_a_random_profile_info('teacher')
        json = response.json()
        response = TestsUtils.delete_res(
            self.client,
            url=json['url'], 
            token=new_token)
        TestsUtils.assert_is_forbidden(response)

    def test_deleting_english_class_with_admin_auth_must_not_be_failed(self):
        selected_english_class =\
            self.generate_some_english_classes_and_choose_one()
        response = TestsUtils.delete_res(
            self.client,
           url=selected_english_class['url'], 
           authenticate_with_admin=True)
        TestsUtils.assert_is_deleted(response)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_english_class_list_url())
        posts = response.json()['results']
        assert_that(selected_english_class, not_(is_in(posts)))
