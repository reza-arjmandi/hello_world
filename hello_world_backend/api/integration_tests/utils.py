import random
import os

from rest_framework import status

from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile

from hamcrest import assert_that
from hamcrest import equal_to
from hamcrest import has_length

from utils.test.random_generator import RandomGenerator
from passwordless_auth.integration_tests.utils import Utils as \
    PasswordlessAuthUtils
from api.integration_tests.matchers.profile_info_owner_equal_to import \
    ProfileInfoOwnerEqualTo
    
class Utils:

    random_generator = RandomGenerator()

    def create_random_users_credentials(
        client, number_of_users=random.randint(2, 6)):
        email_list = []
        credentials = []
        for i in range(number_of_users):
            (email, login_token) = PasswordlessAuthUtils.submit_an_email(
                client)
            result = PasswordlessAuthUtils.create_auth_token(
                client, email, login_token)
            email_list.append(email)
            assert_that(result['response'].status_code, 
            equal_to(status.HTTP_201_CREATED))
            assert_that(result['json_content']['token'], has_length(40))
            credentials.append(result['json_content']['token'])
        return (email_list, credentials)

    def clear_client_auth_h(client):
        client.credentials(HTTP_AUTHORIZATION='')

    def set_client_auth_h(client, token):
        client.credentials(HTTP_AUTHORIZATION='Token ' + token)

    def authenticate_with_a_user(client, is_admin=False):
        user = Utils.random_generator.generate_admin_user() if is_admin \
            else Utils.random_generator.generate_user()
        client.force_authenticate(user=user)
        return user

    def assert_is_unauthorized(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_401_UNAUTHORIZED))

    def assert_is_forbidden(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_403_FORBIDDEN))

    def assert_is_not_found(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_404_NOT_FOUND))

    def assert_is_created(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_201_CREATED))

    def assert_is_ok(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_200_OK))

    def assert_is_bad_request(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_400_BAD_REQUEST))
    
    def assert_is_deleted(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_204_NO_CONTENT))

    def assert_method_is_not_allowed(response):
        assert_that(response.status_code, 
            equal_to(status.HTTP_405_METHOD_NOT_ALLOWED))

    def patch_res(client, url, data, 
        token=None, authenticate_with_admin=False):
        Utils.clear_client_auth_h(client)
        client.logout()
        if token:
            Utils.set_client_auth_h(client, token)
        if authenticate_with_admin:
            Utils.authenticate_with_a_user(
                client, is_admin=True)
        response = client.patch(url, data, format='multipart')
        return response

    def retrieve_res(client, url, token=None, authenticate_with_admin=False):
        Utils.clear_client_auth_h(client)
        client.logout()
        admin_user = None
        if token:
            Utils.set_client_auth_h(client, token)
        if authenticate_with_admin:
            admin_user = Utils.authenticate_with_a_user(
                client, is_admin=True)
        response = client.get(url, format='json')
        return (response, admin_user)

    def create_res(
        client, url, data, token=None, authenticate_with_admin=False):
        Utils.clear_client_auth_h(client)
        client.logout()
        admin_user = None
        if token:
            Utils.set_client_auth_h(client, token)
        if authenticate_with_admin:
            admin_user = Utils.authenticate_with_a_user(
                client, is_admin=True)
        response = client.post(url, data, format='multipart')
        return (response, admin_user)

    def delete_res(client, url, 
        token=None, authenticate_with_admin=False):
        Utils.clear_client_auth_h(client)
        client.logout()
        if token:
            Utils.set_client_auth_h(client, token)
        if authenticate_with_admin:
            Utils.authenticate_with_a_user(
                client, is_admin=True)
        response = client.delete(url, format='json')
        return response

    def get_profile_info_list_url():
        return reverse('profileinfo-list')

    def retrieve_a_random_profile_info(client):
        (emails, credentials) = \
            Utils.create_random_users_credentials(client, 1)
        (response, admin_user) = Utils.retrieve_res(
            client, Utils.get_profile_info_list_url(), token=credentials[0])
        Utils.assert_is_ok(response)
        assert_that(emails, ProfileInfoOwnerEqualTo(response.json()))
        return (credentials[0], response.json()['results'][0])

    def get_english_class_list_url():
        return reverse('englishclass-list')

    def get_membership_list_url():
        return reverse('membership-list')

    def generate_random_english_class_data(
        temp_images, capacity=random.randint(2, 5)):
        img_path = f'{Utils.random_generator.generate_string(2, 10)}.jpg'
        temp_images.append(img_path)
        img_content = open(os.path.join('photos', '0.jpg'), 'rb').read()
        return  {
            'title': Utils.random_generator.generate_string(2, 20),
            'date_time' : Utils.random_generator.generate_date_time(),
            'skype_link' : Utils.random_generator.generate_string(10, 20),
            'image' : SimpleUploadedFile(name=img_path, content=img_content),
            'capacity': capacity,
            'description': Utils.random_generator.generate_string(10, 100),
            }

    def generate_random_english_classes(
        client, temp_images, number=random.randint(2,6), 
        capacity=random.randint(2, 5)):
        result = []
        responses = []
        for i in range(number):
            data = Utils.generate_random_english_class_data(
                temp_images, capacity)
            (response, ad) = Utils.create_res(
                client, Utils.get_english_class_list_url(),
                data=data, authenticate_with_admin=True)
            result.append(data)
            responses.append(response.json())
        return (result, responses)
