from hamcrest.core.base_matcher import BaseMatcher
from hamcrest import contains_inanyorder

from api.integration_tests.matchers.stream_equal_to import StreamEqualTo

class StreamsEqualTo(BaseMatcher):

    def __init__(self, response):
        self.expected = response.json()

    def _matches(self, element):
        result = True
        result = result and self.expected['count'] == len(element)
        matchers = [StreamEqualTo(data) for data in element]
        new_matcher = contains_inanyorder(*matchers)
        result = result and new_matcher.matches(self.expected['results'])
        return result

    def describe_to(self, description):
        pass