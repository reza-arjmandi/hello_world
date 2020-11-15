from random_generator import RandomGenerator
from http_client import HTTPClient

class AuthGenerator:

    def get_email_url():
        return "/auth/email/"

    def get_token_url():
        return "/auth/token/"

    def create_email_data():
        random_generator = RandomGenerator() 
        return {
            'email': random_generator.generate_email()
        }

    def submit_an_email():
        url = AuthGenerator.get_email_url()
        data = AuthGenerator.create_email_data()
        HTTPClient.post(url, data)
        login_token = input("Enter login token: ")
        return (data['email'], login_token)

    def create_auth_token(email, login_token):
        url = AuthGenerator.get_token_url()
        data = {
            'email': email,
            'token': login_token
        }
        response = HTTPClient.post(url, data)
        return response.json()

    def create_random_users_credentials():
        (email, login_token) = AuthGenerator.submit_an_email()
        result = AuthGenerator.create_auth_token(email, login_token)
        return email, result['token']
        