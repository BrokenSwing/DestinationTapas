from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FriendRequest, Product, Party, Command, UserMisc


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=25, write_only=True)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        read_only = ["id"]

    def create(self, validated_data):
        return User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = []
        depth = 1


class PartySerializer(serializers.ModelSerializer):
    class Meta:
        model = Party
        fields = ["id", "total_price", "leader", "status", "members", "commands", "date", "price_per_user", "end_date"]
        read_only_fields = ["id", "total_price", "leader", "status", "members", "commands", "date", "price_per_user",
                            "end_date"]


class CommandSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Command
        fields = ["author", "product", "contributions", "date", "total_price"]


class MemberOperationSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=["ADD", "REMOVE"])
    user = serializers.IntegerField()


class UserMiscSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMisc
        fields = ["total_spent"]


class UserFriendsSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserMisc
        fields = ["received_requests", "friends", "sent_requests"]


class FriendOperationSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=['ACCEPT', 'REFUSE', 'CANCEL', 'REMOVE', 'ADD'])
    user = serializers.IntegerField()
