import random

from rest_framework.test import APITestCase

from django.urls import reverse

from hamcrest import assert_that
from hamcrest import is_in
from hamcrest import not_

from api.integration_tests.utils import Utils as TestsUtils
from api.integration_tests.stream_equal_to import StreamEqualTo
from api.integration_tests.streams_equal_to import StreamsEqualTo

class TestStream(APITestCase):
    
    def get_stream_list_url(sel):
        return reverse('stream-list') 

    def generate_random_stream_data(self):
        return {
            'title': TestsUtils.random_generator.generate_string(2, 20),
            'description' : \
                TestsUtils.random_generator.generate_string(10, 100),
            'stream_url' : TestsUtils.random_generator.generate_url(),
            }

    def update_stream_with_random_data(self, stream_json):
        stream_json['title'] = \
            TestsUtils.random_generator.generate_string(2, 20)
        stream_json['description'] = \
            TestsUtils.random_generator.generate_string(10, 100)
        stream_json['stream_url'] = TestsUtils.random_generator.generate_url()
        return stream_json

    def generate_random_sterams(self, number=random.randint(2,6)):
        result = []
        for i in range(number):
            data= self.generate_random_stream_data()
            TestsUtils.create_res(
                self.client, self.get_stream_list_url(),
                data=data, authenticate_with_admin=True)
            result.append(data)
        return result

    def generate_some_streams_and_choose_one(self):
        self.generate_random_sterams()
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_stream_list_url())
        return response.json()['results'][0]

    def test_creating_stream_without_auth_must_be_failed(self):
        data = self.generate_random_stream_data()
        (response, admin_user) = TestsUtils.create_res(
                self.client, self.get_stream_list_url(),data=data)
        TestsUtils.assert_is_unauthorized(response)

    def test_creating_stream_with_auth_must_be_failed(self):
        (email_list, credentials) = \
            TestsUtils.create_random_users_credentials(self.client, 1)
        data = self.generate_random_stream_data()
        (response, admin_user) = TestsUtils.create_res(
            self.client, self.get_stream_list_url(),
            data=data, token=credentials[0])
        TestsUtils.assert_is_forbidden(response)

    def test_creating_stream_with_admin_auth(self):
        data = self.generate_random_stream_data()
        (response, admin_user) = TestsUtils.create_res(
                self.client, self.get_stream_list_url(),
            data=data, authenticate_with_admin=True)
        TestsUtils.assert_is_created(response)
        assert_that(data, StreamEqualTo(response.json()))

    def test_retrieving_stream_list_witout_auth_must_not_be_failed(self):
        expected = self.generate_random_sterams()
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_stream_list_url())
        TestsUtils.assert_is_ok(response)
        assert_that(expected, StreamsEqualTo(response))

    def test_patching_stream_witout_auth_must_be_failed(self):
        selected_stream = self.generate_some_streams_and_choose_one()
        response = TestsUtils.patch_res(
            self.client,selected_stream['url'],{})
        TestsUtils.assert_is_unauthorized(response)

    def test_patching_stream_with_auth_must_be_failed(self):
        selected_stream = self.generate_some_streams_and_choose_one()
        (email_list, credentials) = \
            TestsUtils.create_random_users_credentials(self.client, 1)
        response = TestsUtils.patch_res(
            self.client, url=selected_stream['url'], data={}, 
            token=credentials[0])
        TestsUtils.assert_is_forbidden(response)

    def test_patching_stream_with_admin_auth_must_not_be_failed(self):
        selected_stream = self.generate_some_streams_and_choose_one()
        updated_json = self.update_stream_with_random_data(selected_stream)
        response = TestsUtils.patch_res(
            self.client, url=selected_stream['url'], 
            data=updated_json, authenticate_with_admin=True)
        TestsUtils.assert_is_ok(response)
        assert_that(updated_json, StreamEqualTo(response.json()))

    def test_deleting_stream_witout_auth_must_be_failed(self):
        selected_steram = self.generate_some_streams_and_choose_one()
        response = TestsUtils.delete_res(self.client, selected_steram['url'])
        TestsUtils.assert_is_unauthorized(response)

    def test_deleting_stream_with_auth_must_be_failed(self):
        selected_steram = self.generate_some_streams_and_choose_one()
        (email_list, credentials) = \
            TestsUtils.create_random_users_credentials(self.client, 1)
        response = TestsUtils.delete_res(
            self.client, url=selected_steram['url'], token=credentials[0])
        TestsUtils.assert_is_forbidden(response)

    def test_deleting_stream_with_admin_auth_must_not_be_failed(self):
        selected_stream = self.generate_some_streams_and_choose_one()
        response = TestsUtils.delete_res(
            self.client, url=selected_stream['url'], 
            authenticate_with_admin=True)
        TestsUtils.assert_is_deleted(response)
        (response, admin_user) = TestsUtils.retrieve_res(
            self.client, self.get_stream_list_url())
        posts = response.json()['results']
        assert_that(selected_stream, not_(is_in(posts)))
