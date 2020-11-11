from hamcrest.core.base_matcher import BaseMatcher

from django.http import FileResponse

class BlogPostEqualTo(BaseMatcher):

    def __init__(self, captured, client):
        self.captured = captured
        self.client = client

    def _matches(self, element):
        result = True
        result = result and self.captured['owner'] in element
        expected_elem = element[self.captured['owner']]
        result = result and self.captured['title'] == expected_elem['title']
        result = result and self.captured['snippet'] == \
            expected_elem['snippet']
        result = result and self.captured['content'] == \
            expected_elem['content']

        response = self.client.get(self.captured['image'], follow=True)
        if(not hasattr(expected_elem, 'image')):
            return result
        
        res = FileResponse(expected_elem['image'].open())
        result = result and response.streaming_content == res.streaming_content
        return result

    def describe_to(self, description):
        pass