# api/urls.py

from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UsersView, FriendRequestsView, WithUserIdTokenProviderView, UserDetailView, ProductsView

urlpatterns = {
    path('users/', UsersView.as_view(), name="users"),
    path('users/<int:pk>/', UserDetailView.as_view(), name="user-detail"),
    path('friends/', FriendRequestsView.as_view(), name="friends"),
    path('auth/', WithUserIdTokenProviderView.as_view(), name="auth"),
    path('products/', ProductsView.as_view(), name="products")
}

urlpatterns = format_suffix_patterns(urlpatterns)
