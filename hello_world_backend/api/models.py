from django.db.models import Model
from django.db.models import URLField
from django.db.models import CharField
from django.db.models import ImageField
from django.db.models import CharField
from django.db.models import TextField
from django.db.models import EmailField
from django.db.models import DateTimeField
from django.db.models import BooleanField
from django.db.models import ForeignKey
from django.db.models import CASCADE
from django.db.models import TextChoices

from django.contrib.auth.models import User, Group

class Stream(Model):

    title = CharField(blank=False, max_length=100)
    description = TextField(blank=False)
    stream_url = URLField(blank=False)

    def __str__(self):
        return self.title

class LoginToken(Model):
    email = EmailField(blank=False)
    token = CharField(blank=False, max_length=10)
    created = DateTimeField(auto_now_add=True)

class ProfileInfo(Model):
    owner = ForeignKey(
        User, on_delete=CASCADE, related_name="ProfileInfo", blank=False)
    user_type = CharField(blank=False, max_length=100, default="learner")
    timezone = CharField(blank=False, max_length=100)
    skype_link = TextField(blank=False)
    is_completed = BooleanField(blank=False)

class ProfileAvatar(Model):
    profile_info = ForeignKey(
        ProfileInfo, on_delete=CASCADE, related_name="Avatar", blank=False)
    avatar = ImageField(blank=False, upload_to='photos')

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
