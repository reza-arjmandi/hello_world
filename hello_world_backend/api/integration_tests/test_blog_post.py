import os
import random

from rest_framework.test import APITestCase
from rest_framework import status

from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse

from hamcrest import assert_that
from hamcrest import equal_to
from hamcrest import is_in
from hamcrest import not_

from api.integration_tests.utils import Utils as IntegrationTestsUtils
from utils.test.random_generator import RandomGenerator
from utils.test.utils import Utils

class TestBlogPost(APITestCase):

    def setUp(self):
        self.random_generator = RandomGenerator()
        self.temp_images=[]

    def tearDown(self):
        for image in self.temp_images:
            path = os.path.join('photos', image)
            if os.path.exists(path): 
                os.remove(path)

    def get_blog_post_list_url(self):
        return reverse('blogpost-list') 

    def generate_random_blog_post_data(self):
        random_title = self.random_generator.generate_string(2, 20)
        random_snippet = self.random_generator.generate_string(2, 10)
        random_content = self.random_generator.generate_string(10, 100)
        image_path = self.random_generator.generate_string(2, 10) + '.jpg'
        image = SimpleUploadedFile(
                    name=image_path, 
                    content=open(os.path.join('photos', '0.jpg'), 'rb').read())
        data = {
            'title': random_title,
            'image' : image,
            'snippet' : random_snippet,
            'content': random_content
            }
        self.temp_images.append(image_path)
        return data

    def generate_random_blog_posts(self, number=random.randint(2,6)):
        result = {}
        for i in range(number):
            data= self.generate_random_blog_post_data()
            (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_blog_post_list_url(),
                data=data, authenticate_with_admin=True)
            result[admin_user.username] = data
        return result

    def assert_blog_post(self, response, owner, expected_data):
        json = Utils.to_json(response.content)
        assert_that(json['owner'], equal_to(owner))
        assert_that(json['title'], equal_to(expected_data['title']))
        assert_that(json['snippet'], equal_to(expected_data['snippet']))
        assert_that(json['content'], equal_to(expected_data['content']))

    def assert_blog_posts(self, response, expected_data):
        json = Utils.to_json(response.content)
        assert_that(json['count'], equal_to(len(expected_data)))

        for result in json['results']:
            assert_that(result['owner'], is_in(expected_data))
            expected_elem = expected_data[result['owner']]
            assert_that(result['title'], equal_to(expected_elem['title']))
            assert_that(result['snippet'], equal_to(expected_elem['snippet']))
            assert_that(result['content'], equal_to(expected_elem['content']))

    def update_blog_post_with_random_data(self, blog_post_json):
        blog_post_json['title'] = self.random_generator.generate_string(2, 20)
        blog_post_json['snippet'] = self.random_generator.generate_string(
            2, 10)
        blog_post_json['content'] = \
            self.random_generator.generate_string(10, 100)
        del blog_post_json['image']
        return blog_post_json

    def generate_some_posts_and_choose_one(self):
        self.generate_random_blog_posts()
        (response, admin_user) = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_blog_post_list_url())
        return Utils.to_json(response.content)['results'][0]

    def test_creating_blog_post_without_auth_must_be_failed(self):
        data= self.generate_random_blog_post_data()
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_blog_post_list_url(), data=data)
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_creating_blog_post_with_auth_must_be_failed(self):
        (email_list, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        data = self.generate_random_blog_post_data()
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_blog_post_list_url(),
            data=data, token=credentials[0]['json_content']['token'])
        IntegrationTestsUtils.assert_is_forbidden(response)

    def test_creating_blog_post_with_admin_auth(self):
        data = self.generate_random_blog_post_data()
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_blog_post_list_url(),
            data=data, authenticate_with_admin=True)
        IntegrationTestsUtils.assert_is_created(response)
        self.assert_blog_post(response, admin_user.username, data)

    def test_retrieving_blog_post_list_witout_auth_must_not_be_failed(self):
        expected = self.generate_random_blog_posts()
        (response, admin_user) = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_blog_post_list_url())
        IntegrationTestsUtils.assert_is_ok(response)
        self.assert_blog_posts(response, expected)

    def test_patching_blog_post_witout_auth_must_be_failed(self):
        selected_post = self.generate_some_posts_and_choose_one()
        response = IntegrationTestsUtils.patch_res(
            self.client, selected_post['url'], {})
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_patching_blog_post_with_auth_must_be_failed(self):
        selected_post = self.generate_some_posts_and_choose_one()
        (email_list, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        response = IntegrationTestsUtils.patch_res(
            self.client,
            url=selected_post['url'], 
            data={}, 
            token=credentials[0]['json_content']['token'])
        IntegrationTestsUtils.assert_is_forbidden(response)

    def test_patching_blog_post_with_admin_auth_must_not_be_failed(self):
        selected_post = self.generate_some_posts_and_choose_one()
        updated_json = self.update_blog_post_with_random_data(selected_post)
        response = IntegrationTestsUtils.patch_res(
            self.client,
           url=selected_post['url'], 
           data=updated_json, 
           authenticate_with_admin=True)
        IntegrationTestsUtils.assert_is_ok(response)
        self.assert_blog_post(response, selected_post['owner'], updated_json)

    def test_deleting_blog_post_witout_auth_must_be_failed(self):
        selected_post = self.generate_some_posts_and_choose_one()
        response = IntegrationTestsUtils.delete_res(
            self.client, selected_post['url'])
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_deleting_blog_post_with_auth_must_be_failed(self):
        selected_post = self.generate_some_posts_and_choose_one()
        (email_list, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        response = IntegrationTestsUtils.delete_res(
            self.client,
            url=selected_post['url'], 
            token=credentials[0]['json_content']['token'])
        IntegrationTestsUtils.assert_is_forbidden(response)

    def test_deleting_blog_post_with_admin_auth_must_not_be_failed(self):
        selected_post = self.generate_some_posts_and_choose_one()
        response = IntegrationTestsUtils.delete_res(
            self.client,
           url=selected_post['url'], 
           authenticate_with_admin=True)
        assert_that(response.status_code, equal_to(status.HTTP_204_NO_CONTENT))
        (response, admin_user) = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_blog_post_list_url())
        posts = Utils.to_json(response.content)['results']
        assert_that(selected_post, not_(is_in(posts)))
