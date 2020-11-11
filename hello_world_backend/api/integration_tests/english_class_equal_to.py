import os

from hamcrest.core.base_matcher import BaseMatcher

from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_naive

class EnglishClassEqualTo(BaseMatcher):

    def __init__(self, captured):
        self.captured = captured

    def _matches(self, element):
        result = True
        if 'image' in self.captured and 'image' in element:
            result =  result and self.captured['image'].name ==\
                os.path.split(element['image'])[1]

        return result and\
            self.captured['title'] == element['title']\
            and self.captured['description'] == element['description']\
            and self.captured['capacity'] == element['capacity']\
            and self.captured['skype_link'] == element['skype_link']\
            and self.captured['date_time'] == \
                make_naive(parse_datetime(element['date_time']))

    def describe_to(self, description):
        pass