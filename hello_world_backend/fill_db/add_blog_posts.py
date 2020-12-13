from auth_generator import AuthGenerator
from blog_post_resource import BlogPostResource

username, password = AuthGenerator.get_an_admin_user_credentials()
BlogPostResource.generate_random_blog_posts(100, username, password)