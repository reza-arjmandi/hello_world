from hamcrest.core.base_matcher import BaseMatcher
from hamcrest import contains_inanyorder

class ProfileInfoOwnerEqualTo(BaseMatcher):

    def __init__(self, captured):
        self.captured = captured

    def _matches(self, element):
        result = True
        result = result and self.captured['count'] == len(element)
        ownsers = [ elem['owner'] for elem in self.captured['results']]
        matcher = contains_inanyorder(*element)
        result = result and matcher.matches(ownsers)
        return result

    def describe_to(self, description):
        pass