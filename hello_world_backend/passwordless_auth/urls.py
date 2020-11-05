from django.urls import path

from passwordless_auth.views import LoginEmailView
from passwordless_auth.views import TokenView

urlpatterns = [
    path('email/', LoginEmailView.as_view(), name='email'),
    path('token/', TokenView.as_view(), name='token'),
]