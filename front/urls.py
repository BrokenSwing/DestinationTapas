# front/urls.py

from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name="index"),
    path('auth/', index, name="auth"),
    path('products/', index, name="products"),
    path('friends/', index, name="friends"),
    path('profile/', index, name="profile"),

    path('parties/', index, name="parties"),
    path('parties/<int:pk>/', index, name="party-detail"),
    path('parties/<int:pk>/members', index, name="party-members"),
    path('parties/<int:pk>/new-command', index, name="new-command"),
]
