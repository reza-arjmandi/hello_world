import random

from rest_framework.test import APITestCase
from rest_framework import status

from django.urls import reverse

from hamcrest import assert_that
from hamcrest import equal_to
from hamcrest import is_in
from hamcrest import not_
from hamcrest import contains_inanyorder
from hamcrest.core.base_matcher import BaseMatcher

from utils.test.random_generator import RandomGenerator
from api.integration_tests.utils import Utils as IntegrationTestsUtils
from utils.test.utils import Utils

class stream_matcher(BaseMatcher):

    def __init__(self, expected):
        self.expected = expected

    def _matches(self, item):
        return \
            self.expected['title'] == item['title']\
            and self.expected['description'] == item['description']\
            and self.expected['stream_url'] == item['stream_url']

    def describe_to(self, description):
        pass

class TestStream(APITestCase):
    
    def setUp(self):
        self.random_generator = RandomGenerator()
        # admin_user = self.random_generator.generate_admin_user()
        # self.client.force_authenticate(user=admin_user)
        # self.random_title = self.random_generator.generate_string(2, 20)
        # self.random_description = self.random_generator.generate_string(2, 50)
        # self.random_stream_url = 'https://youtu.be/FnYNEnD-05U'

    def get_stream_list_url(sel):
        return reverse('stream-list') 

    # def test_create_stream(self):
    #     url = self.get_stream_list_url()
    #     data = {
    #         'title' : self.random_title,
    #         'description': self.random_description,
    #         'stream_url' : self.random_stream_url,
    #         }
    #     response = self.client.post(url, data, format='json')
    #     assert_that(response.status_code, equal_to(status.HTTP_201_CREATED))
    #     json_response = JSONParser().parse(io.BytesIO(response.content))
    #     assert_that(json_response['title'], equal_to(self.random_title))
    #     assert_that(json_response['description'], 
    #         equal_to(self.random_description))
    #     assert_that(json_response['stream_url'], 
    #         equal_to(self.random_stream_url))

    def assert_stream(self, response, expected_data):
        json = Utils.to_json(response.content)
        assert_that(json['title'], equal_to(expected_data['title']))
        assert_that(json['description'], 
            equal_to(expected_data['description']))
        assert_that(json['stream_url'], equal_to(expected_data['stream_url']))

    def generate_random_stream_data(self):
        random_title = \
            IntegrationTestsUtils.random_generator.generate_string(2, 20)
        random_description = \
            IntegrationTestsUtils.random_generator.generate_string(10, 100)
        random_stream_url = \
            IntegrationTestsUtils.random_generator.generate_url()
        data = {
            'title': random_title,
            'description' : random_description,
            'stream_url' : random_stream_url,
            }
        return data

    def update_stream_with_random_data(self, stream_json):
        stream_json['title'] = self.random_generator.generate_string(2, 20)
        stream_json['description'] = self.random_generator.generate_string(
            10, 100)
        stream_json['stream_url'] = self.random_generator.generate_url()
        return stream_json

    def generate_random_sterams(self, number=random.randint(2,6)):
        result = []
        for i in range(number):
            data= self.generate_random_stream_data()
            IntegrationTestsUtils.create_res(
                self.client, self.get_stream_list_url(),
                data=data, authenticate_with_admin=True)
            result.append(data)
        return result

    def generate_some_streams_and_choose_one(self):
        self.generate_random_sterams()
        response = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_stream_list_url())
        return Utils.to_json(response.content)['results'][0]

    def assert_streams(self, response, expected_data):
        json = Utils.to_json(response.content)
        assert_that(json['count'], equal_to(len(expected_data)))
        matchers = [stream_matcher(data) for data in expected_data]
        assert_that(json['results'], contains_inanyorder(*matchers))

    def test_creating_stream_without_auth_must_be_failed(self):
        data = self.generate_random_stream_data()
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_stream_list_url(),data=data)
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_creating_stream_with_auth_must_be_failed(self):
        (email_list, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        data = self.generate_random_stream_data()
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_stream_list_url(),
            data=data, token=credentials[0]['json_content']['token'])
        IntegrationTestsUtils.assert_is_forbidden(response)

    def test_creating_stream_with_admin_auth(self):
        data = self.generate_random_stream_data()
        (response, admin_user) = IntegrationTestsUtils.create_res(
                self.client, self.get_stream_list_url(),
            data=data, authenticate_with_admin=True)
        IntegrationTestsUtils.assert_is_created(response)
        self.assert_stream(response, data)

    def test_retrieving_stream_list_witout_auth_must_not_be_failed(self):
        expected = self.generate_random_sterams()
        response = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_stream_list_url())
        IntegrationTestsUtils.assert_is_ok(response)
        self.assert_streams(response, expected)

    def test_patching_stream_witout_auth_must_be_failed(self):
        selected_stream = self.generate_some_streams_and_choose_one()
        response = IntegrationTestsUtils.patch_res(
            self.client,
            selected_stream['url'], 
            {})
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_patching_stream_with_auth_must_be_failed(self):
        selected_stream = self.generate_some_streams_and_choose_one()
        (email_list, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        response = IntegrationTestsUtils.patch_res(
            self.client,
            url=selected_stream['url'], 
            data={}, 
            token=credentials[0]['json_content']['token'])
        IntegrationTestsUtils.assert_is_forbidden(response)

    def test_patching_stream_with_admin_auth_must_not_be_failed(self):
        selected_stream = self.generate_some_streams_and_choose_one()
        updated_json = self.update_stream_with_random_data(selected_stream)
        response = IntegrationTestsUtils.patch_res(
            self.client,
           url=selected_stream['url'], 
           data=updated_json, 
           authenticate_with_admin=True)
        IntegrationTestsUtils.assert_is_ok(response)
        self.assert_stream(response, updated_json)

    def test_deleting_stream_witout_auth_must_be_failed(self):
        selected_steram = self.generate_some_streams_and_choose_one()
        response = IntegrationTestsUtils.delete_res(
            self.client, selected_steram['url'])
        IntegrationTestsUtils.assert_is_unauthorized(response)

    def test_deleting_stream_with_auth_must_be_failed(self):
        selected_steram = self.generate_some_streams_and_choose_one()
        (email_list, credentials) = \
            IntegrationTestsUtils.create_random_users_credentials(
                self.client, 1)
        response = IntegrationTestsUtils.delete_res(
            self.client,
            url=selected_steram['url'], 
            token=credentials[0]['json_content']['token'])
        IntegrationTestsUtils.assert_is_forbidden(response)

    def test_deleting_stream_with_admin_auth_must_not_be_failed(self):
        selected_stream = self.generate_some_streams_and_choose_one()
        response = IntegrationTestsUtils.delete_res(
            self.client,
           url=selected_stream['url'], 
           authenticate_with_admin=True)
        assert_that(response.status_code, equal_to(status.HTTP_204_NO_CONTENT))
        response = IntegrationTestsUtils.retrieve_res(
            self.client, self.get_stream_list_url())
        posts = Utils.to_json(response.content)['results']
        assert_that(selected_stream, not_(is_in(posts)))
