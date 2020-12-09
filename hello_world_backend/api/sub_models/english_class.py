from django.db.models import Model
from django.db.models import CharField
from django.db.models import CharField
from django.db.models import TextField
from django.db.models import ForeignKey
from django.db.models import ImageField
from django.db.models import DateField
from django.db.models import DateTimeField
from django.db.models import IntegerField
from django.db.models import ManyToManyField
from django.db.models import CASCADE

from django.contrib.auth.models import User

from api.sub_models.profile_info import ProfileInfo

class EnglishClass(Model):
    owner = ForeignKey(
        User, on_delete=CASCADE, related_name="EnglishClass", blank=False)
    title = CharField(blank=False, max_length=100)
    description = TextField(blank=True)
    created = DateField(blank=False, auto_now_add=True)
    date_time = DateTimeField(blank=False)
    skype_link = TextField(blank=False)
    image = ImageField(blank=True, upload_to='photos')
    capacity = IntegerField(blank=False)
    members = ManyToManyField(ProfileInfo, through='Membership')