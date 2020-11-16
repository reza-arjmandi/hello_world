from auth_generator import AuthGenerator
from profile_info_resource import ProfileInfoResource
from english_class_resource import EnglishClassResource

email, token = AuthGenerator.create_random_users_credentials()
ProfileInfoResource.update_profile_info_user_type(token, 'teacher')
EnglishClassResource.generate_random_english_classes(100, token)