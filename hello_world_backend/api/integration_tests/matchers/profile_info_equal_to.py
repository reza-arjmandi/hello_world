from hamcrest.core.base_matcher import BaseMatcher

class ProfileInfoEqualTo(BaseMatcher):

    def __init__(self, captured):
        self.captured = captured

    def _matches(self, element):
        result = True
        result = result and self.captured['user_type'] == element['user_type']
        result = result and self.captured['timezone'] == element['timezone']
        result = result and self.captured['skype_link'] ==\
            element['skype_link']
        result = result and self.captured['is_completed'] ==\
            element['is_completed']
        return result

    def describe_to(self, description):
        pass