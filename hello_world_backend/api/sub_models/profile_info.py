from django.db.models import Model
from django.db.models import CharField
from django.db.models import CharField
from django.db.models import TextField
from django.db.models import BooleanField
from django.db.models import ForeignKey
from django.db.models import ImageField
from django.db.models import CASCADE

from django.contrib.auth.models import User

class ProfileInfo(Model):
    owner = ForeignKey(
        User, on_delete=CASCADE, related_name="ProfileInfo", blank=False)
    user_type = CharField(blank=False, max_length=100, default="learner")
    timezone = CharField(blank=False, max_length=100)
    skype_link = TextField(blank=False)
    is_completed = BooleanField(blank=False)
    avatar = ImageField(blank=False, upload_to='photos')
