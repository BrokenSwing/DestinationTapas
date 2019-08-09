from rest_framework import generics
from .serializers import UserSerializer, FriendRequestsSerializer
from django.contrib.auth.models import User
from .models import FriendRequest
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


# Users #

class UsersView(generics.ListCreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


# Friend requests #

class FriendRequestsView(generics.ListAPIView):

    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestsSerializer


class WithUserIdTokenProviderView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id': user.id
        })
