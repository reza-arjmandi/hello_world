from hamcrest.core.base_matcher import BaseMatcher
from hamcrest import contains_inanyorder

from api.integration_tests.english_class_equal_to import EnglishClassEqualTo

class EnglishClassesEqualTo(BaseMatcher):

    def __init__(self, response):
        self.captured = response.json()

    def _matches(self, element):
        result = True
        result = result and self.captured['count'] == len(element)
        matchers = [EnglishClassEqualTo(data) for data in element]
        matcher = contains_inanyorder(*matchers)
        result = result and matcher.matches(self.captured['results'])
        return result 

    def describe_to(self, description):
        pass