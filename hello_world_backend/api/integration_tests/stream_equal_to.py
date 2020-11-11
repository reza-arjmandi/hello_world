from hamcrest.core.base_matcher import BaseMatcher

class StreamEqualTo(BaseMatcher):

    def __init__(self, expected):
        self.expected = expected

    def _matches(self, item):
        return \
            self.expected['title'] == item['title']\
            and self.expected['description'] == item['description']\
            and self.expected['stream_url'] == item['stream_url']

    def describe_to(self, description):
        pass