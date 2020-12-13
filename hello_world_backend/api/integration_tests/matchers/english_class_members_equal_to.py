from hamcrest.core.base_matcher import BaseMatcher
from hamcrest import contains_inanyorder

class EnglishClassMemberEqualTo(BaseMatcher):

    def __init__(self, captured):
        self.captured = captured

    def _matches(self, element):
        result = True
        return result \
            and self.captured['profile_info'] in element['members']\

    def describe_to(self, description):
        pass

class EnglishClassMembersEqualTo(BaseMatcher):

    def __init__(self, captured):
        self.captured = captured

    def _matches(self, element):
        result = True
        result = result and len(self.captured) == len(element)
        matchers = [EnglishClassMemberEqualTo(data) for data in self.captured]
        matcher = contains_inanyorder(*matchers)
        result = result and matcher.matches(element)
        return result

    def describe_to(self, description):
        pass