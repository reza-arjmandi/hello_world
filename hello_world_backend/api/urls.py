from django.urls import path
from rest_framework import routers
from django.conf.urls import url
from django.urls import include
from rest_framework.authtoken import views

from api.views import StreamViewSet
from api.views import HomePageViewSet
from api.views import PhotoDetail

router = routers.DefaultRouter()
router.register(r'home', HomePageViewSet)
router.register(r'stream', StreamViewSet)

urlpatterns = [
    url(r'^photos/(.*)/$', PhotoDetail.as_view()),
    path('', include(router.urls)),
    url(r'^api-token-auth/', views.obtain_auth_token),
]
