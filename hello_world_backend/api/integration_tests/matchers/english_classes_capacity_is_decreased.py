from hamcrest.core.base_matcher import BaseMatcher
from hamcrest import contains_inanyorder

class EnglishClassCapacityIsDecreased(BaseMatcher):

    def __init__(self, captured):
        self.captured = captured

    def _matches(self, element):
        return self.captured['capacity'] == element['capacity'] + 1

    def describe_to(self, description):
        pass

class EnglishClassesCapacityIsDecreased(BaseMatcher):

    def __init__(self, response):
        self.captured = response

    def _matches(self, element):
        result = True
        result = result and self.captured['count'] == len(element)
        matchers = [EnglishClassCapacityIsDecreased(data) for data in element]
        matcher = contains_inanyorder(*matchers)
        result = result and matcher.matches(self.captured['results'])
        return result 

    def describe_to(self, description):
        pass