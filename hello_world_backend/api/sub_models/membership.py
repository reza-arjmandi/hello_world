from django.db.models import Model
from django.db.models import ForeignKey
from django.db.models import DateField
from django.db.models import DateField
from django.db.models import CASCADE

from api.sub_models.profile_info import ProfileInfo
from api.sub_models.english_class import EnglishClass

class Membership(Model):
    profile_info = ForeignKey(
        ProfileInfo, related_name="Membership", on_delete=CASCADE)
    english_class = ForeignKey(EnglishClass, on_delete=CASCADE)
    date_joined = DateField(auto_now_add=True)