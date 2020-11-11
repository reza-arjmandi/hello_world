import os
import random

from rest_framework.test import APITestCase

from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse

from hamcrest import assert_that
from hamcrest import equal_to
from hamcrest import is_in
from hamcrest import not_

from api.integration_tests.utils import Utils as TestsUtils
from api.integration_tests.blog_post_equal_to import BlogPostEqualTo
from api.integration_tests.blog_posts_equal_to import BlogPostsEqualTo

class TestBlogPost(APITestCase):

    def setUp(self):
        self.temp_images=[]

    def tearDown(self):
        for image in self.temp_images:
            path = os.path.join('photos', image)
            if os.path.exists(path): 
                os.remove(path)

    def get_blog_post_list_url(self):
        return reverse('blogpost-list') 

    def generate_random_blog_post_data(self):
        img_path = \
            f'{TestsUtils.random_generator.generate_string(2, 10)}.jpg'
        self.temp_images.append(img_path)
        img_content = open(os.path.join('photos', '0.jpg'), 'rb').read()
        return {
            'title': TestsUtils.random_generator.generate_string(2, 20),
            'image' : SimpleUploadedFile(name=img_path,content=img_content),
            'snippet' : TestsUtils.random_generator.generate_string(2, 10),
            'content': TestsUtils.random_generator.generate_string(10, 100)
            }

    def generate_random_blog_posts(self, number=random.randint(2,6)):
        result = {}
        for i in range(number):
            data= self.generate_random_blog_post_data()
            (response, admin_user) = TestsUtils.create_res(
                self.client, self.get_blog_post_list_url(),
                data=data, authenticate_with_admin=True)
            result[admin_user.username] = data
        return result
        
    def update_blog_post_with_random_data(self, blog_post_json):
        blog_post_json['title'] = \
            TestsUtils.random_generator.generate_string(2, 20)
        blog_post_json['snippet'] = \
            TestsUtils.random_generator.generate_string(2, 10)
        blog_post_json['content'] = \
            TestsUtils.random_generator.generate_string(10, 100)
        del blog_post_json['image']
        return blog_post_json

    def generate_some_posts_and_choose_one(self):
        self.generate_random_blog_posts()
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_blog_post_list_url())
        return response.json()['results'][0]

    def test_creating_blog_post_without_auth_must_be_failed(self):
        data= self.generate_random_blog_post_data()
        (response, admin_user) = TestsUtils.create_res(
            self.client, self.get_blog_post_list_url(), data=data)
        TestsUtils.assert_is_unauthorized(response)

    def test_creating_blog_post_with_auth_must_be_failed(self):
        (email_list, credentials) = TestsUtils.create_random_users_credentials(
                self.client, 1)
        data = self.generate_random_blog_post_data()
        (response, admin_user) = TestsUtils.create_res(
            self.client, self.get_blog_post_list_url(), 
            data=data, token=credentials[0])
        TestsUtils.assert_is_forbidden(response)

    def test_creating_blog_post_with_admin_auth(self):
        data = self.generate_random_blog_post_data()
        (response, admin_user) = TestsUtils.create_res(
            self.client, self.get_blog_post_list_url(),
            data=data, authenticate_with_admin=True)
        TestsUtils.assert_is_created(response)
        assert_that({admin_user.username : data}, 
            BlogPostEqualTo(response.json(), self.client))

    def test_retrieving_blog_post_list_witout_auth_must_not_be_failed(self):
        expected = self.generate_random_blog_posts()
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_blog_post_list_url())
        TestsUtils.assert_is_ok(response)
        assert_that(expected, BlogPostsEqualTo(response, self.client))

    def test_patching_blog_post_witout_auth_must_be_failed(self):
        selected_post = self.generate_some_posts_and_choose_one()
        response = TestsUtils.patch_res(
            self.client, selected_post['url'], {})
        TestsUtils.assert_is_unauthorized(response)

    def test_patching_blog_post_with_auth_must_be_failed(self):
        selected_post = self.generate_some_posts_and_choose_one()
        (email_list, credentials) = \
            TestsUtils.create_random_users_credentials(
                self.client, 1)
        response = TestsUtils.patch_res(
            self.client,
            url=selected_post['url'], 
            data={}, 
            token=credentials[0])
        TestsUtils.assert_is_forbidden(response)

    def test_patching_blog_post_with_admin_auth_must_not_be_failed(self):
        selected_post = self.generate_some_posts_and_choose_one()
        updated_json = self.update_blog_post_with_random_data(selected_post)
        response = TestsUtils.patch_res(
            self.client,
           url=selected_post['url'], 
           data=updated_json, 
           authenticate_with_admin=True)
        TestsUtils.assert_is_ok(response)
        assert_that({selected_post['owner']:updated_json}, 
            BlogPostEqualTo(response.json(), self.client))

    def test_deleting_blog_post_witout_auth_must_be_failed(self):
        selected_post = self.generate_some_posts_and_choose_one()
        response = TestsUtils.delete_res(
            self.client, selected_post['url'])
        TestsUtils.assert_is_unauthorized(response)

    def test_deleting_blog_post_with_auth_must_be_failed(self):
        selected_post = self.generate_some_posts_and_choose_one()
        (email_list, credentials) = \
            TestsUtils.create_random_users_credentials(
                self.client, 1)
        response = TestsUtils.delete_res(
            self.client,
            url=selected_post['url'], 
            token=credentials[0])
        TestsUtils.assert_is_forbidden(response)

    def test_deleting_blog_post_with_admin_auth_must_not_be_failed(self):
        selected_post = self.generate_some_posts_and_choose_one()
        response = TestsUtils.delete_res(
            self.client,
           url=selected_post['url'], 
           authenticate_with_admin=True)
        TestsUtils.assert_is_deleted(response)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_blog_post_list_url())
        posts = response.json()['results']
        assert_that(selected_post, not_(is_in(posts)))
