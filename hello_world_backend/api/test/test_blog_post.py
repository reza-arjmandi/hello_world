import os
import io

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from rest_framework.parsers import JSONParser

from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse

from hamcrest import assert_that
from hamcrest import equal_to

from api.serializers import UserSerializer
from api.test.random_generator import RandomGenerator

class TestBlogPost(APITestCase):

    def setUp(self):
        self.random_generator = RandomGenerator()
        user = self.random_generator.generate_user()
        context = {'request': APIRequestFactory().get('/')}
        user_serializer = UserSerializer(user, context=context)
        self.random_owner = user_serializer.data['url']
        self.image_path = self.random_generator.generate_string(2, 10) + '.jpg'
        self.image = SimpleUploadedFile(
            name=self.image_path, 
            content=open(os.path.join('photos', '0.jpg'), 'rb').read())
        self.random_title = self.random_generator.generate_string(2, 20)
        self.random_snippet = self.random_generator.generate_string(2, 10)
        self.random_content = self.random_generator.generate_string(10, 100)

    def tearDown(self):
        os.remove(os.path.join('photos', self.image_path))

    def test_create_blog_post(self):
        url = reverse('blogpost-list')
        data = {
            'owner' : self.random_owner,
            'title': self.random_title,
            'image' : self.image,
            'snippet' : self.random_snippet,
            'content': self.random_content
            }
        response = self.client.post(url, data, format='multipart')

        assert_that(response.status_code, equal_to(status.HTTP_201_CREATED))
        json_response = JSONParser().parse(io.BytesIO(response.content))
        assert_that(json_response['title'], equal_to(self.random_title))
        assert_that(json_response['snippet'], equal_to(self.random_snippet))
        assert_that(json_response['content'], equal_to(self.random_content))

        