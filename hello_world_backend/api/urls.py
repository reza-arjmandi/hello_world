from django.urls import path
from rest_framework import routers
from django.conf.urls import url
from django.urls import include

from api.views import StreamViewSet
from api.views import ProfileInfoViewSet
from api.views import BlogPostViewSet
from api.views import UserViewSet

from api.views import PhotoDetail

router = routers.DefaultRouter()
router.register(r'stream', StreamViewSet)
router.register(r'profile', ProfileInfoViewSet, basename='profileinfo')
router.register(r'blog_post', BlogPostViewSet)
router.register(r'user', UserViewSet)

urlpatterns = [
    url(r'^photos/(.*)/$', PhotoDetail.as_view()),
    path('', include(router.urls)),
]
