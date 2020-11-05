from django.db.models import Model
from django.db.models import ImageField
from django.db.models import ForeignKey
from django.db.models import CASCADE

from django.contrib.auth.models import User, Group

from api.sub_models.blog_post import BlogPost
from api.sub_models.stream import Stream
from api.sub_models.profile_info import ProfileInfo

class ProfileAvatar(Model):
    profile_info = ForeignKey(
        ProfileInfo, on_delete=CASCADE, related_name="Avatar", blank=False)
    avatar = ImageField(blank=False, upload_to='photos')
