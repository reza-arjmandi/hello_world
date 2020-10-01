from django.urls import path
from rest_framework import routers
from django.conf.urls import url
from django.urls import include
from rest_framework.authtoken import views

from api.views import StreamViewSet
from api.views import HomePageViewSet
from api.views import PhotoDetail
from api.views import LoginEmailView
from api.views import TokenView

router = routers.DefaultRouter()
router.register(r'home', HomePageViewSet)
router.register(r'stream', StreamViewSet)

urlpatterns = [
    path('auth/email/', LoginEmailView.as_view()),
    path('auth/token/', TokenView.as_view()),
    url(r'^photos/(.*)/$', PhotoDetail.as_view()),
    path('', include(router.urls)),
]
