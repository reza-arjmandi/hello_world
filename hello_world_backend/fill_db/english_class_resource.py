import random
import os

from random_generator import RandomGenerator
from http_client import HTTPClient

class EnglishClassResource:

    def get_english_class_list_url():
        return '/english_class/'
    
    def generate_random_english_classes(number, token):
        for i in range(number):
            data = EnglishClassResource.generate_random_english_class_data()
            HTTPClient.post(
                EnglishClassResource.get_english_class_list_url(), 
                data, token=token, format='multipart/form-data') 
            
    def generate_random_english_class_data():
            random_generator = RandomGenerator() 
            img_path = f'{random_generator.generate_string(2, 10)}.jpg'
            img_content = open(os.path.join('photos', '0.jpg'), 'rb').read()
            return  {
                'title': random_generator.generate_string(2, 20),
                'date_time' : '2020-12-20T12:00:00+0430',
                'skype_link' : random_generator.generate_string(10, 20),
                'image' : (img_path, img_content, 'image/jpg'),
                'capacity': str(random.randint(2, 5)),
                'description': random_generator.generate_string(10, 100),
            }