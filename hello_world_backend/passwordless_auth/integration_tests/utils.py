import io

from django.core import mail 
from django.urls import reverse

from rest_framework.parsers import JSONParser
from rest_framework import status

from hamcrest import assert_that
from hamcrest import equal_to
from hamcrest import matches_regexp

from utils.test.random_generator import RandomGenerator

class Utils:
    
    def assert_email_box(email_number):
        assert_that(len(mail.outbox), equal_to(email_number))
        for i in range(email_number):
            assert_that(mail.outbox[i].subject, equal_to('Your Login Token'))
            assert_that(mail.outbox[i].from_email, 
                equal_to('HelloWorld@halloenglish.com'))
            assert_that(mail.outbox[i].body, 
                matches_regexp('Use this code to log in: \d{6}'))

    def assert_login_token_is_created(response):
        assert_that(response.status_code, equal_to(status.HTTP_201_CREATED))
        json_parser = JSONParser()
        json_response = json_parser.parse(io.BytesIO(response.content))
        assert_that(json_response['detail'], 
            equal_to('A login token has been sent to your email.'))

    def create_email_data():
        random_generator = RandomGenerator()
        data = {
            'email': random_generator.generate_email()
        }
        return data

    def get_email_url():
        url = reverse('email')
        return url