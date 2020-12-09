from hamcrest.core.base_matcher import BaseMatcher

class MembershipEqualTo(BaseMatcher):

    def __init__(self, response):
        self.captured = response

    def _matches(self, element):
        result = True
        return result and\
            self.captured['profile_info'] == element['profile_info']\
            and self.captured['english_class'] == element['english_class']

    def describe_to(self, description):
        pass