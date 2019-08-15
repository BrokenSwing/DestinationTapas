from rest_framework import generics, permissions
from .serializers import UserSerializer, ProductSerializer, PartySerializer, \
    CommandSerializer, MemberOperationSerializer, UserMiscSerializer, UserFriendsSerializer, FriendOperationSerializer
from django.contrib.auth.models import User
from .models import FriendRequest, Product, Party, Command, CommandContribution
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsMemberOfParty, IsOwner
from django.db import models


# Users #

class UsersView(generics.ListCreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserMiscView(generics.RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class = UserMiscSerializer

    def get_object(self):
        obj = super(UserMiscView, self).get_object()
        return obj.usermisc


# Friend requests #

class FriendsView(generics.RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class = FriendOperationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_object(self):
        obj = super(FriendsView, self).get_object()
        return obj.usermisc

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = UserFriendsSerializer(instance)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        misc = self.get_object()

        try:
            target = User.objects.get(pk=serializer.data['user'])
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        if target == misc.user:
            return Response({"detail": "Can't perform any friend action on self"}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.data['action'] == "ADD":
            return self.add_friend(target)

        if serializer.data['action'] == "REMOVE":
            return self.remove_friend(target)

        if serializer.data['action'] == "ACCEPT":
            return self.accept_request(target)

        if serializer.data['action'] == "REFUSE":
            return self.refuse_request(target)

        if serializer.data['action'] == "CANCEL":
            return self.cancel_request(target)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def cancel_request(self, target):
        misc = self.get_object()

        try:
            friend_request = FriendRequest.objects.get(from_user=misc.user, to_user=target, status="PENDING")
        except FriendRequest.MultipleObjectsReturned:
            return Response({
                "detail": "Unexpected error : multiple requests found"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except FriendRequest.DoesNotExist:
            return Response({
                "detail": "You didn't send a friend request to this user"
            }, status=status.HTTP_400_BAD_REQUEST)

        friend_request.status = "CANCELED"
        friend_request.save()

        return Response(UserFriendsSerializer(misc).data, status=status.HTTP_200_OK)

    def refuse_request(self, target):
        misc = self.get_object()

        try:
            friend_request = FriendRequest.objects.get(from_user=target, to_user=misc.user, status="PENDING")
        except FriendRequest.MultipleObjectsReturned:
            return Response({
                "detail": "Unexpected error : multiple requests found"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except FriendRequest.DoesNotExist:
            return Response({
                "detail": "You didn't received a friend request from this user"
            }, status=status.HTTP_400_BAD_REQUEST)

        friend_request.status = "REJECTED"
        friend_request.save()

        return Response(UserFriendsSerializer(misc).data, status=status.HTTP_200_OK)

    def remove_friend(self, target):
        misc = self.get_object()

        if target.id not in misc.friends:
            return Response({"detail": "This user isn't your friend."}, status=status.HTTP_400_BAD_REQUEST)

        friend_request = FriendRequest.objects.filter(
            models.Q(from_user=misc.user, to_user=target) | models.Q(from_user=target, to_user=misc.user)
        ).filter(status="ACCEPTED")[0]

        friend_request.status = "DELETED"
        friend_request.save()

        return Response(UserFriendsSerializer(misc).data, status=status.HTTP_200_OK)

    def add_friend(self, target):
        misc = self.get_object()

        if target.id in misc.received_requests:
            return self.accept_request(target)

        if target.id in misc.sent_requests:
            return Response({
                "detail": "You already sent a friend request to this user"
            }, status=status.HTTP_400_BAD_REQUEST)

        if target.id in misc.friends:
            return Response({
                "detail": "This user is already your friend"
            }, status=status.HTTP_400_BAD_REQUEST)

        FriendRequest.objects.create(from_user=misc.user, to_user=target, status="PENDING")

        return Response(UserFriendsSerializer(misc).data, status=status.HTTP_200_OK)

    def accept_request(self, target):
        misc = self.get_object()

        try:
            request = FriendRequest.objects.get(from_user=target, to_user=misc.user, status="PENDING")
        except FriendRequest.MultipleObjectsReturned:
            return Response({
                "detail": "Unexpected error : multiple requests found"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except FriendRequest.DoesNotExist:
            return Response({"detail": "You don't have any request from this user"}, status=status.HTTP_400_BAD_REQUEST)

        request.status = "ACCEPTED"
        request.save()

        return Response(UserFriendsSerializer(misc).data, status=status.HTTP_200_OK)


# Products #

class ProductsView(generics.ListAPIView):

    queryset = Product.objects.filter(old=False)
    serializer_class = ProductSerializer


# Auth #

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


# Parties #

class PartiesView(generics.ListCreateAPIView):

    queryset = Party.objects.all()
    serializer_class = PartySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Party.objects.all()
        user = self.request.query_params.get("for", None)
        if user is not None:
            queryset = queryset.filter(members__in=[user])
        return queryset

    def create(self, request, *args, **kwargs):
        user = request.user
        party = Party.objects.create(leader=user, status="IN PROGRESS")
        party.members.add(user)
        serializer = self.get_serializer(party)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PartyDetailView(generics.RetrieveAPIView):

    queryset = Party.objects.all()
    serializer_class = PartySerializer


class PartyMembersUpdateView(generics.GenericAPIView):

    queryset = Party.objects.all()
    serializer_class = MemberOperationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsMemberOfParty]

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = PartySerializer(instance)
        return Response(serializer.data['members'])

    def post(self, request, *args, **kwargs):
        queryset = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            to_update = User.objects.get(id=serializer.data['user'])
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        if queryset.status == "FINISHED":
            return Response({
                "detail": "Can't add or remove members from a finished party",
                "members": PartySerializer(queryset).data['members'],
            })

        members = queryset.members.all()

        if serializer.data['action'] == "REMOVE":
            total_to_pay = CommandContribution.objects.filter(user=to_update).filter(command__party=queryset)\
                .aggregate(models.Sum("part"))["part__sum"]

            if total_to_pay is not None:
                return Response({
                    "detail": "Can't remove members needing to pay something",
                    "members": PartySerializer(queryset).data['members'],
                }, status=status.HTTP_400_BAD_REQUEST)
            if to_update not in members:
                return Response({
                    "detail": "This user in not a member of the party",
                    "members": PartySerializer(queryset).data['members'],
                }, status=status.HTTP_400_BAD_REQUEST)

            if to_update == queryset.leader:
                return Response({
                    "detail": "Can't remove leader from party's members",
                    "members": PartySerializer(queryset).data['members'],
                }, status=status.HTTP_400_BAD_REQUEST)

            queryset.members.remove(to_update)

        elif serializer.data['action'] == "ADD":

            if to_update.id not in request.user.usermisc.friends:
                return Response({
                    "detail": "Can't add an user who isn't your friend",
                    "members": PartySerializer(queryset).data['members'],
                }, status=status.HTTP_400_BAD_REQUEST)

            if to_update in members:
                return Response({
                    "detail": "Can't add a member already in the party",
                    "members": PartySerializer(queryset).data['members'],
                }, status=status.HTTP_400_BAD_REQUEST)

            queryset.members.add(to_update)

        serializer = PartySerializer(queryset)
        return Response(serializer.data['members'], status=status.HTTP_200_OK)


# Commands

class CommandsView(generics.ListAPIView):

    queryset = Command.objects.all()
    serializer_class = CommandSerializer


class CommandDetailView(generics.RetrieveAPIView):

    queryset = Command.objects.all()
    serializer_class = CommandSerializer
