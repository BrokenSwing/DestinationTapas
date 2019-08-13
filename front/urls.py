# front/urls.py

from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name="index"),
    path('red/', index, name="red"),
    path('green/', index, name="green"),
    path('auth/', index, name="auth"),
    path('products/', index, name="products"),

    path('parties/', index, name="parties"),
    path('parties/<int:pk>/', index, name="party-detail"),
    path('parties/<int:pk>/members', index, name="party-members"),

    path('profile/', index, name="profile"),
]
