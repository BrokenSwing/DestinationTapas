# api/urls.py

from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UsersView, FriendRequestsView
from rest_framework.authtoken import views

urlpatterns = {
    path('users/', UsersView.as_view(), name="users"),
    path('friends/', FriendRequestsView.as_view(), name="friends"),
    path('auth/', views.obtain_auth_token, name="auth")
}

urlpatterns = format_suffix_patterns(urlpatterns)
