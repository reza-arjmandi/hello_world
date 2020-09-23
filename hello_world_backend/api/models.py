from django.db.models import Model
from django.db.models import URLField
from django.db.models import CharField
from django.db.models import ImageField
from django.db.models import CharField
from django.db.models import TextField
        
class Stream(Model):

    title = CharField(blank=False, max_length=100)
    description = TextField(blank=False)
    stream_url = URLField(blank=False)

    def __str__(self):
        return self.title

class HomePage(Model):

    background_image = ImageField(blank=False, upload_to='photos')
    introduction_video_url = URLField(blank=False)
    introduction_video_title = CharField(blank=False, max_length=100)
    introduction_video_description = TextField(blank=False)

    def __str__(self):
        return\
            self.introduction_video_title\
            + "\n"\
            + self.introduction_video_description
