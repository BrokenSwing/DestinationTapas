# api/urls.py

from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UsersView, FriendRequestsView, WithUserIdTokenProviderView, \
    UserDetailView, ProductsView, PartiesView, PartyDetailView, CommandsView, CommandDetailView

urlpatterns = {
    path('users/', UsersView.as_view(), name="users"),
    path('users/<int:pk>/', UserDetailView.as_view(), name="user-detail"),
    path('friends/', FriendRequestsView.as_view(), name="friends"),
    path('auth/', WithUserIdTokenProviderView.as_view(), name="auth"),
    path('products/', ProductsView.as_view(), name="products"),
    path('parties/', PartiesView.as_view(), name="parties"),
    path('parties/<int:pk>/', PartyDetailView.as_view(), name="party-detail"),
    path('commands/', CommandsView.as_view(), name="commands"),
    path('commands/<int:pk>/', CommandDetailView.as_view(), name="command-detail")
}

urlpatterns = format_suffix_patterns(urlpatterns)
