from auth_generator import AuthGenerator
from video_resource import VideoResource

username, password = AuthGenerator.get_an_admin_user_credentials()
VideoResource.generate_random_videos(100, username, password)