from hamcrest.core.base_matcher import BaseMatcher

from api.integration_tests.matchers.blog_post_equal_to import BlogPostEqualTo

class BlogPostsEqualTo(BaseMatcher):

    def __init__(self, response, client):
        self.captured = response.json()
        self.client = client

    def _matches(self, element):
        result = True
        result = result and self.captured['count'] == len(element)
        for elem in self.captured['results']:
            matcher = BlogPostEqualTo(elem, self.client)
            result = result and matcher.matches(element)
        return result

    def describe_to(self, description):
        pass