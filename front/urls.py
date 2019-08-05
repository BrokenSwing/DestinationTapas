# front/urls.py

from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name="index"),
    path('red/', index, name="red"),
    path('green/', index, name="green"),
    path('auth/', index, name="auth")
]
