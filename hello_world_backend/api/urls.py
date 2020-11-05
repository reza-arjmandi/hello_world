from django.urls import path
from rest_framework import routers
from django.conf.urls import url
from django.urls import include
from rest_framework.authtoken import views

from api.views import StreamViewSet
from api.views import ProfileInfoViewSet
from api.views import ProfileAvatarViewSet
from api.views import BlogPostViewSet

from api.views import PhotoDetail
from api.views import UserList
from api.views import UserDetail

router = routers.DefaultRouter()
router.register(r'stream', StreamViewSet)
router.register(r'profile', ProfileInfoViewSet, basename='profileinfo')
router.register(r'blog_post', BlogPostViewSet)

profile_avatar_list = ProfileAvatarViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

profile_avatar_detail = ProfileAvatarViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('avatar/', profile_avatar_list, name='profileavatar-list'),
    path('avatar/<int:pk>/', profile_avatar_detail, name='profileavatar-detail'),
    url(r'^photos/(.*)/$', PhotoDetail.as_view()),
    path('', include(router.urls)),
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
]
