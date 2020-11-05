import io

from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.test import force_authenticate
from rest_framework.parsers import JSONParser

from django.urls import reverse

from hamcrest import assert_that
from hamcrest import equal_to

from utils.test.random_generator import RandomGenerator

class TestStream(APITestCase):
    
    def setUp(self):
        self.random_generator = RandomGenerator()
        admin_user = self.random_generator.generate_admin_user()
        self.client.force_authenticate(user=admin_user)
        self.random_title = self.random_generator.generate_string(2, 20)
        self.random_description = self.random_generator.generate_string(2, 50)
        self.random_stream_url = 'https://youtu.be/FnYNEnD-05U'

    def test_create_stream(self):
        url = reverse('stream-list')
        data = {
            'title' : self.random_title,
            'description': self.random_description,
            'stream_url' : self.random_stream_url,
            }
        response = self.client.post(url, data, format='json')
        assert_that(response.status_code, equal_to(status.HTTP_201_CREATED))
        json_response = JSONParser().parse(io.BytesIO(response.content))
        assert_that(json_response['title'], equal_to(self.random_title))
        assert_that(json_response['description'], 
            equal_to(self.random_description))
        assert_that(json_response['stream_url'], 
            equal_to(self.random_stream_url))

