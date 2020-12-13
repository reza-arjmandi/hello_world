import os

from random_generator import RandomGenerator
from http_client import HTTPClient

class BlogPostResource:

    def get_blog_post_list_url():
        return '/blog_post/'
    
    def generate_random_blog_posts(number, username, password):
        for i in range(number):
            data = BlogPostResource.generate_random_blog_post_data()
            HTTPClient.post(
                BlogPostResource.get_blog_post_list_url(), 
                data, username=username, password=password, 
                format='multipart/form-data') 
            
    def generate_random_blog_post_data():
            random_generator = RandomGenerator() 
            img_path = f'{random_generator.generate_string(2, 10)}.jpg'
            img_content = open(os.path.join('photos', '0.jpg'), 'rb').read()
            return  {
                'title': random_generator.generate_string(2, 20),
                'date' : '2020-12-20T12:00:00+0430',
                'image' : (img_path, img_content, 'image/jpg'),
                'snippet': random_generator.generate_string(10, 100),
                'content': random_generator.generate_string(10, 100),
            }
