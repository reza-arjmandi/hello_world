import io

from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from rest_framework.parsers import JSONParser
from rest_framework import status

from django.urls import reverse

from hamcrest import assert_that
from hamcrest import equal_to

from api.serializers import UserSerializer
from api.test.random_generator import RandomGenerator

class TestProfileInfo(APITestCase):
    
    def setUp(self):
        self.random_generator = RandomGenerator()
        user = self.random_generator.generate_user()
        self.client.force_authenticate(user=user)
        context = {'request': APIRequestFactory().get('/')}
        user_serializer = UserSerializer(user, context=context)
        self.random_owner = user_serializer.data['url']
        self.random_user_type = self.random_generator.generate_string(2, 20)
        self.random_timezone = self.random_generator.generate_string(2, 20)
        self.random_skype_link = 'https://youtu.be/FnYNEnD-05U'
        self.random_is_completed = self.random_generator.generate_bool()

    def test_create_profile_info(self):
        pass
        #url = reverse('profile-list')
        #data = {
        #    'user_type': self.random_user_type,
        #    'timezone' : self.random_timezone,
        #    'skype_link' : self.random_skype_link,
        #    'is_completed' : self.random_is_completed,
        #    }
        #response = self.client.post(url, data, format='json')
        #print(response.content)
        #assert_that(response.status_code, equal_to(status.HTTP_201_CREATED))
        #json_response = JSONParser().parse(io.BytesIO(response.content))
        #assert_that(json_response['owner'], equal_to(self.random_owner))
        #assert_that(json_response['user_type'], 
        #    equal_to(self.random_user_type))
        #assert_that(json_response['timezone'], 
        #    equal_to(self.random_timezone))
        #assert_that(json_response['skype_link'], 
        #    equal_to(self.random_skype_link))
        #assert_that(json_response['is_completed'], 
        #    equal_to(self.random_is_completed))
        