from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import APIException

from django.core.mail import send_mail

from api.models import Membership
from api.models import ProfileInfo
from api.serializers import MembershipSerializer
from api.permissions import IsAdminOrOwner

import pytz

class ClassIsFull(APIException):
    status_code = 400
    default_detail = 'The class is full'
    default_code = 'bad_request'

class MembershipViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrOwner]

    queryset = Membership.objects.all().order_by('-id')
    serializer_class = MembershipSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Membership.objects.all().order_by('-id')
        return self.request.user.ProfileInfo.all().order_by('-id')[0].Membership.all().order_by('-id')

    def perform_create(self, serializer):
        if "english_class" in serializer.validated_data:
            _class = serializer.validated_data["english_class"]
            if _class.capacity == 0:
                raise ClassIsFull()
            _class.capacity = _class.capacity - 1
            _class.save()

            timezone_converter = pytz.timezone(
                self.request.user.ProfileInfo.all()[0].timezone)
            _local_date_time = timezone_converter.normalize(
                _class.date_time)

            send_mail(
            'English Class Subscription',
            "You’ve subscribed to the English class successfully."
            "Join to the English class through following link in Skype application: "
            f"{_class.skype_link}."
            "The class will be hold on: "
            f"{_local_date_time}.",
            'HelloWorld@halloenglish.com',
            [self.request.user],
            fail_silently=False,
            )
            send_mail(
            'English Class Subscription',
            "Congratulation."
            f"A new subscription in the {_class.title} class: {self.request.user}",
            'HelloWorld@halloenglish.com',
            [_class.owner.username],
            fail_silently=False,
            )
        serializer.save()
        