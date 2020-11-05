from django.db.models import Model
from django.db.models import CharField
from django.db.models import CharField
from django.db.models import EmailField
from django.db.models import DateTimeField

class LoginToken(Model):
    email = EmailField(blank=False)
    token = CharField(blank=False, max_length=10)
    created = DateTimeField(auto_now_add=True)
