from django.db.models import Model
from django.db.models import URLField
from django.db.models import CharField
from django.db.models import ImageField
from django.db.models import CharField
from django.db.models import TextField


from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

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
