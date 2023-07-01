from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from .views import *


urlpatterns = [
   path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('media-upload/', MediaUploadView.as_view(), name='media_upload'),
    path('user-media/', UserMediaListAPIView.as_view(), name='user-media-list'),



]