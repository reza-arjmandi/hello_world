from django.db.models import Model
from django.db.models import URLField
from django.db.models import CharField
from django.db.models import CharField
from django.db.models import TextField

class Stream(Model):

    title = CharField(blank=False, max_length=100)
    description = TextField(blank=False)
    stream_url = URLField(blank=False)

    def __str__(self):
        return self.title