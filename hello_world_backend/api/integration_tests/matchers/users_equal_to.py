from hamcrest.core.base_matcher import BaseMatcher
from hamcrest import contains_inanyorder

class UsersEqualTo(BaseMatcher):

    def __init__(self, response):
        self.expected = response.json()

    def _matches(self, element):
        result = True
        result = result and self.expected['count'] == len(element)
        usernames = [ elem['username'] for elem in self.expected['results']]
        matcher = contains_inanyorder(*element)
        result = result and matcher.matches(usernames)
        return result

    def describe_to(self, description):
        pass

