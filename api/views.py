from rest_framework import generics
from .serializers import UserSerializer, FriendRequestsSerializer
from django.contrib.auth.models import User
from .models import FriendRequest


class UsersView(generics.ListCreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class FriendRequestsView(generics.ListAPIView):

    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestsSerializer
