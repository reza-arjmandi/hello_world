from django.db.models import Model
from django.db.models import CharField
from django.db.models import ImageField
from django.db.models import CharField
from django.db.models import TextField
from django.db.models import DateField
from django.db.models import ForeignKey
from django.db.models import CASCADE

from django.contrib.auth.models import User

class BlogPost(Model):
    owner = ForeignKey(
        User, on_delete=CASCADE, related_name="BlogPost", blank=False)
    title = CharField(blank=False, max_length=100)
    date = DateField(blank=False, auto_now_add=True)
    image = ImageField(blank=False, upload_to='photos')
    snippet = CharField(blank=False, max_length=400)
    content = TextField(blank=False)