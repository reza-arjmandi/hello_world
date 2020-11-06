from rest_framework.test import APITestCase

from passwordless_auth.integration_tests.utils import Utils

class TestEmailLogin(APITestCase):

    def test_first_time_create_new_login_token(self):
        url = Utils.get_email_url()
        data = Utils.create_email_data()
        response = self.client.post(url, data, format='json')
        Utils.assert_login_token_is_created(response)
        Utils.assert_email_box(1)

    def test_second_time_create_new_login_token(self):
        url = Utils.get_email_url()
        data = Utils.create_email_data()
        response = self.client.post(url, data, format='json')
        Utils.assert_login_token_is_created(response)
        Utils.assert_email_box(1)

        response = self.client.post(url, data, format='json')
        Utils.assert_login_token_is_created(response)
        Utils.assert_email_box(2)

        

        

