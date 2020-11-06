from django.db.models import Model
from django.db.models import ImageField
from django.db.models import ForeignKey
from django.db.models import CASCADE

from api.models import ProfileInfo

class ProfileAvatar(Model):
    profile_info = ForeignKey(
        ProfileInfo, on_delete=CASCADE, related_name="Avatar", blank=False)
    avatar = ImageField(blank=False, upload_to='photos')