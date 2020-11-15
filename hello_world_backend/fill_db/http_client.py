import requests
import json

from django.core.serializers.json import DjangoJSONEncoder
from requests_toolbelt import MultipartEncoder

class HTTPClient:

    api_address="127.0.0.1"
    port=8000
    base_url=f'http://{api_address}:{port}'

    def post(url, data_dict, token=None, format='application/json'):
        data, format = HTTPClient.__encode_data__(format, data_dict)
        headers = HTTPClient.__make_headers__(format, token)
        response = requests.post(
            f'{HTTPClient.base_url}{url}', data=data, headers=headers)
        print(f"Status: {response.status_code} and reason: {response.reason}")
        return response
    
    def get(url, token=None, format='application/json'):
        headers = HTTPClient.__make_headers__(format, token)
        response = requests.get(f'{HTTPClient.base_url}{url}', headers=headers)
        print(f"Status: {response.status_code} and reason: {response.reason}")
        return response

    def patch(url, data_dict, token=None, format='application/json'):
        data, format = HTTPClient.__encode_data__(format, data_dict)
        headers = HTTPClient.__make_headers__(format, token)
        response = requests.patch(url, data=data, headers=headers)
        print(f"Status: {response.status_code} and reason: {response.reason}")
        return response

    def __encode_data__(format, data_dict):
        data=None
        if format=='application/json':
            data = json.dumps(data_dict, cls=DjangoJSONEncoder)
        if format=='multipart/form-data':
            data = MultipartEncoder(fields=data_dict)
            format = data.content_type
        return (data, format)

    def __make_headers__(format, token):
        headers = {'Content-type': format}
        if token:
            headers['Authorization'] = f'token {token}'
        return headers