from random_generator import RandomGenerator
from http_client import HTTPClient

class VideoResource:

    def get_video_list_url():
        return '/stream/'
    
    def generate_random_videos(number, username, password):
        for i in range(number):
            data = VideoResource.generate_random_video_data()
            HTTPClient.post(
                VideoResource.get_video_list_url(), 
                data, username=username, password=password) 
            
    def generate_random_video_data():
            random_generator = RandomGenerator() 
            return  {
                'title': random_generator.generate_string(2, 20),
                'description': random_generator.generate_string(10, 100),
                'stream_url': 'https://youtu.be/ZXpWHghCiWM',
            }
